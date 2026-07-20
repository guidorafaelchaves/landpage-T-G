import Lenis from '@studio-freight/lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function startEffects() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return () => {}

  const desktop = window.matchMedia('(min-width: 901px)').matches
  const lenis = desktop ? new Lenis({ duration: 1.05, smoothWheel: true }) : null
  let rafId = 0
  const raf = (time) => {
    lenis?.raf(time)
    rafId = requestAnimationFrame(raf)
  }
  if (lenis) rafId = requestAnimationFrame(raf)

  const context = gsap.context(() => {
    gsap.utils.toArray('.reveal').forEach((element) => {
      gsap.fromTo(element, { opacity: 0, y: 55 }, {
        opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: element, start: 'top 88%', once: true },
      })
    })

    gsap.utils.toArray('.parcel').forEach((parcel, index) => {
      gsap.to(parcel, {
        xPercent: index % 2 ? -220 : 230,
        yPercent: index % 3 ? 140 : -120,
        rotation: index % 2 ? -300 : 300,
        opacity: 0,
        ease: 'none',
        scrollTrigger: { trigger: '.story', start: 'top bottom', end: 'bottom top', scrub: 1.2 },
      })
    })

    const story = gsap.timeline({ scrollTrigger: { trigger: '.hub-story', start: 'top top', end: '+=1600', scrub: 1, pin: true } })
    story
      .fromTo('.story-box', { opacity: 0, scale: 0.2, rotation: 40 }, { opacity: 1, scale: 1, rotation: 0, stagger: 0.07, duration: 1 })
      .to('.story-box', { scale: 0.35, opacity: 0.12, stagger: 0.03, duration: 0.8 })
      .fromTo('.hub-core', { opacity: 0, scale: 0.65 }, { opacity: 1, scale: 1, duration: 0.9 }, '<.15')
      .fromTo('.flow-line', { scaleX: 0, opacity: 0 }, { scaleX: 1, opacity: 1, stagger: 0.1, duration: 0.6 }, '-=.45')
      .fromTo('.flow-label', { opacity: 0, y: 20 }, { opacity: 1, y: 0, stagger: 0.1, duration: 0.5 }, '-=.5')
  })

  return () => {
    cancelAnimationFrame(rafId)
    lenis?.destroy()
    context.revert()
  }
}
