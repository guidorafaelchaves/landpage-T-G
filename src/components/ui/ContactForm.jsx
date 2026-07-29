import { useState } from 'react'

export default function ContactForm({ compact = false }) {
  const [status, setStatus] = useState('')

  const submit = (event) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const subject = encodeURIComponent(`Contato pelo site — ${data.get('interesse')}`)
    const body = encodeURIComponent(`Nome: ${data.get('nome')}\nEmpresa: ${data.get('empresa')}\nTelefone: ${data.get('telefone')}\nInteresse: ${data.get('interesse')}\n\n${data.get('mensagem')}`)
    setStatus('Abrindo seu aplicativo de e-mail para concluir o envio.')
    window.location.href = `mailto:contato@tginovations.com.br?subject=${subject}&body=${body}`
  }

  return (
    <form className={`contact-form ${compact ? 'is-compact' : ''}`} onSubmit={submit}>
      <div className="form-row">
        <label>Nome<input required name="nome" autoComplete="name" /></label>
        <label>Empresa<input name="empresa" autoComplete="organization" /></label>
      </div>
      <div className="form-row">
        <label>Telefone<input required name="telefone" type="tel" autoComplete="tel" /></label>
        <label>Interesse
          <select name="interesse" defaultValue="Logística">
            <option>Logística</option>
            <option>Galpão</option>
            <option>E-Bikes</option>
            <option>Energia solar</option>
            <option>Carregadores</option>
            <option>Parceria ou investimento</option>
          </select>
        </label>
      </div>
      <label>Como podemos ajudar?<textarea required name="mensagem" rows={compact ? 3 : 5} /></label>
      <button className="button button-primary magnetic" type="submit"><span>Enviar solicitação</span><i aria-hidden="true">↗</i></button>
      <p className="form-status" role="status">{status}</p>
    </form>
  )
}
