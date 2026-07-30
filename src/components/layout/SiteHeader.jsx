import { useEffect, useState } from 'react'
import { siteBase as base } from '../../siteBase.js'

export default function SiteHeader({ current = 'home' }) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return undefined
    const close = (event) => {
      if (event.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', close)
    return () => document.removeEventListener('keydown', close)
  }, [open])

  return (
    <header className="site-header">
      <nav className="nav-shell" aria-label="Navegação principal">
        <a className="brand" href={base} data-route aria-label="T&G Innovations — página inicial">
          <img src={`${base}logo.png`} width="779" height="326" alt="T&G Innovations" />
        </a>
        <button
          className="menu-toggle"
          type="button"
          aria-controls="primary-navigation"
          aria-expanded={open}
          aria-label={open ? 'Fechar menu principal' : 'Abrir menu principal'}
          onClick={() => setOpen((value) => !value)}
        >
          <span />
          <span />
          <span />
          <b>{open ? 'Fechar' : 'Menu'}</b>
        </button>
        <div id="primary-navigation" className={`nav-panel ${open ? 'is-open' : ''}`}>
          <div className="nav-links">
            <a className={current === 'home' ? 'is-current' : ''} href={base} data-route onClick={() => setOpen(false)}>Início</a>
            <a className={current === 'logistica' ? 'is-current' : ''} href={`${base}logistica/`} data-route onClick={() => setOpen(false)}>Logística</a>
            <a className={current === 'veiculos-eletricos' ? 'is-current' : ''} href={`${base}veiculos-eletricos/`} data-route onClick={() => setOpen(false)}>Veículos elétricos</a>
            <a className={current === 'energia-solar' ? 'is-current' : ''} href={`${base}energia-solar/`} data-route onClick={() => setOpen(false)}>Energia solar</a>
            <a className={current === 'carregadores' ? 'is-current' : ''} href={`${base}carregadores/`} data-route onClick={() => setOpen(false)}>Carregadores</a>
            <a className={current === 'tg-hub-arapiraca' ? 'is-current' : ''} href={`${base}tg-hub-arapiraca/`} data-route onClick={() => setOpen(false)}>T&amp;G Hub</a>
            <a className={current === 'parcerias' ? 'is-current' : ''} href={`${base}parcerias/`} data-route onClick={() => setOpen(false)}>Parcerias</a>
            <a className={current === 'empresa' ? 'is-current' : ''} href={`${base}empresa/contato/`} data-route onClick={() => setOpen(false)}>Contato</a>
          </div>
          <a className="nav-contact magnetic" href={`${base}solicitar-proposta/`} data-route onClick={() => setOpen(false)}>
            <span>Solicitar proposta</span>
            <i aria-hidden="true">↗</i>
          </a>
          <small>Arapiraca · Alagoas · Brasil</small>
        </div>
      </nav>
    </header>
  )
}
