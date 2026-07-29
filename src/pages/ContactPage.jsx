import SiteHeader from '../components/layout/SiteHeader.jsx'
import SiteFooter from '../components/layout/SiteFooter.jsx'
import AnimatedTitle from '../components/ui/AnimatedTitle.jsx'
import ContactForm from '../components/ui/ContactForm.jsx'
import { siteBase as base } from '../siteBase.js'

export default function ContactPage() {
  return (
    <>
      <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
      <div className="route-curtain" aria-hidden="true"><span>T&amp;G</span></div>
      <SiteHeader current="contato" />
      <main id="conteudo" className="contact-page">
        <section className="contact-hero" id="topo">
          <div className="breadcrumb"><a href={base} data-route>Início</a><span>/</span><strong>Contato</strong></div>
          <div className="contact-title">
            <p className="kicker"><span /> Comece uma conversa</p>
            <AnimatedTitle>Qual é o seu próximo movimento?</AnimatedTitle>
            <p>Conte seu objetivo. A T&amp;G organiza a conversa a partir da necessidade real.</p>
          </div>
          <ContactForm />
          <div className="contact-details">
            <div><small>E-MAIL</small><a href="mailto:contato@tginovations.com.br">contato@tginovations.com.br</a></div>
            <div><small>ENDEREÇO</small><address>Rua Manoel Martins Lemos, 580<br />Primavera · Arapiraca/AL</address></div>
            <div><small>ATUAÇÃO</small><p>Logística · E-Bikes · Energia solar · Recarga</p></div>
          </div>
        </section>
        <section className="map-section">
          <div className="map-grid" aria-hidden="true"><span className="map-pin">T&amp;G</span></div>
          <div><p className="kicker"><span /> Base regional</p><h2>Estamos em Arapiraca.</h2><p>No centro do Agreste alagoano, conectando operações e oportunidades.</p><a className="text-link" href="https://www.google.com/maps/search/?api=1&query=Rua+Manoel+Martins+Lemos+580+Arapiraca+AL" target="_blank" rel="noreferrer">Abrir no mapa <i>↗</i></a></div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
