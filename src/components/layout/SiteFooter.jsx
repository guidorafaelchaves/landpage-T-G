import { siteBase as base } from '../../siteBase.js'

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <div>
          <img src={`${base}logo.png`} width="779" height="326" loading="lazy" alt="T&G Innovations" />
          <p>Logística, mobilidade elétrica e energia para empresas em Arapiraca e região.</p>
        </div>
        <div className="footer-links">
          <div>
            <strong>Soluções</strong>
            <a href={`${base}logistica/`} data-route>Logística</a>
            <a href={`${base}veiculos-eletricos/`} data-route>Veículos elétricos</a>
            <a href={`${base}energia-solar/`} data-route>Energia solar</a>
            <a href={`${base}carregadores/`} data-route>Carregadores</a>
            <a href={`${base}tg-hub-arapiraca/`} data-route>T&amp;G Hub</a>
          </div>
          <div>
            <strong>Empresa</strong>
            <a href={`${base}empresa/sobre/`} data-route>Sobre a T&amp;G</a>
            <a href={`${base}parcerias/`} data-route>Parcerias</a>
            <a href={`${base}empresa/contato/`} data-route>Contato</a>
            <a href={`${base}empresa/localizacao/`} data-route>Localização</a>
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
