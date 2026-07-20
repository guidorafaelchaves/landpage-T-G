import React, { useEffect, useRef } from 'react'
import { createRoot } from 'react-dom/client'
import { motion } from 'framer-motion'
import Lenis from '@studio-freight/lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import * as THREE from 'three'
import './styles.css'

gsap.registerPlugin(ScrollTrigger)

const services = [
  ['Recebimento', 'Entrada organizada de mercadorias e encomendas.'],
  ['Conferência', 'Checagem, triagem e controle dos volumes.'],
  ['Cross docking', 'Recebe, organiza e redistribui com velocidade.'],
  ['Armazenagem temporária', 'Consolidação de cargas e apoio operacional.'],
  ['Expedição', 'Preparação das saídas e integração com operadores.'],
  ['Mobilidade elétrica', 'Bicicletas elétricas para rotas urbanas e última milha.'],
]

function ThreeScene() {
  const mountRef = useRef(null)

  useEffect(() => {
    const mount = mountRef.current
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(48, mount.clientWidth / mount.clientHeight, 0.1, 100)
    camera.position.set(0, 0, 8)

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(mount.clientWidth, mount.clientHeight)
    renderer.outputColorSpace = THREE.SRGBColorSpace
    mount.appendChild(renderer.domElement)

    const group = new THREE.Group()
    scene.add(group)

    const boxes = []
    const geometry = new THREE.BoxGeometry(1.15, 0.82, 0.88)
    for (let i = 0; i < 18; i += 1) {
      const material = new THREE.MeshPhysicalMaterial({
        color: i % 3 === 0 ? 0xd9b56d : 0x1a222e,
        metalness: 0.45,
        roughness: 0.32,
        transparent: true,
        opacity: 0.9,
      })
      const box = new THREE.Mesh(geometry, material)
      const angle = (i / 18) * Math.PI * 2
      const radius = 2.6 + (i % 4) * 0.38
      box.position.set(Math.cos(angle) * radius, Math.sin(angle * 1.35) * 1.8, Math.sin(angle) * radius * 0.35)
      box.rotation.set(Math.random(), Math.random(), Math.random())
      box.userData = { angle, radius, speed: 0.0025 + Math.random() * 0.002, phase: Math.random() * 10 }
      group.add(box)
      boxes.push(box)
    }

    const lightA = new THREE.PointLight(0xff7b2c, 55, 25)
    lightA.position.set(4, 4, 5)
    scene.add(lightA)
    const lightB = new THREE.PointLight(0x4f6fff, 30, 25)
    lightB.position.set(-4, -2, 4)
    scene.add(lightB)
    scene.add(new THREE.AmbientLight(0xffffff, 1.4))

    let mouseX = 0
    let mouseY = 0
    const onPointer = (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('pointermove', onPointer)

    let raf
    const clock = new THREE.Clock()
    const animate = () => {
      const t = clock.getElapsedTime()
      boxes.forEach((box, i) => {
        const d = box.userData
        const pulse = 1 + Math.sin(t * 1.8 + d.phase) * 0.06
        box.scale.setScalar(pulse)
        box.rotation.x += d.speed
        box.rotation.y += d.speed * 1.45
        box.position.y += Math.sin(t * 1.2 + i) * 0.0018
        box.material.opacity = 0.38 + (Math.sin(t * 1.35 + i * 0.8) + 1) * 0.3
      })
      group.rotation.y += 0.0015
      group.rotation.x += (mouseY * 0.08 - group.rotation.x) * 0.025
      group.rotation.z += (-mouseX * 0.05 - group.rotation.z) * 0.025
      camera.position.x += (mouseX * 0.35 - camera.position.x) * 0.02
      renderer.render(scene, camera)
      raf = requestAnimationFrame(animate)
    }
    animate()

    const onResize = () => {
      camera.aspect = mount.clientWidth / mount.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(mount.clientWidth, mount.clientHeight)
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('pointermove', onPointer)
      geometry.dispose()
      boxes.forEach((b) => b.material.dispose())
      renderer.dispose()
      mount.removeChild(renderer.domElement)
    }
  }, [])

  return <div ref={mountRef} className="three-scene" aria-hidden="true" />
}

function FloatingParcel({ index }) {
  return (
    <div className={`parcel parcel-${index}`} aria-hidden="true">
      <span>T&G</span>
      <i />
    </div>
  )
}

function MagneticCard({ title, text, index }) {
  const ref = useRef(null)
  const onMove = (e) => {
    const rect = ref.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    ref.current.style.setProperty('--rx', `${-y * 12}deg`)
    ref.current.style.setProperty('--ry', `${x * 14}deg`)
    ref.current.style.setProperty('--mx', `${(x + 0.5) * 100}%`)
    ref.current.style.setProperty('--my', `${(y + 0.5) * 100}%`)
  }
  const reset = () => {
    ref.current.style.setProperty('--rx', '0deg')
    ref.current.style.setProperty('--ry', '0deg')
  }
  return (
    <article ref={ref} onMouseMove={onMove} onMouseLeave={reset} className="service-card cinematic-card">
      <div className="service-index">0{index + 1}</div>
      <h3>{title}</h3>
      <p>{text}</p>
    </article>
  )
}

function App() {
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true })
    let rafId
    const raf = (time) => {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    gsap.utils.toArray('.reveal').forEach((el) => {
      gsap.fromTo(el, { opacity: 0, y: 90, scale: 0.95 }, {
        opacity: 1, y: 0, scale: 1, duration: 1.2, ease: 'power4.out',
        scrollTrigger: { trigger: el, start: 'top 84%', toggleActions: 'play none none reverse' },
      })
    })

    gsap.utils.toArray('.parcel').forEach((parcel, i) => {
      gsap.to(parcel, {
        xPercent: i % 2 ? -280 : 300,
        yPercent: i % 3 ? 180 : -160,
        rotation: i % 2 ? -420 : 420,
        scale: 0.2,
        opacity: 0,
        ease: 'none',
        scrollTrigger: { trigger: '.story', start: 'top bottom', end: 'bottom top', scrub: 1.4 },
      })
    })

    const timeline = gsap.timeline({
      scrollTrigger: { trigger: '.hub-story', start: 'top top', end: '+=2200', scrub: 1, pin: true },
    })
    timeline
      .fromTo('.story-box', { opacity: 0, scale: 0.1, x: () => gsap.utils.random(-500, 500), y: () => gsap.utils.random(-300, 300), rotation: () => gsap.utils.random(-180, 180) }, { opacity: 1, scale: 1, x: 0, y: 0, rotation: 0, stagger: 0.08, duration: 1.4, ease: 'power3.out' })
      .to('.story-box', { x: 0, y: 0, scale: 0.3, opacity: 0.15, stagger: 0.04, duration: 1 })
      .fromTo('.hub-core', { opacity: 0, scale: 0.5, filter: 'blur(20px)' }, { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 1.2 }, '<.25')
      .fromTo('.flow-line', { scaleX: 0, opacity: 0 }, { scaleX: 1, opacity: 1, stagger: 0.14, duration: 0.8 }, '-=.6')
      .fromTo('.flow-label', { opacity: 0, y: 30 }, { opacity: 1, y: 0, stagger: 0.12, duration: 0.7 }, '-=.7')

    gsap.to('.sun-orb', {
      yPercent: 160,
      xPercent: -45,
      scale: 1.45,
      filter: 'hue-rotate(24deg) blur(8px)',
      scrollTrigger: { trigger: document.body, start: 'top top', end: 'bottom bottom', scrub: 1.2 },
    })

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
      ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  }, [])

  return (
    <>
      <div className="noise" />
      <div className="sun-orb" />
      <ThreeScene />
      {[0,1,2,3,4,5].map((i) => <FloatingParcel index={i} key={i} />)}

      <header>
        <nav className="container">
          <img src="./logo.png" className="logo" alt="T&G Innovations" />
          <div className="nav-links">
            <a href="#hub">O Hub</a><a href="#servicos">Serviços</a><a href="#ecossistema">Ecossistema</a><a className="nav-cta" href="#contato">Agendar reunião</a>
          </div>
        </nav>
      </header>

      <main>
        <section className="hero story">
          <div className="container hero-grid">
            <motion.div initial={{opacity:0,y:40}} animate={{opacity:1,y:0}} transition={{duration:1}}>
              <div className="eyebrow">Hub operacional em Arapiraca</div>
              <h1>Sua operação logística no Agreste <span>começa aqui.</span></h1>
              <p className="lead">Uma infraestrutura regional para reduzir custos de última milha, acelerar expansão e conectar transportadoras, lojistas e entregadores.</p>
              <div className="actions"><a className="button primary" href="#contato">Agendar uma reunião</a><a className="button ghost" href="#hub">Conhecer o Hub</a></div>
            </motion.div>
            <div className="hero-panel glass">
              <div><strong>Recebimento</strong><span>Mercadorias entram com organização.</span></div>
              <div><strong>Conferência</strong><span>Volumes são triados e preparados.</span></div>
              <div><strong>Expedição</strong><span>A operação segue para a última milha.</span></div>
            </div>
          </div>
        </section>

        <section id="hub" className="intro reveal">
          <div className="container split-heading">
            <div><div className="eyebrow">Presença operacional</div><h2>Não oferecemos apenas espaço. <em>Oferecemos capacidade de operação.</em></h2></div>
            <p>A T&G funciona como uma extensão regional de transportadoras, marketplaces, distribuidores e operações de comércio eletrônico.</p>
          </div>
        </section>

        <section className="hub-story">
          <div className="story-stage">
            <div className="story-box b1">01</div><div className="story-box b2">02</div><div className="story-box b3">03</div><div className="story-box b4">04</div><div className="story-box b5">05</div><div className="story-box b6">06</div>
            <div className="hub-core"><img src="./logo.png" alt="T&G Innovations" /><p>Recebimento · Conferência · Cross docking · Expedição</p></div>
            <div className="flow-line line-a"/><div className="flow-line line-b"/><div className="flow-line line-c"/>
            <div className="flow-label label-a">Transportadoras</div><div className="flow-label label-b">Lojistas</div><div className="flow-label label-c">Entregadores</div>
          </div>
        </section>

        <section id="servicos" className="services reveal">
          <div className="container">
            <div className="section-title"><div className="eyebrow">Capacidade operacional</div><h2>Uma estrutura pensada para fazer a operação fluir.</h2></div>
            <div className="services-grid">{services.map(([title,text],i)=><MagneticCard key={title} title={title} text={text} index={i}/>)}</div>
          </div>
        </section>

        <section id="ecossistema" className="ecosystem reveal">
          <div className="container ecosystem-grid">
            <div><div className="eyebrow">Ecossistema logístico</div><h2>A T&G conecta quem vende, quem transporta e quem entrega.</h2><p>O hub reduz atrito entre os agentes e cria uma base regional com potencial de escala.</p></div>
            <div className="network glass">
              <div className="pulse-node center">T&G HUB</div>
              <div className="pulse-node n1">Transportadoras</div><div className="pulse-node n2">Lojistas</div><div className="pulse-node n3">Entregadores</div><div className="pulse-node n4">Cliente final</div>
              <svg viewBox="0 0 600 480" aria-hidden="true"><path d="M300 240 C210 110,130 100,85 90"/><path d="M300 240 C420 115,500 105,535 95"/><path d="M300 240 C175 325,120 375,75 410"/><path d="M300 240 C420 335,505 380,540 415"/></svg>
            </div>
          </div>
        </section>

        <section className="final reveal" id="contato">
          <div className="container final-card glass">
            <img src="./logo.png" alt="T&G Innovations" />
            <div><div className="eyebrow">Parcerias B2B</div><h2>A infraestrutura que conecta quem vende, quem transporta e quem entrega.</h2><p>Rua Manoel Martins Lemos, 580 — Primavera, Arapiraca/AL.</p></div>
            <a className="button primary" href="mailto:contato@tginovations.com.br">Solicitar apresentação institucional</a>
          </div>
        </section>
      </main>
      <footer><div className="container">© 2026 T&G Innovations — Arapiraca/AL.</div></footer>
    </>
  )
}

createRoot(document.getElementById('root')).render(<App />)
