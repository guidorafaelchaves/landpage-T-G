import { useState } from 'react'
import { contact } from '../../content/contact.js'

export default function ContactForm({ compact = false, intent = 'Logística' }) {
  const [status, setStatus] = useState('')
  const solar = intent.toLowerCase().includes('solar')

  const submit = (event) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const subject = encodeURIComponent(`Contato pelo site — ${data.get('interesse')}`)
    const body = encodeURIComponent([
      `Nome: ${data.get('nome')}`,
      `Empresa: ${data.get('empresa') || 'Não informado'}`,
      `Telefone/WhatsApp: ${data.get('telefone')}`,
      `E-mail: ${data.get('email')}`,
      `Cidade/UF: ${data.get('cidade')} / ${data.get('estado')}`,
      `Interesse: ${data.get('interesse')}`,
      `Prazo: ${data.get('prazo')}`,
      ...(solar ? [
        `Valor médio da conta: ${data.get('valor-conta') || 'Não informado'}`,
        `Tipo de imóvel: ${data.get('tipo-imovel') || 'Não informado'}`,
        `Consumo médio: ${data.get('consumo') || 'Não informado'}`,
        `Concessionária: ${data.get('concessionaria') || 'Não informado'}`,
        `Interesse em financiamento: ${data.get('financiamento') || 'Não informado'}`,
      ] : []),
      '',
      data.get('mensagem'),
    ].join('\n'))
    setStatus(solar && data.get('conta-arquivo')?.name
      ? 'Abrindo seu e-mail. Anexe o arquivo selecionado antes de enviar.'
      : 'Abrindo seu aplicativo de e-mail para concluir o envio.')
    window.location.href = `mailto:${contact.email}?subject=${subject}&body=${body}`
  }

  return (
    <form className={`contact-form ${compact ? 'is-compact' : ''}`} onSubmit={submit}>
      <div className="form-row">
        <label>Nome<input required name="nome" autoComplete="name" /></label>
        <label>Empresa<input name="empresa" autoComplete="organization" /></label>
      </div>
      <div className="form-row">
        <label>Telefone ou WhatsApp<input required name="telefone" type="tel" autoComplete="tel" /></label>
        <label>E-mail<input required name="email" type="email" autoComplete="email" /></label>
      </div>
      <div className="form-row">
        <label>Cidade<input required name="cidade" autoComplete="address-level2" /></label>
        <label>Estado<input required name="estado" maxLength="2" autoComplete="address-level1" /></label>
      </div>
      <div className="form-row">
        <label>O que você procura?
          <select name="interesse" defaultValue={intent}>
            <option>{intent}</option>
            <option>Serviço logístico</option>
            <option>Armazenagem</option>
            <option>Bicicleta elétrica</option>
            <option>Bicicleta de carga</option>
            <option>Frota empresarial</option>
            <option>Energia solar</option>
            <option>Carregador veicular</option>
            <option>Carregador para bicicleta</option>
            <option>Manutenção</option>
            <option>Parceria comercial</option>
            <option>Outro</option>
          </select>
        </label>
        <label>Quando pretende iniciar?
          <select name="prazo" defaultValue="Ainda estou pesquisando">
            <option>Imediatamente</option>
            <option>Nos próximos 30 dias</option>
            <option>De 1 a 3 meses</option>
            <option>De 3 a 6 meses</option>
            <option>Ainda estou pesquisando</option>
          </select>
        </label>
      </div>
      {solar && (
        <>
          <div className="form-row">
            <label>Valor médio da conta<input name="valor-conta" inputMode="decimal" placeholder="R$" /></label>
            <label>Tipo de imóvel
              <select name="tipo-imovel" defaultValue="Empresa">
                <option>Empresa</option>
                <option>Condomínio</option>
                <option>Residência</option>
                <option>Imóvel rural</option>
                <option>Outro</option>
              </select>
            </label>
          </div>
          <div className="form-row">
            <label>Consumo médio, se conhecido<input name="consumo" placeholder="kWh/mês" /></label>
            <label>Concessionária<input name="concessionaria" /></label>
          </div>
          <div className="form-row">
            <label>Interesse em financiamento?
              <select name="financiamento" defaultValue="Quero conhecer as opções">
                <option>Quero conhecer as opções</option>
                <option>Sim</option>
                <option>Não</option>
                <option>Ainda não sei</option>
              </select>
            </label>
            <label>Conta de energia<input name="conta-arquivo" type="file" accept=".pdf,.jpg,.jpeg,.png" /></label>
          </div>
        </>
      )}
      <label>Descreva sua necessidade<textarea required name="mensagem" rows={compact ? 3 : 5} /></label>
      <label className="consent-field"><input required type="checkbox" name="consentimento" /> Autorizo a T&amp;G a entrar em contato sobre esta solicitação.</label>
      <button className="button button-primary magnetic" type="submit"><span>Enviar solicitação</span><i aria-hidden="true">↗</i></button>
      <p className="form-status" role="status">{status}</p>
    </form>
  )
}
