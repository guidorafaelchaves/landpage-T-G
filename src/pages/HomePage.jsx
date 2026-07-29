import { lazy, Suspense, useEffect, useState } from 'react'
import SiteHeader from '../components/layout/SiteHeader.jsx'
import SiteFooter from '../components/layout/SiteFooter.jsx'
import AnimatedTitle from '../components/ui/AnimatedTitle.jsx'
import { businessUnits, ecosystemMetrics, partnerTypes } from '../content/site.js'
import { siteBase as base } from '../siteBase.js'

const ThreeScene = lazy(() => import('../components/ThreeScene.jsx'))

const chapters = [
  ['00', 'Visão geral', 'Uma cidade onde infraestrutura, energia e movimento compartilham a mesma inteligência.'],
  ['01', 'Logística', 'O galpão recebe, organiza e devolve velocidade à operação regional.'],
  ['02', 'Mobilidade', 'E-bikes conectam pessoas, entregas e novas rotas urbanas.'],
  ['03', 'Energia', 'Painéis solares transformam espaço físico em capacidade energética.'],
  ['04', 'Recarga', 'Totens e wallboxes preparam destinos para a mobilidade elétrica.'],
]

function useProgressiveScene() {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const hasWebGL = (() => {
      try {
        const canvas = document.createElement('canvas')
        return Boolean(canvas.getContext('webgl2') || canvas.getContext('webgl'))
      } catch {
        return false
      }
    })()
    if (reduced || !hasWebGL) return undefined
    const callback = () => setShow(true)
    const id = window.requestIdleCallback ? window.requestIdleCallback(callback, { timeout: 900 }) : window.setTimeout(callback, 350)
    return () => window.cancelIdleCallback ? window.cancelIdleCallback(id) : window.clearTimeout(id)
  }, [])
  return show
}

