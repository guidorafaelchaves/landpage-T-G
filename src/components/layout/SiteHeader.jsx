import { useEffect, useState } from 'react'

const base = import.meta.env.BASE_URL

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
            <a className={current === 'logistica' ? 'is-current' : ''} href={`${base}logistica/`} data-route onClick={() => setOpen(false)}>Logística</a>
            <a className={current === 'e-bikes' ? 'is-current' : ''} href={`${base}e-bikes/`} data-route onClick={() => setOpen(false)}>E-Bikes</a>
            <a className={current === 'energia-solar' ? 'is-current' : ''} href={`${base}energia-solar/`} data-route onClick={() => setOpen(false)}>Energia</a>
            <a className={current === 'carregadores' ? 'is-current' : ''} href={`${base}carregadores/`} data-route onClick={() => setOpen(false)}>Recarga</a>
            <a className={current === 'sobre' ? 'is-current' : ''} href={`${base}sobre/`} data-route onClick={() => setOpen(false)}>Sobre</a>
          </div>
          <a className="nav-contact magnetic" href={`${base}contato/`} data-route onClick={() => setOpen(false)}>
            <span>Iniciar conversa</span>
            <i aria-hidden="true">↗</i>
          </a>
          <small>Arapiraca · Alagoas · Brasil</small>
        </div>
      </nav>
    </header>
  )
}
