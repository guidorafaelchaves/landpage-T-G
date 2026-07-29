import Lenis from '@studio-freight/lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function startExperience() {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches
  const desktop = window.matchMedia('(min-width: 901px)').matches
  const cleanups = []

  document.documentElement.classList.add('experience-ready')

  if (reduceMotion) {
    document.querySelectorAll('.reveal').forEach((element) => element.classList.add('is-visible'))
    return () => document.documentElement.classList.remove('experience-ready')
  }

  const lenis = desktop ? new Lenis({ duration: 1, smoothWheel: true, wheelMultiplier: 0.9 }) : null
  let rafId = 0
  if (lenis) {
    const raf = (time) => {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)
    lenis.on('scroll', ScrollTrigger.update)
  }

  const context = gsap.context(() => {
    gsap.to('.title-char', {
      y: 0,
      opacity: 1,
      rotateX: 0,
      duration: 1.05,
      stagger: 0.022,
      ease: 'power4.out',
      delay: 0.08,
    })

    gsap.fromTo('.hero-lead, .hero-actions, .hero-index, .scroll-cue, .internal-hero-copy > p, .breadcrumb', {
      opacity: 0,
      y: 24,
    }, {
      opacity: 1,
      y: 0,
      duration: 0.85,
      stagger: 0.09,
      delay: 0.45,
      ease: 'power3.out',
    })

    gsap.utils.toArray('.reveal').forEach((element) => {
      gsap.fromTo(element, { opacity: 0, y: 52 }, {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: { trigger: element, start: 'top 88%', once: true },
      })
    })

    const city = document.querySelector('.city-journey')
    if (city) {
      ScrollTrigger.create({
        trigger: city,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.7,
        onUpdate: ({ progress }) => {
          const chapter = Math.min(4, Math.floor(progress * 5))
          city.style.setProperty('--journey-progress', progress)
          city.dataset.activeChapter = String(chapter)
          window.dispatchEvent(new CustomEvent('tg:city-progress', { detail: { progress } }))
        },
      })
    }

    gsap.utils.toArray('[data-depth]').forEach((layer) => {
      const depth = Number(layer.dataset.depth || 0.1)
      gsap.to(layer, {
        yPercent: depth * 160,
        ease: 'none',
        scrollTrigger: { trigger: '.hero-cinematic', start: 'top top', end: 'bottom top', scrub: true },
      })
    })

    gsap.utils.toArray('.business-card').forEach((card) => {
      gsap.to(card.querySelector('.business-symbol'), {
        yPercent: -18,
        rotate: 4,
        ease: 'none',
        scrollTrigger: { trigger: card, start: 'top bottom', end: 'bottom top', scrub: 1 },
      })
    })
  })

  if (finePointer) {
    const cursor = document.querySelector('.cursor')
    let cursorX = -100
    let cursorY = -100
    let targetX = -100
    let targetY = -100
    let cursorRaf = 0
    const renderCursor = () => {
      cursorX += (targetX - cursorX) * 0.16
      cursorY += (targetY - cursorY) * 0.16
      if (cursor) cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0)`
      cursorRaf = requestAnimationFrame(renderCursor)
    }
    const move = (event) => {
      targetX = event.clientX
      targetY = event.clientY
    }
    const enter = (event) => {
      if (!cursor) return
      cursor.classList.add('is-active')
      const label = event.currentTarget.dataset.cursor
      if (label) cursor.querySelector('span').textContent = label
    }
    const leave = () => cursor?.classList.remove('is-active')
    window.addEventListener('pointermove', move, { passive: true })
    document.querySelectorAll('a, button, [data-cursor]').forEach((element) => {
      element.addEventListener('pointerenter', enter)
      element.addEventListener('pointerleave', leave)
    })
    renderCursor()
    cleanups.push(() => {
      cancelAnimationFrame(cursorRaf)
      window.removeEventListener('pointermove', move)
      document.querySelectorAll('a, button, [data-cursor]').forEach((element) => {
        element.removeEventListener('pointerenter', enter)
        element.removeEventListener('pointerleave', leave)
      })
    })

    document.querySelectorAll('.magnetic').forEach((element) => {
      const moveMagnet = (event) => {
        const rect = element.getBoundingClientRect()
        gsap.to(element, {
          x: (event.clientX - rect.left - rect.width / 2) * 0.12,
          y: (event.clientY - rect.top - rect.height / 2) * 0.12,
          duration: 0.35,
          ease: 'power2.out',
        })
      }
      const resetMagnet = () => gsap.to(element, { x: 0, y: 0, duration: 0.55, ease: 'elastic.out(1, .45)' })
      element.addEventListener('pointermove', moveMagnet)
      element.addEventListener('pointerleave', resetMagnet)
      cleanups.push(() => {
        element.removeEventListener('pointermove', moveMagnet)
        element.removeEventListener('pointerleave', resetMagnet)
      })
    })
  }

  const routeHandler = (event) => {
    const link = event.target.closest('a[data-route]')
    if (!link || event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey || link.target === '_blank') return
    const destination = new URL(link.href, window.location.href)
    if (destination.origin !== window.location.origin) return
    event.preventDefault()
    document.querySelector('.route-curtain')?.classList.add('is-active')
    window.setTimeout(() => { window.location.href = destination.href }, reduceMotion ? 0 : 320)
  }
  document.addEventListener('click', routeHandler)

  return () => {
    cancelAnimationFrame(rafId)
    lenis?.destroy()
    context.revert()
    cleanups.forEach((cleanup) => cleanup())
    document.removeEventListener('click', routeHandler)
    document.documentElement.classList.remove('experience-ready')
  }
}
