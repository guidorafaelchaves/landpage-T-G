import SiteHeader from '../components/layout/SiteHeader.jsx'
import SiteFooter from '../components/layout/SiteFooter.jsx'
import AnimatedTitle from '../components/ui/AnimatedTitle.jsx'

const base = import.meta.env.BASE_URL

export default function AboutPage() {
  return (
    <>
      <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
      <div className="route-curtain" aria-hidden="true"><span>T&amp;G</span></div>
      <SiteHeader current="sobre" />
      <main id="conteudo" className="internal-page page-sobre">
        <section className="internal-hero" id="topo">
          <div className="internal-hero-grid" aria-hidden="true" />
          <div className="breadcrumb"><a href={base} data-route>Início</a><span>/</span><strong>Sobre</strong></div>
          <div className="internal-hero-copy">
            <p className="kicker"><span /> Sobre a T&amp;G</p>
            <AnimatedTitle>Construímos conexões entre infraestrutura e futuro.</AnimatedTitle>
            <p>A T&amp;G Innovations nasce em Arapiraca com uma visão integrada de logística, mobilidade elétrica, energia limpa e tecnologia aplicada.</p>
          </div>
          <div className="internal-sculpture sculpture-sobre" aria-hidden="true"><span /><span /><span /><i /></div>
          <div className="internal-statement">Pensar grande. Implantar com responsabilidade.</div>
        </section>

        <section className="about-story section-space">
          <span className="section-number">01 — ORIGEM</span>
          <div className="about-story-grid">
            <h2 className="reveal">Uma empresa regional com ambição de plataforma.</h2>
            <div className="reveal">
              <p>Começamos por uma base física real: um endereço em Arapiraca capaz de apoiar operações, reunir parceiros e validar novas soluções.</p>
              <p>A partir dela, estruturamos uma visão na qual mercadorias, energia, veículos e dados podem trabalhar dentro do mesmo ecossistema.</p>
            </div>
          </div>
        </section>

        <section className="principles section-space">
          <div className="section-heading reveal">
            <div><span className="section-number">02 — PRINCÍPIOS</span><p className="kicker"><span /> Como avançamos</p></div>
            <h2>Sofisticação começa com clareza.</h2>
          </div>
          <div className="principle-grid">
            {[
              ['01', 'Infraestrutura antes da promessa', 'Diferenciamos o que existe, o que está em implantação e o que pertence à visão futura.'],
              ['02', 'Tecnologia com função', 'Aplicamos tecnologia para simplificar decisões, fluxos e experiências — não como decoração.'],
              ['03', 'Parcerias como multiplicador', 'A plataforma cresce conectando especialistas, operadores, empresas e capital responsável.'],
              ['04', 'Evolução por validação', 'Projetos-piloto, aprendizado e demanda real orientam a expansão de cada frente.'],
            ].map(([number, title, text]) => <article className="principle reveal" key={number}><span>{number}</span><h3>{title}</h3><p>{text}</p></article>)}
          </div>
        </section>

        <section className="transparency-band section-space">
          <div className="reveal"><span className="status-dot is-real" /><small>Estrutura existente</small><h3>Base física em Arapiraca</h3><p>Endereço institucional e plataforma inicial para relacionamento, estruturação e operações compatíveis.</p></div>
          <div className="reveal"><span className="status-dot is-building" /><small>Em desenvolvimento</small><h3>Capacidades operacionais</h3><p>Processos, equipe, parceiros e modelos comerciais avançam conforme validação.</p></div>
          <div className="reveal"><span className="status-dot is-vision" /><small>Visão de futuro</small><h3>Ecossistema integrado</h3><p>Logística, mobilidade, energia, recarga e dados conectados em uma plataforma escalável.</p></div>
        </section>

        <section className="final-cta section-space">
          <div className="cta-glow" aria-hidden="true" />
          <div className="final-cta-copy reveal">
            <p className="kicker"><span /> Construa conosco</p>
            <h2>Boas plataformas começam com bons parceiros.</h2>
            <a className="button button-primary magnetic" href={`${base}contato/`} data-route><span>Conhecer a T&amp;G</span><i>↗</i></a>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
