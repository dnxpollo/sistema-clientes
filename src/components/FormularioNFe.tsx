import { useState, useContext } from 'react';
import { ClienteContext } from '../context/ClienteContext';
import type { Produto, NFe } from '../types/NFe';
import { v4 as uuidv4 } from 'uuid';
import './FormularioNFe.css';

interface FormularioNFeProps {
  onSalvar: (nfe: NFe) => void;
}

export function FormularioNFe({ onSalvar }: FormularioNFeProps) {
  const { clientes } = useContext(ClienteContext)!;

  const [clienteId, setClienteId] = useState('');
  const [cnpjEmitente, setCnpjEmitente] = useState('');
  const [formaPagamento, setFormaPagamento] = useState('');
  const [dataEmissao, setDataEmissao] = useState('');
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [novoProduto, setNovoProduto] = useState<Produto>({
    nome: '',
    quantidade: 1,
    valorUnitario: 0,
  });

  const adicionarProduto = () => {
    if (!novoProduto.nome || novoProduto.quantidade <= 0 || novoProduto.valorUnitario <= 0) return;
    setProdutos([...produtos, novoProduto]);
    setNovoProduto({ nome: '', quantidade: 1, valorUnitario: 0 });
  };

  const valorTotal = produtos.reduce(
    (total, p) => total + p.quantidade * p.valorUnitario,
    0
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clienteId || !cnpjEmitente || !formaPagamento || !dataEmissao || produtos.length === 0) return;

    const novaNFe: NFe = {
      id: uuidv4(),
      clienteId,
      cnpjEmitente,
      produtos,
      valorTotal,
      formaPagamento,
      dataEmissao,
    };

    onSalvar(novaNFe);

    // Resetar campos
    setClienteId('');
    setCnpjEmitente('');
    setFormaPagamento('');
    setDataEmissao('');
    setProdutos([]);
  };

  return (
    <form onSubmit={handleSubmit} className="form-nfe">
      <label>Cliente</label>
      <select value={clienteId} onChange={(e) => setClienteId(e.target.value)}>
        <option value="">Selecione um cliente</option>
        {clientes.map((c) => (
          <option key={c.id} value={c.id}>
            {c.nome}
          </option>
        ))}
      </select>

      <label>CNPJ do Emitente</label>
      <input value={cnpjEmitente} onChange={(e) => setCnpjEmitente(e.target.value)} />

      <label>Forma de Pagamento</label>
      <input value={formaPagamento} onChange={(e) => setFormaPagamento(e.target.value)} />

      <label>Data de Emissão</label>
      <input type="date" value={dataEmissao} onChange={(e) => setDataEmissao(e.target.value)} />

      <label>Produtos</label>
      <div className="produto-form">
        <input
          placeholder="Nome do produto"
          value={novoProduto.nome}
          onChange={(e) => setNovoProduto({ ...novoProduto, nome: e.target.value })}
        />
        <input
          type="number"
          placeholder="Quantidade"
          value={novoProduto.quantidade}
          onChange={(e) => setNovoProduto({ ...novoProduto, quantidade: Number(e.target.value) })}
        />
        <input
          type="number"
          placeholder="Valor unitário"
          value={novoProduto.valorUnitario}
          onChange={(e) => setNovoProduto({ ...novoProduto, valorUnitario: Number(e.target.value) })}
        />
        <button type="button" onClick={adicionarProduto}>Adicionar Produto</button>
      </div>

      <ul className="lista-produtos">
        {produtos.map((p, index) => (
          <li key={index}>
            {p.nome} – {p.quantidade} x R${p.valorUnitario.toFixed(2)}
          </li>
        ))}
      </ul>

      <p><strong>Valor Total:</strong> R${valorTotal.toFixed(2)}</p>

      <button type="submit">Salvar NFe</button>
    </form>
  );
}
