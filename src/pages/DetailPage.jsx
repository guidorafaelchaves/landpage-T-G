import { useEffect } from 'react'
import SiteHeader from '../components/layout/SiteHeader.jsx'
import SiteFooter from '../components/layout/SiteFooter.jsx'
import AnimatedTitle from '../components/ui/AnimatedTitle.jsx'
import ContactForm from '../components/ui/ContactForm.jsx'
import { routeLabel, routePages } from '../content/routes.js'
import { whatsappMessages, whatsappUrl } from '../content/contact.js'
import { siteBase as base } from '../siteBase.js'

function StructuredData({ page, canonicalRoute }) {
  useEffect(() => {
    const node = document.createElement('script')
    node.type = 'application/ld+json'
    node.dataset.pageSchema = canonicalRoute
    node.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: page.title,
      description: page.summary,
      url: `https://tg.log.br/${canonicalRoute}/`,
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
  }, [canonicalRoute, page])
  return null
}

function Breadcrumb({ route, page }) {
  const parts = route.split('/')
  const parentPath = parts.length > 1 ? `/${parts[0]}` : ''
  return (
    <nav className="breadcrumb" aria-label="Navegação estrutural">
      <a href={base} data-route>Início</a>
      <span>/</span>
      {parentPath && <><a href={`${base}${parts[0]}/`} data-route>{page.category}</a><span>/</span></>}
      <strong>{page.eyebrow}</strong>
    </nav>
  )
}

export default function DetailPage({ route, canonicalRoute, page }) {
  const message = whatsappMessages[page.category] || whatsappMessages.default
  const whatsApp = whatsappUrl(message)
  const parent = route.split('/')[0]

  return (
    <>
      <StructuredData page={page} canonicalRoute={canonicalRoute} />
      <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
      <div className="route-curtain" aria-hidden="true"><span>T&amp;G</span></div>
      <div className="cursor" aria-hidden="true"><span>Explorar</span></div>
      <SiteHeader current={parent} />
      <main id="conteudo" className={`internal-page detail-page detail-${page.variant}`}>
        <section className="internal-hero gradient-hero" id="topo">
          <div className="internal-hero-grid" aria-hidden="true" />
          <div className="gradient-depth" aria-hidden="true"><span /><span /><span /></div>
          <Breadcrumb route={route} page={page} />
          <div className="internal-hero-copy">
            <p className="kicker"><span /> {page.eyebrow}</p>
            <AnimatedTitle>{page.title}</AnimatedTitle>
            <p>{page.summary}</p>
            <div className="hero-actions">
              <a className="button button-primary magnetic" href="#contato"><span>{page.cta}</span><i aria-hidden="true">↓</i></a>
              {page.secondaryCta && <a className="button button-ghost" href="#como-funciona"><span>{page.secondaryCta}</span><i aria-hidden="true">↘</i></a>}
              {whatsApp && <a className="button button-ghost" href={whatsApp} target="_blank" rel="noreferrer"><span>Falar no WhatsApp</span><i aria-hidden="true">↗</i></a>}
            </div>
          </div>
          <div className={`internal-sculpture sculpture-${page.variant}`} aria-hidden="true"><span /><span /><span /><i /></div>
          <div className="internal-statement">Necessidade → solução → próximo passo</div>
        </section>

        <section className="internal-intro section-space">
          <span className="section-number">01 — APLICAÇÕES</span>
          <div className="internal-intro-grid">
            <h2 className="reveal">O que pode fazer parte da solução.</h2>
            <div className="reveal">
              <p>{page.summary}</p>
              {page.note && <p className="page-note">{page.note}</p>}
            </div>
          </div>
          <div className="service-tiles">
            {page.items.map((item, index) => (
              <article className="service-tile reveal" key={item}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <h3>{item}</h3>
              </article>
            ))}
          </div>
        </section>

        <section className="process-gallery section-space" id="como-funciona">
          <div className="section-heading reveal">
            <div><span className="section-number">02 — COMO FUNCIONA</span><p className="kicker"><span /> Processo claro</p></div>
            <h2>Da necessidade a uma proposta viável.</h2>
          </div>
          <div className="process-steps">
            {page.steps.map((step, index) => (
              <article className="process-step reveal" key={step}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <p>{step}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="related-section section-space">
          <div className="section-heading reveal">
            <div><span className="section-number">03 — PRÓXIMOS CAMINHOS</span><p className="kicker"><span /> Soluções relacionadas</p></div>
            <h2>Continue pela solução que complementa sua necessidade.</h2>
          </div>
          <div className="related-grid">
            {page.related.slice(0, 3).map((path, index) => {
              const key = path.replace(/^\/|\/$/g, '')
              const relatedPage = routePages[key]
              return (
                <a href={`${base}${key}/`} data-route key={path}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <strong>{relatedPage?.eyebrow || routeLabel(path)}</strong>
                  <i aria-hidden="true">↗</i>
                </a>
              )
            })}
          </div>
        </section>

        <section className="faq-section section-space">
          <div className="faq-heading reveal"><span className="section-number">04 — PERGUNTAS</span><h2>Informação antes da decisão.</h2></div>
          <div className="faq-list">
            {page.faq.map(([question, answer]) => (
              <details className="reveal" key={question}>
                <summary>{question}<i aria-hidden="true">+</i></summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="contact-section gradient-contact section-space" id="contato">
          <div className="contact-copy reveal">
            <span className="section-number">05 — PRÓXIMO PASSO</span>
            <p className="kicker"><span /> Atendimento comercial</p>
            <h2>{page.cta}</h2>
            <p>Conte sua necessidade. A T&amp;G fará as perguntas necessárias para avaliar escopo, viabilidade e atendimento.</p>
            <address>Rua Manoel Martins Lemos, 580<br />Primavera · Arapiraca/AL</address>
            {whatsApp && <a className="text-link" href={whatsApp} target="_blank" rel="noreferrer">Falar no WhatsApp <i aria-hidden="true">↗</i></a>}
          </div>
          <ContactForm compact intent={page.formIntent} />
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
