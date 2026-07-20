import { useEffect, useRef, useState } from 'react'

export default function DossierDrawer({ activeKey, onClose, triggerRef }) {
  const [entry, setEntry] = useState(null)
  const panelRef = useRef(null)
  const closeRef = useRef(null)

  useEffect(() => {
    if (!activeKey) return undefined
    let current = true
    setEntry(null)
    import('../content/dossier.js').then(({ dossier }) => {
      if (current) setEntry(dossier[activeKey] || null)
    })
    return () => { current = false }
  }, [activeKey])

  useEffect(() => {
    if (!activeKey) return undefined
    const previousOverflow = document.body.style.overflow
    const backgroundRegions = [...document.querySelectorAll('header, main, footer')]
    document.body.style.overflow = 'hidden'
    backgroundRegions.forEach((region) => { region.inert = true })
    closeRef.current?.focus()

    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
      if (event.key !== 'Tab' || !panelRef.current) return
      const focusable = [...panelRef.current.querySelectorAll('button, a, summary, [tabindex]:not([tabindex="-1"])')]
      if (!focusable.length) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      backgroundRegions.forEach((region) => { region.inert = false })
      document.removeEventListener('keydown', onKeyDown)
      triggerRef.current?.focus()
    }
  }, [activeKey, onClose, triggerRef])

  if (!activeKey) return null

  return (
    <div className="drawer-shell" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <aside className="dossier-drawer" role="dialog" aria-modal="true" aria-labelledby="dossier-title" ref={panelRef}>
        <div className="drawer-topbar">
          <span>Dossiê T&G</span>
          <button ref={closeRef} className="drawer-close" type="button" onClick={onClose} aria-label="Fechar conteúdo aprofundado">Fechar <span aria-hidden="true">×</span></button>
        </div>
        {!entry ? (
          <div className="drawer-loading" role="status">Carregando conteúdo…</div>
        ) : (
          <div className="drawer-content">
            <div className="eyebrow">{entry.eyebrow}</div>
            <h2 id="dossier-title">{entry.title}</h2>
            {entry.intro && <p className="drawer-intro">{entry.intro}</p>}
            {entry.bullets && (
              <ul className="detail-list">
                {entry.bullets.map((item) => <li key={item}>{item}</li>)}
              </ul>
            )}
            {entry.groups && (
              <div className="detail-groups">
                {entry.groups.map(([title, text]) => <article key={title}><h3>{title}</h3><p>{text}</p></article>)}
              </div>
            )}
            {entry.practical && (
              <details className="practical-detail">
                <summary>Ver aplicação prática</summary>
                <p>{entry.practical}</p>
              </details>
            )}
            <p className="drawer-disclaimer">Capacidades futuras ou em implantação estão sujeitas a validação operacional, disponibilidade e formalização de parcerias.</p>
          </div>
        )}
      </aside>
    </div>
  )
}