export default function HomePage() {
  const showScene = useProgressiveScene()

  return (
    <>
      <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
      <div className="route-curtain" aria-hidden="true"><span>T&amp;G</span></div>
      <div className="cursor" aria-hidden="true"><span>Explorar</span></div>
      <SiteHeader />

      <main id="conteudo">
        <section className="hero-cinematic" id="topo">
          <div className="ambient ambient-a" data-depth="0.08" />
          <div className="ambient ambient-b" data-depth="0.16" />
          <div className="hero-grid-lines" aria-hidden="true" />
          <div className="hero-orbit orbit-a" data-depth="0.2" aria-hidden="true" />
          <div className="hero-orbit orbit-b" data-depth="0.12" aria-hidden="true" />
          <div className="hero-content">
            <p className="kicker"><span /> Tecnologia aplicada à infraestrutura real</p>
            <AnimatedTitle>Movemos o que vem depois.</AnimatedTitle>
            <p className="hero-lead">Logística inteligente, mobilidade elétrica, energia limpa e infraestrutura de recarga conectadas em um único ecossistema.</p>
            <div className="hero-actions">
              <a className="button button-primary magnetic" href="#cidade"><span>Explorar ecossistema</span><i aria-hidden="true">↓</i></a>
              <a className="button button-ghost magnetic" href={`${base}contato/`} data-route><span>Falar com a T&G</span><i aria-hidden="true">↗</i></a>
            </div>
          </div>
          <div className="hero-index" aria-hidden="true">
            <span>35°S / 09°W</span>
            <span>ARAPIRACA · AL</span>
            <span>SISTEMA 04.01</span>
          </div>
          <div className="scroll-cue"><i /><span>Role para entrar na cidade</span></div>
        </section>

        <section className="city-journey" id="cidade">
          <div className="city-sticky">
            <div className="city-canvas-shell">
              {showScene ? <Suspense fallback={<div className="scene-loading">Inicializando cidade…</div>}><ThreeScene /></Suspense> : <div className="scene-poster"><span /><strong>Ecossistema T&amp;G</strong></div>}
              <div className="city-vignette" />
            </div>
            <div className="city-interface">
              <div className="city-heading">
                <p className="kicker"><span /> Cidade tecnológica T&amp;G</p>
                <h2>Quatro sistemas.<br />Uma infraestrutura.</h2>
              </div>
              <div className="chapter-list" aria-label="Capítulos da cidade">
                {chapters.map(([number, title, text], index) => (
                  <article className="city-chapter" data-chapter={index} key={number}>
                    <span>{number}</span>
                    <div><h3>{title}</h3><p>{text}</p></div>
                  </article>
                ))}
              </div>
              <div className="journey-progress" aria-hidden="true"><span /></div>
              <small className="city-instruction">Scroll controla a câmera</small>
            </div>
          </div>
        </section>

        <section className="manifesto section-space">
          <div className="section-number">01 — VISÃO</div>
          <div className="manifesto-copy reveal">
            <p>O futuro não acontece em silos.</p>
            <h2>Mercadorias precisam se mover. Veículos precisam de energia. Empresas precisam de infraestrutura para crescer.</h2>
            <p className="manifesto-answer">A T&amp;G conecta essas necessidades em uma plataforma física, tecnológica e regional.</p>
          </div>
        </section>

        <section className="business-ecosystem section-space" id="ecossistema">
          <div className="section-heading reveal">
            <div><span className="section-number">02 — ECOSSISTEMA</span><p className="kicker"><span /> Frentes de negócio</p></div>
            <h2>Um sistema de soluções que ganha valor quando trabalha junto.</h2>
          </div>
          <div className="business-grid">
            {businessUnits.map((unit) => (
              <a className={`business-card tone-${unit.tone} reveal`} href={`${base}${unit.slug}/`} data-route data-cursor="Conhecer" key={unit.slug}>
                <div className="business-top"><span>{unit.number}</span><i aria-hidden="true">↗</i></div>
                <div className={`business-symbol symbol-${unit.scene}`} aria-hidden="true"><span /><span /><span /></div>
                <div><small>{unit.short}</small><h3>{unit.label}</h3><p>{unit.description}</p></div>
              </a>
            ))}
          </div>
        </section>

        <section className="logistics-feature section-space">
          <div className="feature-visual reveal" data-cursor="Operar">
            <div className="warehouse-graphic" aria-hidden="true">
              <div className="warehouse-roof" />
              <div className="warehouse-body"><span /><span /><span /><span /></div>
              <div className="moving-load load-a">T&amp;G</div>
              <div className="moving-load load-b">T&amp;G</div>
              <div className="route-line" />
            </div>
            <small>SIMULAÇÃO OPERACIONAL / 01</small>
          </div>
          <div className="feature-copy reveal">
            <span className="section-number">03 — LOGÍSTICA</span>
            <p className="kicker"><span /> T&G Hub</p>
            <h2>Uma extensão da sua operação em Arapiraca.</h2>
            <p>Recebimento, conferência, armazenagem temporária, cross docking, fulfillment sob projeto e expedição regional.</p>
            <ul className="feature-list">
              <li><span>01</span> Menor investimento inicial</li>
              <li><span>02</span> Expansão progressiva</li>
              <li><span>03</span> Operação regional conectada</li>
            </ul>
            <a className="text-link" href={`${base}logistica/`} data-route>Conhecer logística <i>↗</i></a>
          </div>
        </section>

        <section className="mobility-feature section-space">
          <div className="mobility-copy reveal">
            <span className="section-number">04 — MOBILIDADE</span>
            <p className="kicker"><span /> T&G E-Bikes</p>
            <h2>Mais cidade por carga.</h2>
            <p>Bicicletas elétricas, soluções para empresas e entregadores, peças, acessórios e um ecossistema de suporte em desenvolvimento.</p>
            <a className="button button-light magnetic" href={`${base}e-bikes/`} data-route><span>Explorar mobilidade</span><i>↗</i></a>
          </div>
          <div className="bike-kinetic reveal" aria-label="Representação abstrata de uma bicicleta elétrica em movimento">
            <div className="bike-wheel wheel-left" /><div className="bike-wheel wheel-right" />
            <div className="bike-frame"><i /><i /><i /></div>
            <div className="speed-line speed-a" /><div className="speed-line speed-b" /><div className="speed-line speed-c" />
            <span className="charge-indicator">86%<small>ENERGIA</small></span>
          </div>
        </section>

        <section className="energy-feature section-space">
          <div className="energy-sky" aria-hidden="true"><i /><i /><i /></div>
          <div className="energy-copy reveal">
            <span className="section-number">05 — ENERGIA</span>
            <p className="kicker"><span /> Sol + infraestrutura</p>
            <h2>A cidade também pode produzir o que consome.</h2>
            <p>Projetos solares e recarga veicular pensados como partes da mesma transição energética.</p>
          </div>
          <div className="energy-paths">
            <a href={`${base}energia-solar/`} data-route className="energy-path reveal">
              <span>01</span><strong>Energia solar</strong><p>Residências, empresas e microgeração.</p><i>↗</i>
            </a>
            <a href={`${base}carregadores/`} data-route className="energy-path reveal">
              <span>02</span><strong>Infraestrutura de recarga</strong><p>Wallbox, totens, condomínios e frotas.</p><i>↗</i>
            </a>
          </div>
        </section>

        <section className="metrics section-space">
          <div className="section-heading reveal">
            <div><span className="section-number">06 — PLATAFORMA</span><p className="kicker"><span /> Estrutura em evolução</p></div>
            <h2>Construída para conectar operações e abrir novas possibilidades.</h2>
          </div>
          <div className="metrics-grid">
            {ecosystemMetrics.map(([value, label]) => <div className="metric reveal" key={label}><strong>{value}</strong><span>{label}</span></div>)}
          </div>
          <p className="metrics-note">Indicadores institucionais de estrutura e posicionamento — não representam projeções financeiras ou promessas de desempenho.</p>
        </section>

        <section className="partners section-space">
          <div className="partners-heading reveal"><span className="section-number">07 — CONEXÕES</span><h2>Feita para quem move a economia real.</h2></div>
          <div className="partner-marquee" aria-label="Públicos conectados ao ecossistema">
            <div>{[...partnerTypes, ...partnerTypes].map((partner, index) => <span key={`${partner}-${index}`}>{partner}<i>✦</i></span>)}</div>
          </div>
        </section>

        <section className="final-cta section-space">
          <div className="cta-glow" aria-hidden="true" />
          <div className="final-cta-copy reveal">
            <p className="kicker"><span /> Próximo movimento</p>
            <h2>O futuro precisa de um lugar para começar.</h2>
            <p>Em Arapiraca, a T&amp;G está construindo esse lugar.</p>
            <a className="button button-primary magnetic" href={`${base}contato/`} data-route><span>Construir uma parceria</span><i>↗</i></a>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
