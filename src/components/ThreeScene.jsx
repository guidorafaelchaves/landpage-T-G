import { useEffect, useRef } from 'react'
import * as THREE from 'three'

const COLORS = {
  ink: 0x0a0d12,
  road: 0x151b23,
  concrete: 0x26303a,
  orange: 0xff6b1a,
  gold: 0xd9b56d,
  cyan: 0x51d6e8,
  green: 0x6fcf97,
  violet: 0xa98cff,
  window: 0xaad9e8,
}

function box(width, height, depth, color, x, y, z, materialOptions = {}) {
  const geometry = new THREE.BoxGeometry(width, height, depth)
  const material = new THREE.MeshStandardMaterial({
    color,
    roughness: 0.72,
    metalness: 0.12,
    ...materialOptions,
  })
  const mesh = new THREE.Mesh(geometry, material)
  mesh.position.set(x, y, z)
  mesh.castShadow = true
  mesh.receiveShadow = true
  return mesh
}

function createWarehouse() {
  const group = new THREE.Group()
  group.name = 'warehouse'
  group.add(box(5.8, 1.45, 3.5, 0x212832, -1.5, 0.72, -0.7))
  group.add(box(6.2, 0.24, 3.9, COLORS.orange, -1.5, 1.58, -0.7))
  for (let index = 0; index < 4; index += 1) {
    group.add(box(0.9, 0.92, 0.08, 0x11151b, -3.65 + index * 1.43, 0.58, 1.08, { metalness: 0.4 }))
  }
  group.add(box(1.5, 0.16, 0.12, COLORS.gold, -1.5, 1.12, 1.15, { emissive: COLORS.gold, emissiveIntensity: 0.32 }))
  return group
}

function createBuilding(x, z, height, color = COLORS.concrete) {
  const group = new THREE.Group()
  group.position.set(x, 0, z)
  group.add(box(1.25, height, 1.25, color, 0, height / 2, 0))
  const windowMaterial = new THREE.MeshStandardMaterial({
    color: COLORS.window,
    emissive: COLORS.window,
    emissiveIntensity: 0.42,
    roughness: 0.25,
  })
  for (let floor = 0.45; floor < height; floor += 0.55) {
    const windows = new THREE.Mesh(new THREE.BoxGeometry(0.82, 0.16, 0.04), windowMaterial)
    windows.position.set(0, floor, 0.64)
    group.add(windows)
  }
  return group
}

function createSolarField() {
  const group = new THREE.Group()
  group.name = 'solar'
  const panelMaterial = new THREE.MeshStandardMaterial({
    color: 0x214d66,
    metalness: 0.55,
    roughness: 0.25,
    emissive: 0x123342,
    emissiveIntensity: 0.4,
  })
  const geometry = new THREE.BoxGeometry(1.15, 0.07, 0.72)
  for (let row = 0; row < 3; row += 1) {
    for (let column = 0; column < 3; column += 1) {
      const panel = new THREE.Mesh(geometry, panelMaterial)
      panel.position.set(2.4 + column * 1.3, 0.33, -3.8 + row * 0.92)
      panel.rotation.x = -0.28
      panel.castShadow = true
      group.add(panel)
    }
  }
  return group
}

function createChargingZone() {
  const group = new THREE.Group()
  group.name = 'charging'
  for (let index = 0; index < 4; index += 1) {
    const x = 3.1 + index * 1.15
    const charger = box(0.22, 0.82, 0.22, 0xd8dde4, x, 0.41, 2.75)
    const light = box(0.24, 0.16, 0.24, COLORS.violet, x, 0.68, 2.75, {
      emissive: COLORS.violet,
      emissiveIntensity: 1.5,
    })
    group.add(charger, light)
  }
  return group
}

function createVehicle(color, scale = 1) {
  const group = new THREE.Group()
  group.add(box(0.88 * scale, 0.32 * scale, 0.44 * scale, color, 0, 0.2 * scale, 0))
  group.add(box(0.38 * scale, 0.3 * scale, 0.4 * scale, 0xdbe7ee, -0.13 * scale, 0.47 * scale, 0, { metalness: 0.3 }))
  return group
}

function createBike(color) {
  const group = new THREE.Group()
  const wheelGeometry = new THREE.TorusGeometry(0.14, 0.025, 6, 12)
  const dark = new THREE.MeshStandardMaterial({ color: 0x12161c })
  const frame = new THREE.MeshStandardMaterial({ color, emissive: color, emissiveIntensity: 0.28 })
  const wheelA = new THREE.Mesh(wheelGeometry, dark)
  const wheelB = wheelA.clone()
  wheelA.position.x = -0.22
  wheelB.position.x = 0.22
  wheelA.rotation.y = Math.PI / 2
  wheelB.rotation.y = Math.PI / 2
  const bar = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.04, 0.04), frame)
  bar.position.y = 0.11
  group.add(wheelA, wheelB, bar)
  group.scale.setScalar(0.8)
  return group
}

