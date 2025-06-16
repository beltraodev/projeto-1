import { useState } from 'react'
import './App.css'

function App() {
  const [produtos, setProdutos] = useState([])
  const [form, setForm] = useState({
    codigo: '',
    nome: '',
    quantidade: '',
    preco: ''
  })

  const [codigoBusca, setCodigoBusca] = useState('')
  const [resultadoBusca, setResultadoBusca] = useState(null)

  const handleInputChange = (e) => {
    const { id, value } = e.target
    setForm({ ...form, [id]: value })
  }

  const adicionarProduto = (e) => {
    e.preventDefault()
    setProdutos([...produtos, form])
    setForm({ codigo: '', nome: '', quantidade: '', preco: '' })
  }

  const buscarProduto = () => {
    const produto = produtos.find(p => p.codigo === codigoBusca)
    setResultadoBusca(produto || 'Produto não encontrado.')
  }

  const removerProduto = (codigo) => {
    setProdutos(produtos.filter(p => p.codigo !== codigo))
  }

  return (
    <div className="container">
      <h1>Controle de Estoque</h1>

      {/* Adicionar Produto */}
      <section className="form-section">
        <h2>Adicionar Produto</h2>
        <form onSubmit={adicionarProduto}>
          <input
            type="number"
            id="codigo"
            placeholder="Código"
            value={form.codigo}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            id="nome"
            placeholder="Nome do Produto"
            value={form.nome}
            onChange={handleInputChange}
            required
          />
          <input
            type="number"
            id="quantidade"
            placeholder="Quantidade"
            value={form.quantidade}
            onChange={handleInputChange}
            required
          />
          <input
            type="number"
            id="preco"
            placeholder="Preço (R$)"
            step="0.01"
            value={form.preco}
            onChange={handleInputChange}
            required
          />
          <button type="submit">Adicionar</button>
        </form>
      </section>

      {/* Buscar Produto */}
      <section className="form-section">
        <h2>Buscar Produto</h2>
        <input
          type="number"
          placeholder="Código do Produto"
          value={codigoBusca}
          onChange={(e) => setCodigoBusca(e.target.value)}
        />
        <button onClick={buscarProduto}>Buscar</button>
        <p>
          {resultadoBusca && typeof resultadoBusca === 'object' ? (
            <span>
              {resultadoBusca.nome} - {resultadoBusca.quantidade} unidades - R$ {resultadoBusca.preco}
            </span>
          ) : (
            resultadoBusca
          )}
        </p>
      </section>

      {/* Lista de Produtos */}
      <section className="form-section">
        <h2>Lista de Produtos</h2>
        <table>
          <thead>
            <tr>
              <th>Código</th>
              <th>Nome</th>
              <th>Quantidade</th>
              <th>Preço (R$)</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {produtos.map((produto) => (
              <tr key={produto.codigo}>
                <td>{produto.codigo}</td>
                <td>{produto.nome}</td>
                <td>{produto.quantidade}</td>
                <td>{produto.preco}</td>
                <td>
                  <button onClick={() => removerProduto(produto.codigo)}>
                    Remover
                  </button>
                </td>
              </tr>
            ))}
            {produtos.length === 0 && (
              <tr>
                <td colSpan="5">Nenhum produto cadastrado.</td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
    </div>
  )
}

export default App
