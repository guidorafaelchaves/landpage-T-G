import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function ThreeScene() {
  const mountRef = useRef(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return undefined

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(48, mount.clientWidth / mount.clientHeight, 0.1, 100)
    camera.position.set(0, 0, 8)
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false, powerPreference: 'low-power' })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
    renderer.setSize(mount.clientWidth, mount.clientHeight)
    renderer.outputColorSpace = THREE.SRGBColorSpace
    mount.appendChild(renderer.domElement)

    const group = new THREE.Group()
    const geometry = new THREE.BoxGeometry(1.15, 0.82, 0.88)
    const materials = [
      new THREE.MeshStandardMaterial({ color: 0xd9b56d, metalness: 0.4, roughness: 0.36, transparent: true, opacity: 0.72 }),
      new THREE.MeshStandardMaterial({ color: 0x1a222e, metalness: 0.4, roughness: 0.38, transparent: true, opacity: 0.68 }),
    ]
    const boxes = []
    for (let index = 0; index < 12; index += 1) {
      const box = new THREE.Mesh(geometry, materials[index % 3 === 0 ? 0 : 1])
      const angle = (index / 12) * Math.PI * 2
      const radius = 2.6 + (index % 4) * 0.38
      box.position.set(Math.cos(angle) * radius, Math.sin(angle * 1.35) * 1.8, Math.sin(angle) * radius * 0.35)
      box.rotation.set(angle, angle * 0.6, angle * 0.35)
      box.userData = { speed: 0.0018 + index * 0.00004, phase: index * 0.7 }
      group.add(box)
      boxes.push(box)
    }
    scene.add(group)
    const lightA = new THREE.PointLight(0xff7b2c, 45, 25)
    lightA.position.set(4, 4, 5)
    scene.add(lightA, new THREE.AmbientLight(0xffffff, 1.5))

    let raf = 0
    let pointerX = 0
    let pointerY = 0
    let running = !document.hidden
    const clock = new THREE.Clock()

    const render = () => {
      if (!running) return
      const time = clock.getElapsedTime()
      boxes.forEach((box, index) => {
        box.rotation.x += box.userData.speed
        box.rotation.y += box.userData.speed * 1.35
        box.position.y += Math.sin(time + box.userData.phase) * 0.0008
        box.material.opacity = 0.42 + (Math.sin(time * 0.8 + index) + 1) * 0.12
      })
      group.rotation.y += 0.0008
      group.rotation.x += (pointerY * 0.06 - group.rotation.x) * 0.02
      group.rotation.z += (-pointerX * 0.04 - group.rotation.z) * 0.02
      renderer.render(scene, camera)
      raf = requestAnimationFrame(render)
    }
    const onPointer = (event) => {
      pointerX = (event.clientX / window.innerWidth - 0.5) * 2
      pointerY = (event.clientY / window.innerHeight - 0.5) * 2
    }
    const onResize = () => {
      camera.aspect = mount.clientWidth / mount.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(mount.clientWidth, mount.clientHeight)
    }
    const onVisibility = () => {
      running = !document.hidden
      if (running) {
        clock.start()
        cancelAnimationFrame(raf)
        render()
      } else cancelAnimationFrame(raf)
    }
    window.addEventListener('pointermove', onPointer, { passive: true })
    window.addEventListener('resize', onResize, { passive: true })
    document.addEventListener('visibilitychange', onVisibility)
    render()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onPointer)
      window.removeEventListener('resize', onResize)
      document.removeEventListener('visibilitychange', onVisibility)
      geometry.dispose()
      materials.forEach((material) => material.dispose())
      renderer.dispose()
      renderer.domElement.remove()
    }
  }, [])

  return <div ref={mountRef} className="three-scene" aria-hidden="true" />
}