function createTree(x, z, scale = 1) {
  const group = new THREE.Group()
  const trunk = box(0.12 * scale, 0.45 * scale, 0.12 * scale, 0x795c3b, 0, 0.22 * scale, 0)
  const crown = new THREE.Mesh(
    new THREE.IcosahedronGeometry(0.38 * scale, 0),
    new THREE.MeshStandardMaterial({ color: 0x2d7a58, roughness: 0.85 }),
  )
  crown.position.y = 0.63 * scale
  crown.castShadow = true
  group.add(trunk, crown)
  group.position.set(x, 0, z)
  return group
}

function createDrone() {
  const group = new THREE.Group()
  group.name = 'drone'
  group.add(box(0.42, 0.12, 0.22, COLORS.cyan, 0, 0, 0, { emissive: COLORS.cyan, emissiveIntensity: 0.45 }))
  const armMaterial = new THREE.MeshStandardMaterial({ color: 0x303944, metalness: 0.5 })
  const armA = new THREE.Mesh(new THREE.BoxGeometry(0.82, 0.035, 0.035), armMaterial)
  const armB = armA.clone()
  armB.rotation.y = Math.PI / 2
  group.add(armA, armB)
  return group
}

export default function ThreeScene() {
  const mountRef = useRef(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return undefined

    const lowPower = window.innerWidth < 760 || (navigator.deviceMemory && navigator.deviceMemory < 6)
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(COLORS.ink)
    scene.fog = new THREE.FogExp2(COLORS.ink, 0.024)

    const camera = new THREE.PerspectiveCamera(38, mount.clientWidth / mount.clientHeight, 0.1, 80)
    camera.position.set(13, 11, 15)

    const renderer = new THREE.WebGLRenderer({ antialias: !lowPower, powerPreference: lowPower ? 'low-power' : 'high-performance' })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, lowPower ? 1 : 1.35))
    renderer.setSize(mount.clientWidth, mount.clientHeight)
    renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.shadowMap.enabled = !lowPower
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    mount.appendChild(renderer.domElement)

    const city = new THREE.Group()
    city.rotation.y = -0.12
    scene.add(city)

    const ground = box(18, 0.28, 14, 0x10151b, 0, -0.18, 0)
    ground.receiveShadow = true
    city.add(ground)
    city.add(box(18, 0.035, 1.85, COLORS.road, 0, 0.015, 1.65))
    city.add(box(1.9, 0.04, 14, COLORS.road, 1.25, 0.02, 0))

    const laneMaterial = new THREE.MeshBasicMaterial({ color: 0xd9b56d, transparent: true, opacity: 0.48 })
    for (let x = -8; x < 8; x += 1.45) {
      const lane = new THREE.Mesh(new THREE.BoxGeometry(0.72, 0.012, 0.045), laneMaterial)
      lane.position.set(x, 0.05, 1.65)
      city.add(lane)
    }

    const warehouse = createWarehouse()
    city.add(warehouse)
    city.add(createSolarField(), createChargingZone())

    const buildings = [
      [-6.5, -4.4, 2.4], [-5, -4.5, 3.6], [-6.7, -2.5, 3.2],
      [6.5, -4.6, 2.8], [7, -2.7, 4.1], [5.4, -3.7, 2.1],
    ]
    buildings.forEach(([x, z, height], index) => city.add(createBuilding(x, z, height, index % 2 ? 0x222d38 : 0x1b242d)))

    const trees = [[-7, 4.8], [-5.8, 4.5], [-4.6, 4.9], [5.3, 4.6], [6.5, 4.3], [7.5, 4.8], [-7.6, -0.4], [7.5, 0.1]]
    trees.slice(0, lowPower ? 5 : trees.length).forEach(([x, z], index) => city.add(createTree(x, z, 0.85 + (index % 3) * 0.1)))

    const trucks = [createVehicle(COLORS.orange, 1.25), createVehicle(COLORS.gold, 1.05)]
    trucks.forEach((truck, index) => {
      truck.position.set(-7 + index * 5, 0.08, 1.65)
      city.add(truck)
    })

    const bikes = [createBike(COLORS.cyan), createBike(COLORS.green), createBike(COLORS.orange)]
    bikes.slice(0, lowPower ? 2 : bikes.length).forEach((bike, index) => {
      bike.position.set(1.25, 0.2, 5.2 - index * 0.8)
      bike.rotation.y = Math.PI / 2
      city.add(bike)
    })

    const drone = createDrone()
    drone.position.set(-0.5, 4.4, -1.2)
    city.add(drone)

    const energyMaterial = new THREE.MeshBasicMaterial({ color: COLORS.cyan, transparent: true, opacity: 0.8 })
    const energyNodes = []
    for (let index = 0; index < (lowPower ? 8 : 14); index += 1) {
      const node = new THREE.Mesh(new THREE.SphereGeometry(0.065, 6, 6), energyMaterial)
      node.position.set(-4 + index * 0.68, 0.16, -2.25)
      city.add(node)
      energyNodes.push(node)
    }

    scene.add(new THREE.HemisphereLight(0x9dc9dd, 0x16100b, 2.2))
    const keyLight = new THREE.DirectionalLight(0xffc58b, 4.2)
    keyLight.position.set(-6, 12, 8)
    keyLight.castShadow = !lowPower
    keyLight.shadow.mapSize.set(512, 512)
    scene.add(keyLight)
    const orangeLight = new THREE.PointLight(COLORS.orange, 22, 18)
    orangeLight.position.set(-2, 4, 3)
    scene.add(orangeLight)

    let journeyProgress = 0
    let pointerX = 0
    let pointerY = 0
    let raf = 0
    let inViewport = false
    let running = false
    const clock = new THREE.Clock()
    const target = new THREE.Vector3(0, 0.4, 0)

    const cameraStops = [
      { p: new THREE.Vector3(13, 11, 15), t: new THREE.Vector3(0, 0.3, 0) },
      { p: new THREE.Vector3(7, 6, 8), t: new THREE.Vector3(-1.5, 0.6, -0.4) },
      { p: new THREE.Vector3(7, 5.5, 10), t: new THREE.Vector3(1.2, 0.4, 3.8) },
      { p: new THREE.Vector3(9, 6, 5), t: new THREE.Vector3(4.2, 0.2, -3) },
      { p: new THREE.Vector3(8, 5.5, 7), t: new THREE.Vector3(4.7, 0.3, 2.8) },
    ]

    const updateCamera = () => {
      const scaled = Math.min(journeyProgress, 0.999) * (cameraStops.length - 1)
      const index = Math.floor(scaled)
      const mix = scaled - index
      const from = cameraStops[index]
      const to = cameraStops[Math.min(index + 1, cameraStops.length - 1)]
      camera.position.lerpVectors(from.p, to.p, mix)
      target.lerpVectors(from.t, to.t, mix)
      camera.position.x += pointerX * 0.35
      camera.position.y += pointerY * 0.2
      camera.lookAt(target)
    }

    const render = () => {
      if (!running) return
      const time = clock.getElapsedTime()
      trucks.forEach((truck, index) => {
        truck.position.x = ((time * (0.75 + index * 0.12) + index * 7 + 8) % 16) - 8
      })
      bikes.forEach((bike, index) => {
        bike.position.z = 5.3 - ((time * (0.58 + index * 0.08) + index) % 8.5)
      })
      drone.position.x = Math.sin(time * 0.42) * 3
      drone.position.z = -1 + Math.cos(time * 0.48) * 2
      drone.position.y = 4.1 + Math.sin(time * 0.9) * 0.28
      drone.rotation.y = time * 0.35
      energyNodes.forEach((node, index) => {
        node.position.y = 0.15 + Math.sin(time * 2.2 - index * 0.55) * 0.07
        node.material.opacity = 0.35 + (Math.sin(time * 2.4 - index * 0.6) + 1) * 0.28
      })
      updateCamera()
      renderer.render(scene, camera)
      raf = requestAnimationFrame(render)
    }

    const onJourney = (event) => { journeyProgress = event.detail.progress }
    const onPointer = (event) => {
      pointerX = (event.clientX / window.innerWidth - 0.5) * 2
      pointerY = (event.clientY / window.innerHeight - 0.5) * 2
    }
    const onResize = () => {
      camera.aspect = mount.clientWidth / mount.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(mount.clientWidth, mount.clientHeight)
    }
    const updateRunning = () => {
      running = !document.hidden && inViewport
      if (running) {
        clock.start()
        cancelAnimationFrame(raf)
        render()
      } else cancelAnimationFrame(raf)
    }
    const onVisibility = () => updateRunning()
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      inViewport = entry.isIntersecting
      updateRunning()
    }, { threshold: 0.01 })

    window.addEventListener('tg:city-progress', onJourney)
    window.addEventListener('pointermove', onPointer, { passive: true })
    window.addEventListener('resize', onResize, { passive: true })
    document.addEventListener('visibilitychange', onVisibility)
    visibilityObserver.observe(mount)

    return () => {
      cancelAnimationFrame(raf)
      visibilityObserver.disconnect()
      window.removeEventListener('tg:city-progress', onJourney)
      window.removeEventListener('pointermove', onPointer)
      window.removeEventListener('resize', onResize)
      document.removeEventListener('visibilitychange', onVisibility)
      scene.traverse((object) => {
        object.geometry?.dispose()
        if (Array.isArray(object.material)) object.material.forEach((material) => material.dispose())
        else object.material?.dispose()
      })
      renderer.dispose()
      renderer.domElement.remove()
    }
  }, [])

  return (
    <div className="three-scene" ref={mountRef} aria-hidden="true">
      <div className="webgl-fallback">
        <span />
        <strong>Ecossistema T&amp;G</strong>
      </div>
    </div>
  )
}
