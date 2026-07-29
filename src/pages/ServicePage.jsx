import { useEffect } from 'react'
import SiteHeader from '../components/layout/SiteHeader.jsx'
import SiteFooter from '../components/layout/SiteFooter.jsx'
import AnimatedTitle from '../components/ui/AnimatedTitle.jsx'
import ContactForm from '../components/ui/ContactForm.jsx'
import { businessUnits } from '../content/site.js'

const base = import.meta.env.BASE_URL

function StructuredData({ page, slug }) {
  useEffect(() => {
    const node = document.createElement('script')
    node.type = 'application/ld+json'
    node.dataset.pageSchema = slug
    node.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: page.eyebrow,
      description: page.summary,
      provider: {
        '@type': 'Organization',
        name: 'T&G Innovations',
        url: 'https://tg.log.br/',
      },
      areaServed: {
        '@type': 'City',
        name: 'Arapiraca',
      },
    })
    document.head.appendChild(node)
    return () => node.remove()
  }, [page, slug])
  return null
}

export default function ServicePage({ slug, page }) {
  return (
    <>
      <StructuredData page={page} slug={slug} />
      <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
      <div className="route-curtain" aria-hidden="true"><span>T&amp;G</span></div>
      <div className="cursor" aria-hidden="true"><span>Explorar</span></div>
      <SiteHeader current={slug} />
      <main id="conteudo" className={`internal-page page-${slug}`}>
        <section className="internal-hero" id="topo">
          <div className="internal-hero-grid" aria-hidden="true" />
          <div className="breadcrumb"><a href={base} data-route>Início</a><span>/</span><strong>{page.eyebrow}</strong></div>
          <div className="internal-hero-copy">
            <p className="kicker"><span /> {page.eyebrow}</p>
            <AnimatedTitle>{page.title}</AnimatedTitle>
            <p>{page.summary}</p>
            <div className="hero-actions">
              <a className="button button-primary magnetic" href="#contato"><span>Solicitar proposta</span><i>↓</i></a>
              {slug === 'logistica' && <a className="button button-ghost" href={`${base}galpao/`} data-route><span>Conhecer o galpão</span><i>↗</i></a>}
            </div>
          </div>
          <div className={`internal-sculpture sculpture-${slug}`} aria-hidden="true"><span /><span /><span /><i /></div>
          <div className="internal-statement">{page.statement}</div>
        </section>

        <section className="internal-intro section-space">
          <span className="section-number">01 — POR QUE T&amp;G</span>
          <div className="internal-intro-grid">
            <h2 className="reveal">Infraestrutura pensada a partir da operação.</h2>
            <p className="reveal">Cada projeto começa com contexto: necessidade, volume, local, capacidade, responsabilidades e uma visão clara do que precisa ser validado.</p>
          </div>
          <div className="benefits-grid">
            {page.benefits.map(([title, text], index) => <article className="benefit-card reveal" key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{text}</p></article>)}
          </div>
        </section>

        <section className="capability-section section-space">
          <div className="section-heading reveal">
            <div><span className="section-number">02 — CAPACIDADES</span><p className="kicker"><span /> Soluções</p></div>
            <h2>O que pode fazer parte do projeto.</h2>
          </div>
          <div className="capability-list">
            {page.services.map((service, index) => <div className="capability-row reveal" key={service}><span>{String(index + 1).padStart(2, '0')}</span><strong>{service}</strong><i>+</i></div>)}
          </div>
        </section>

        <section className="process-gallery section-space">
          <div className="section-heading reveal">
            <div><span className="section-number">03 — JORNADA</span><p className="kicker"><span /> Como funciona</p></div>
            <h2>Do diagnóstico à operação.</h2>
          </div>
          <div className="scene-grid">
            {page.scenes.map(([title, text], index) => <article className="scene-card reveal" key={title}><div className={`scene-art scene-art-${index}`}><span /><i /><b /></div><small>ETAPA 0{index + 1}</small><h3>{title}</h3><p>{text}</p></article>)}
          </div>
        </section>

        <section className="faq-section section-space">
          <div className="faq-heading reveal"><span className="section-number">04 — PERGUNTAS</span><h2>Informação antes da decisão.</h2></div>
          <div className="faq-list">
            {page.faq.map(([question, answer]) => <details className="reveal" key={question}><summary>{question}<i>+</i></summary><p>{answer}</p></details>)}
          </div>
        </section>

        <section className="contact-section section-space" id="contato">
          <div className="contact-copy reveal">
            <span className="section-number">05 — CONTATO</span>
            <p className="kicker"><span /> Vamos conversar</p>
            <h2>Conte o que sua operação precisa.</h2>
            <p>Responderemos com as perguntas certas para entender viabilidade, escopo e próximo passo.</p>
            <address>Rua Manoel Martins Lemos, 580<br />Primavera · Arapiraca/AL</address>
          </div>
          <ContactForm compact />
        </section>

        <section className="related-section section-space">
          <span className="section-number">CONTINUE EXPLORANDO</span>
          <div className="related-grid">
            {businessUnits.filter((item) => item.slug !== slug).slice(0, 3).map((item) => <a href={`${base}${item.slug}/`} data-route key={item.slug}><span>{item.number}</span><strong>{item.label}</strong><i>↗</i></a>)}
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
