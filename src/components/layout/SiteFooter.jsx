const base = import.meta.env.BASE_URL

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <div>
          <img src={`${base}logo.png`} width="779" height="326" loading="lazy" alt="T&G Innovations" />
          <p>Infraestrutura, energia e movimento conectados em um único ecossistema.</p>
        </div>
        <div className="footer-links">
          <div>
            <strong>Soluções</strong>
            <a href={`${base}logistica/`} data-route>Logística</a>
            <a href={`${base}galpao/`} data-route>Galpão</a>
            <a href={`${base}e-bikes/`} data-route>E-Bikes</a>
            <a href={`${base}energia-solar/`} data-route>Energia solar</a>
            <a href={`${base}carregadores/`} data-route>Carregadores</a>
          </div>
          <div>
            <strong>Empresa</strong>
            <a href={`${base}sobre/`} data-route>Sobre a T&G</a>
            <a href={`${base}contato/`} data-route>Contato</a>
            <a href="mailto:contato@tginovations.com.br">E-mail</a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 T&G Innovations.</span>
        <span>Rua Manoel Martins Lemos, 580 · Arapiraca/AL</span>
        <a href="#topo">Voltar ao topo ↑</a>
      </div>
    </footer>
  )
}
