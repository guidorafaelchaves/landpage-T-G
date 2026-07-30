import { lazy, Suspense, useEffect, useState } from 'react'
import SiteHeader from '../components/layout/SiteHeader.jsx'
import SiteFooter from '../components/layout/SiteFooter.jsx'
import AnimatedTitle from '../components/ui/AnimatedTitle.jsx'
import ContactForm from '../components/ui/ContactForm.jsx'
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
    const city = document.querySelector('.city-journey')
    if (!city) return undefined

    let idleId = 0
    const loadScene = () => {
      const callback = () => setShow(true)
      idleId = window.requestIdleCallback
        ? window.requestIdleCallback(callback, { timeout: 600 })
        : window.setTimeout(callback, 120)
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      observer.disconnect()
      loadScene()
    }, { rootMargin: '0px 0px -15% 0px' })

    observer.observe(city)
    return () => {
      observer.disconnect()
      if (window.cancelIdleCallback) window.cancelIdleCallback(idleId)
      else window.clearTimeout(idleId)
    }
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
            <p className="kicker"><span /> Atendimento empresarial em Arapiraca e região</p>
            <AnimatedTitle>Logística, mobilidade elétrica e energia para sua empresa</AnimatedTitle>
            <p className="hero-lead">Soluções para armazenagem, entregas, veículos elétricos, carregamento e geração solar.</p>
            <div className="hero-actions">
              <a className="button button-primary magnetic" href={`${base}solicitar-proposta/`} data-route><span>Solicitar proposta</span><i aria-hidden="true">↗</i></a>
              <a className="button button-ghost magnetic" href={`${base}empresa/contato/`} data-route><span>Falar com a T&amp;G</span><i aria-hidden="true">↗</i></a>
            </div>
            <div className="hero-proofs" aria-label="Diferenciais de atendimento">
              <span>Atendimento empresarial</span>
              <span>Projetos personalizados</span>
              <span>Venda, instalação e suporte</span>
              <span>Operação em Arapiraca e região</span>
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
            <h2>O que a T&amp;G oferece</h2>
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

        <section className="profile-solutions section-space">
          <div className="section-heading reveal">
            <div><span className="section-number">03 — POR PERFIL</span><p className="kicker"><span /> Encontre seu caminho</p></div>
            <h2>Qual solução você procura?</h2>
          </div>
          <div className="profile-grid">
            {[
              ['Empresas', 'para-empresas'],
              ['Entregadores', 'para-entregadores'],
              ['Lojistas', 'para-lojistas'],
              ['Comércio eletrônico', 'para-ecommerce'],
              ['Condomínios', 'para-condominios'],
              ['Restaurantes', 'para-restaurantes'],
              ['Hotéis', 'para-hoteis'],
              ['Transportadoras', 'para-transportadoras'],
            ].map(([label, slug], index) => (
              <a className="profile-card reveal" href={`${base}solucoes/${slug}/`} data-route key={slug}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <strong>{label}</strong>
                <i aria-hidden="true">↗</i>
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
            <span className="section-number">04 — T&amp;G HUB</span>
            <p className="kicker"><span /> T&G Hub</p>
            <h2>Estrutura logística em Arapiraca</h2>
            <p>A T&amp;G Hub oferece apoio para empresas que precisam receber, armazenar, separar, retirar ou distribuir mercadorias na região.</p>
            <ul className="feature-list">
              <li><span>01</span> Espaço de armazenagem</li>
              <li><span>02</span> Apoio a transportadoras</li>
              <li><span>03</span> Ponto de retirada e preparação de pedidos</li>
              <li><span>04</span> Distribuição urbana e atendimento de parceiros</li>
            </ul>
            <a className="text-link" href={`${base}tg-hub-arapiraca/apresentar-operacao/`} data-route>Apresentar minha operação <i>↗</i></a>
          </div>
        </section>

        <section className="mobility-feature section-space">
          <div className="mobility-copy reveal">
            <span className="section-number">05 — MOBILIDADE</span>
            <p className="kicker"><span /> T&G E-Bikes</p>
            <h2>Veículos elétricos para trabalho</h2>
            <p>Soluções para entregadores, comércios, condomínios e empresas que buscam reduzir despesas de deslocamento e operação.</p>
            <ul className="feature-list">
              <li><span>01</span> Bicicletas elétricas e modelos de carga</li>
              <li><span>02</span> Acessórios, baterias e peças</li>
              <li><span>03</span> Manutenção e propostas para frotas</li>
            </ul>
            <a className="button button-light magnetic" href={`${base}veiculos-eletricos/solicitar-cotacao/`} data-route><span>Solicitar cotação</span><i>↗</i></a>
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
            <span className="section-number">06 — ENERGIA E RECARGA</span>
            <p className="kicker"><span /> Sol + infraestrutura</p>
            <h2>Reduza sua conta de energia</h2>
            <p>Projetos solares calculados conforme o consumo e a estrutura do imóvel. Envie sua conta de energia para receber uma análise inicial.</p>
          </div>
          <div className="energy-paths">
            <a href={`${base}energia-solar/simulacao/`} data-route className="energy-path reveal">
              <span>01</span><strong>Simular projeto solar</strong><p>Análise inicial a partir do consumo e do imóvel.</p><i>↗</i>
            </a>
            <a href={`${base}carregadores/`} data-route className="energy-path reveal">
              <span>02</span><strong>Carregamento elétrico para empresas e condomínios</strong><p>Avaliação elétrica, fornecimento, instalação, sinalização, manutenção e integração solar.</p><i>↗</i>
            </a>
          </div>
        </section>

        <section className="metrics section-space">
          <div className="section-heading reveal">
            <div><span className="section-number">07 — PLATAFORMA</span><p className="kicker"><span /> Estrutura em evolução</p></div>
            <h2>Construída para conectar operações e abrir novas possibilidades.</h2>
          </div>
          <div className="metrics-grid">
            {ecosystemMetrics.map(([value, label]) => <div className="metric reveal" key={label}><strong>{value}</strong><span>{label}</span></div>)}
          </div>
          <p className="metrics-note">Indicadores institucionais de estrutura e posicionamento — não representam projeções financeiras ou promessas de desempenho.</p>
        </section>

        <section className="partners section-space">
          <div className="partners-heading reveal"><span className="section-number">08 — CONEXÕES</span><h2>Parcerias para ampliar operações e atendimento regional.</h2></div>
          <div className="partner-marquee" aria-label="Públicos conectados ao ecossistema">
            <div>{[...partnerTypes, ...partnerTypes].map((partner, index) => <span key={`${partner}-${index}`}>{partner}<i>✦</i></span>)}</div>
          </div>
        </section>

        <section className="contact-section gradient-contact section-space" id="contato">
          <div className="cta-glow" aria-hidden="true" />
          <div className="contact-copy reveal">
            <span className="section-number">09 — CONTATO</span>
            <p className="kicker"><span /> Próximo passo</p>
            <h2>Qual solução sua empresa precisa?</h2>
            <p>Informe sua necessidade e a equipe da T&amp;G entrará em contato.</p>
            <a className="text-link" href={`${base}solicitar-proposta/`} data-route>Solicitar atendimento <i aria-hidden="true">↗</i></a>
          </div>
          <ContactForm compact intent="Serviço logístico" />
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
