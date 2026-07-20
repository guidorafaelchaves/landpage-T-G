import React, { lazy, Suspense, useCallback, useEffect, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import DossierDrawer from './components/DossierDrawer.jsx'
import { audiences, futurePillars, growthPhases, operations, transparency, useCases } from './content/overview.js'
import './styles.css'

const ThreeScene = lazy(() => import('./components/ThreeScene.jsx'))
const logoUrl = `${import.meta.env.BASE_URL}logo.png`
const dossierKeyFromHash = () => window.location.hash.startsWith('#dossie-')
  ? window.location.hash.slice('#dossie-'.length)
  : null

function FloatingParcel({ index }) {
  return <div className={`parcel parcel-${index}`} aria-hidden="true"><span>T&G</span><i /></div>
}

function DetailButton({ detailKey, onOpen, className = '', children, label }) {
  return (
    <button className={className} type="button" onClick={(event) => onOpen(detailKey, event.currentTarget)} aria-label={label}>
      {children}
    </button>
  )
}

function ServiceCard({ item, index, onOpen }) {
  const ref = useRef(null)
  const onMove = (event) => {
    if (!window.matchMedia('(hover: hover)').matches) return
    const rect = ref.current.getBoundingClientRect()
    const x = (event.clientX - rect.left) / rect.width - 0.5
    const y = (event.clientY - rect.top) / rect.height - 0.5
    ref.current.style.setProperty('--rx', `${-y * 8}deg`)
    ref.current.style.setProperty('--ry', `${x * 9}deg`)
    ref.current.style.setProperty('--mx', `${(x + 0.5) * 100}%`)
    ref.current.style.setProperty('--my', `${(y + 0.5) * 100}%`)
  }
  const reset = () => {
    ref.current?.style.setProperty('--rx', '0deg')
    ref.current?.style.setProperty('--ry', '0deg')
  }
  return (
    <button ref={ref} type="button" onPointerMove={onMove} onPointerLeave={reset} onClick={(event) => onOpen(item.key, event.currentTarget)} className="service-card cinematic-card">
      <span className="service-index">0{index + 1}</span>
      <h3>{item.title}</h3>
      <p>{item.text}</p>
      <span className="card-action">Aprofundar <span aria-hidden="true">↗</span></span>
    </button>
  )
}

function App() {
  const [activeDetail, setActiveDetail] = useState(dossierKeyFromHash)
  const [activeAudience, setActiveAudience] = useState(audiences[0])
  const [menuOpen, setMenuOpen] = useState(false)
  const [showThree, setShowThree] = useState(false)
  const triggerRef = useRef(null)

  const openDetail = useCallback((key, trigger) => {
    triggerRef.current = trigger
    setMenuOpen(false)
    setActiveDetail(key)
    window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}#dossie-${key}`)
  }, [])

  const closeDetail = useCallback(() => {
    setActiveDetail(null)
    window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}`)
  }, [])

  useEffect(() => {
    const syncDossierRoute = () => setActiveDetail(dossierKeyFromHash())
    syncDossierRoute()
    window.addEventListener('hashchange', syncDossierRoute)
    window.addEventListener('popstate', syncDossierRoute)
    return () => {
      window.removeEventListener('hashchange', syncDossierRoute)
      window.removeEventListener('popstate', syncDossierRoute)
    }
  }, [])

  useEffect(() => {
    let stopEffects = () => {}
    let cancelled = false
    const start = () => {
      import('./effects.js').then(({ startEffects }) => {
        if (!cancelled) stopEffects = startEffects()
      })
      const enoughMemory = !navigator.deviceMemory || navigator.deviceMemory >= 4
      if (enoughMemory && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) setShowThree(true)
    }
    const idleId = window.requestIdleCallback ? window.requestIdleCallback(start, { timeout: 1800 }) : window.setTimeout(start, 700)
    return () => {
      cancelled = true
      if (window.cancelIdleCallback) window.cancelIdleCallback(idleId)
      else window.clearTimeout(idleId)
      stopEffects()
    }
  }, [])

  const selectAudience = (audience) => {
    setActiveAudience(audience)
    document.getElementById('audience-result')?.focus({ preventScroll: true })
  }

  return (
    <>
      <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
      <div className="noise" aria-hidden="true" />
      <div className="sun-orb" aria-hidden="true" />
      {showThree && <Suspense fallback={null}><ThreeScene /></Suspense>}
      {[0, 1, 2, 3, 4, 5].map((index) => <FloatingParcel index={index} key={index} />)}

      <header>
        <nav className="container" aria-label="Navegação principal">
          <a href="#inicio" aria-label="T&G Innovations — início"><img src={logoUrl} className="logo" width="238" height="67" alt="T&G Innovations" /></a>
          <button className="menu-toggle" type="button" aria-expanded={menuOpen} aria-controls="main-menu" onClick={() => setMenuOpen((value) => !value)}>Menu</button>
          <div id="main-menu" className={`nav-links ${menuOpen ? 'is-open' : ''}`}>
            <a href="#hub" onClick={() => setMenuOpen(false)}>O Hub</a>
            <a href="#servicos" onClick={() => setMenuOpen(false)}>Serviços</a>
            <a href="#publicos" onClick={() => setMenuOpen(false)}>Para quem</a>
            <a href="#transparencia" onClick={() => setMenuOpen(false)}>Estrutura</a>
            <a className="nav-cta" href="#contato" onClick={() => setMenuOpen(false)}>Agendar reunião</a>
          </div>
        </nav>
      </header>

      <main id="conteudo">
        <section id="inicio" className="hero story">
          <div className="container hero-grid">
            <div className="hero-copy">
              <div className="eyebrow">Hub operacional em Arapiraca</div>
              <h1>A infraestrutura para operar no Agreste <span>sem começar do zero.</span></h1>
              <p className="lead">A T&G Innovations está estruturando uma base regional para logística, mobilidade elétrica, tecnologia e energia sustentável.</p>
              <p className="hero-note">Mais do que espaço: capacidade de operação para transportadoras, marketplaces, distribuidores e empresas de comércio eletrônico.</p>
              <div className="actions">
                <a className="button primary" href="#contato">Agendar uma reunião</a>
                <DetailButton detailKey="positioning" onOpen={openDetail} className="button ghost" label="Entenda nosso posicionamento">Entenda nosso posicionamento</DetailButton>
              </div>
            </div>
            <div className="hero-panel glass" aria-label="Fluxo operacional resumido">
              <div><strong>01 — Receber</strong><span>Uma entrada organizada e regional.</span></div>
              <div><strong>02 — Preparar</strong><span>Conferência, separação e transição.</span></div>
              <div><strong>03 — Conectar</strong><span>Operadores, lojistas e entregadores.</span></div>
            </div>
          </div>
        </section>

        <section id="hub" className="intro reveal">
          <div className="container split-heading">
            <div><div className="eyebrow">Uma extensão da operação</div><h2>Sua empresa em Arapiraca, <em>sem a complexidade de abrir uma nova unidade.</em></h2></div>
            <div className="intro-copy"><p>O T&G Hub pode funcionar como ponto de apoio, área de transição, base de entrega, unidade de cross docking, ponto de coleta ou extensão temporária da operação principal.</p><p className="strategy-line">Um endereço para receber. Uma estrutura para operar.</p></div>
          </div>
        </section>

        <section className="hub-story" aria-label="Fluxo visual do ecossistema T&G">
          <div className="story-stage">
            <div className="story-box b1">01</div><div className="story-box b2">02</div><div className="story-box b3">03</div><div className="story-box b4">04</div><div className="story-box b5">05</div><div className="story-box b6">06</div>
            <div className="hub-core"><img src={logoUrl} width="420" height="118" loading="lazy" alt="T&G Innovations" /><p>Recebimento · Conferência · Cross docking · Expedição</p></div>
            <div className="flow-line line-a" /><div className="flow-line line-b" /><div className="flow-line line-c" />
            <div className="flow-label label-a">Transportadoras</div><div className="flow-label label-b">Lojistas</div><div className="flow-label label-c">Entregadores</div>
          </div>
        </section>

        <section id="servicos" className="services reveal">
          <div className="container">
            <div className="section-title"><div className="eyebrow">Capacidade operacional</div><h2>Uma estrutura pensada para fazer a operação fluir.</h2><p>Clique em cada etapa para conhecer o processo, aplicações e limites operacionais.</p></div>
            <div className="services-grid">{operations.map((item, index) => <ServiceCard key={item.key} item={item} index={index} onOpen={openDetail} />)}</div>
          </div>
        </section>

        <section id="publicos" className="audience-section reveal">
          <div className="container">
            <div className="section-title"><div className="eyebrow">Experiência personalizada</div><h2>Como a T&G pode ajudar você?</h2><p>Escolha seu perfil para encontrar a rota mais relevante dentro do dossiê.</p></div>
            <div className="audience-layout">
              <div className="audience-tabs" role="tablist" aria-label="Selecione seu perfil">
                {audiences.map((audience) => <button key={audience.id} type="button" role="tab" aria-selected={activeAudience.id === audience.id} onClick={() => selectAudience(audience)}>{audience.label}</button>)}
              </div>
              <div id="audience-result" className="audience-result glass" role="tabpanel" tabIndex="-1">
                <div className="eyebrow">Rota recomendada</div><h3>{activeAudience.title}</h3><p>{activeAudience.text}</p>
                <div className="actions"><a className="button primary" href={`#${activeAudience.target}`}>Ir para a seção</a><DetailButton detailKey={activeAudience.detail} onOpen={openDetail} className="button ghost">Abrir dossiê</DetailButton></div>
              </div>
            </div>
          </div>
        </section>

        <section id="transportadoras" className="partner-section reveal">
          <div className="container partner-grid">
            <div><div className="eyebrow">Para transportadoras</div><h2>Amplie sua cobertura regional com menor investimento inicial.</h2><p>A transportadora poderá iniciar uma operação de apoio, testar o mercado, estruturar rotas e ampliar o volume antes de assumir todos os custos de uma unidade própria.</p></div>
            <div className="partner-actions"><DetailButton detailKey="carrierRisk" onOpen={openDetail} className="info-card"><span>01</span><strong>Como reduzimos o risco de expansão</strong><small>Custos fixos podem acompanhar o uso real.</small></DetailButton><DetailButton detailKey="partnershipModels" onOpen={openDetail} className="info-card"><span>02</span><strong>Modelos de parceria possíveis</strong><small>Do ponto de apoio à operação sazonal.</small></DetailButton></div>
          </div>
        </section>

        <section id="lojistas" className="partner-section alternate reveal">
          <div className="container partner-grid">
            <div><div className="eyebrow">Para lojistas</div><h2>Sua loja vende. A T&G ajuda a organizar o caminho até o cliente.</h2><p>Preparação, armazenagem temporária e possibilidade de encaminhamento conforme as parcerias e integrações disponíveis.</p></div>
            <DetailButton detailKey="merchantFlow" onOpen={openDetail} className="feature-card"><strong>Deixe suas mercadorias</strong><p>Vendas pontuais, e-commerce, marketplaces e campanhas sazonais em um fluxo mais organizado.</p><span>Conhecer aplicações ↗</span></DetailButton>
          </div>
        </section>

        <section id="entregadores" className="partner-section reveal">
          <div className="container partner-grid">
            <div><div className="eyebrow">Para entregadores</div><h2>Quem entrega também precisa de estrutura.</h2><p>A T&G pretende criar uma base profissional para retirada, orientação, espera, devolução, carregamento e conexão com empresas parceiras.</p></div>
            <div className="partner-actions"><DetailButton detailKey="courierBase" onOpen={openDetail} className="info-card"><span>01</span><strong>Estrutura para entregadores</strong><small>Uma referência operacional para as rotas.</small></DetailButton><DetailButton detailKey="electricProgram" onOpen={openDetail} className="info-card"><span>02</span><strong>Programa de mobilidade elétrica</strong><small>Visão de implantação, suporte e acesso.</small></DetailButton></div>
          </div>
        </section>

        <section id="futuro" className="future-section reveal">
          <div className="container">
            <div className="section-title"><div className="eyebrow">Ecossistema em evolução</div><h2>Energia, mobilidade e logística no mesmo ecossistema.</h2></div>
            <div className="future-grid">{futurePillars.map((pillar) => <DetailButton key={pillar.key} detailKey={pillar.key} onOpen={openDetail} className="future-card"><span>{pillar.eyebrow}</span><h3>{pillar.title}</h3><p>{pillar.text}</p><small>Aprofundar ↗</small></DetailButton>)}</div>
            <div className="energy-flow" aria-label="Fluxo planejado da logística elétrica">
              {['Mercadoria chega', 'Conferência', 'Organização', 'Definição de rota', 'Carregamento', 'Retirada', 'Entrega regional'].map((step, index) => <React.Fragment key={step}><span>{step}</span>{index < 6 && <i aria-hidden="true">→</i>}</React.Fragment>)}
            </div>
          </div>
        </section>

        <section id="transparencia" className="transparency-section reveal">
          <div className="container">
            <div className="section-title"><div className="eyebrow">Infraestrutura e transparência</div><h2>Uma operação real começa com um endereço real.</h2><p>Rua Manoel Martins Lemos, 580, Primavera, Arapiraca/AL. O que existe, o que está em implantação e o que pertence à visão futura são apresentados separadamente.</p></div>
            <div className="status-grid">{transparency.map((column) => <article key={column.title} className={`status-card ${column.tone}`}><span>{column.status}</span><h3>{column.title}</h3><ul>{column.items.map((item) => <li key={item}>{item}</li>)}</ul></article>)}</div>
            <DetailButton detailKey="transparency" onOpen={openDetail} className="text-link">Entenda nosso compromisso com a transparência ↗</DetailButton>
          </div>
        </section>

        <section id="casos" className="cases-section reveal">
          <div className="container">
            <div className="section-title"><div className="eyebrow">Cenários demonstrativos</div><h2>Como a estrutura pode funcionar na prática.</h2><p>Exemplos hipotéticos; disponibilidade e formato dependem da capacidade e dos acordos de cada operação.</p></div>
            <div className="cases-grid">{useCases.map((item) => <DetailButton key={item.number} detailKey={item.detail} onOpen={openDetail} className="case-card"><span>{item.number}</span><h3>{item.title}</h3><p>{item.text}</p><small>Ver cenário ↗</small></DetailButton>)}</div>
          </div>
        </section>

        <section id="investidores" className="investor-section reveal">
          <div className="container">
            <div className="investor-heading"><div><div className="eyebrow">Parceiros e investidores</div><h2>A T&G está construindo uma plataforma física para múltiplas fontes de receita.</h2></div><DetailButton detailKey="revenue" onOpen={openDetail} className="button primary">Explorar fontes potenciais</DetailButton></div>
            <div className="phase-line">{growthPhases.map(([number, title, text]) => <article key={number}><span>{number}</span><h3>{title}</h3><p>{text}</p></article>)}</div>
            <p className="thesis-note">Esta é uma tese de desenvolvimento, não uma promessa garantida. A evolução depende de validação, demanda, capital e parcerias.</p>
            <DetailButton detailKey="growth" onOpen={openDetail} className="text-link">Abrir tese de crescimento ↗</DetailButton>
          </div>
        </section>

        <section id="ecossistema" className="ecosystem reveal">
          <div className="container ecosystem-grid">
            <div><div className="eyebrow">Ecossistema logístico</div><h2>A T&G conecta quem vende, quem transporta e quem entrega.</h2><p>Infraestrutura compartilhada. Crescimento individual. Uma base regional com potencial de escala.</p></div>
            <div className="network glass" aria-label="Rede conectando o T&G Hub a transportadoras, lojistas, entregadores e clientes">
              <div className="pulse-node center">T&G HUB</div><div className="pulse-node n1">Transportadoras</div><div className="pulse-node n2">Lojistas</div><div className="pulse-node n3">Entregadores</div><div className="pulse-node n4">Cliente final</div>
              <svg viewBox="0 0 600 480" aria-hidden="true"><path d="M300 240 C210 110,130 100,85 90" /><path d="M300 240 C420 115,500 105,535 95" /><path d="M300 240 C175 325,120 375,75 410" /><path d="M300 240 C420 335,505 380,540 415" /></svg>
            </div>
          </div>
        </section>

        <section className="final reveal" id="contato">
          <div className="container final-card glass">
            <img src={logoUrl} width="210" height="59" loading="lazy" alt="T&G Innovations" />
            <div><div className="eyebrow">Parcerias B2B</div><h2>Sua empresa chega a Arapiraca. A T&G ajuda a operação a acontecer.</h2><p>Comece pequeno. Opere com estrutura. Cresça com segurança.</p></div>
            <a className="button primary" href="mailto:contato@tginovations.com.br?subject=Apresentação%20institucional%20T%26G">Solicitar apresentação institucional</a>
          </div>
        </section>
      </main>
      <footer><div className="container"><span>© 2026 T&G Innovations — Arapiraca/AL.</span><a href="#inicio">Voltar ao topo ↑</a></div></footer>

      <DossierDrawer activeKey={activeDetail} onClose={closeDetail} triggerRef={triggerRef} />
    </>
  )
}

createRoot(document.getElementById('root')).render(<App />)
