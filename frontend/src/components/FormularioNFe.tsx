import { useState, useContext } from 'react';
import { ClienteContext } from '../context/ClienteContext';
import type { Produto, NFe } from '../types/NFe';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify';
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
  const [isLoading, setIsLoading] = useState(false);
  const [erros, setErros] = useState<{ [key: string]: string }>({});

  const adicionarProduto = () => {
    if (!novoProduto.nome || novoProduto.quantidade <= 0 || novoProduto.valorUnitario <= 0) {
      toast.error('Preencha corretamente os dados do produto');
      return;
    }
    setProdutos([...produtos, novoProduto]);
    setNovoProduto({ nome: '', quantidade: 1, valorUnitario: 0 });
  };

  const valorTotal = produtos.reduce(
    (total, p) => total + p.quantidade * p.valorUnitario,
    0
  );

  const validarCampos = () => {
    const novosErros: { [key: string]: string } = {};
    if (!clienteId) novosErros.clienteId = 'Cliente é obrigatório';
    if (!cnpjEmitente.trim()) novosErros.cnpjEmitente = 'CNPJ é obrigatório';
    if (!formaPagamento.trim()) novosErros.formaPagamento = 'Forma de pagamento é obrigatória';
    if (!dataEmissao.trim()) novosErros.dataEmissao = 'Data de emissão é obrigatória';
    if (produtos.length === 0) novosErros.produtos = 'Adicione pelo menos um produto';

    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  };

  const resetarCampos = () => {
    setClienteId('');
    setCnpjEmitente('');
    setFormaPagamento('');
    setDataEmissao('');
    setProdutos([]);
    setNovoProduto({ nome: '', quantidade: 1, valorUnitario: 0 });
    setErros({});
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validarCampos()) {
      toast.error('Preencha todos os campos obrigatórios');
      return;
    }

    setIsLoading(true);

    const novaNFe: NFe = {
      id: uuidv4(),
      clienteId,
      cnpjEmitente,
      produtos,
      valorTotal,
      formaPagamento,
      dataEmissao,
    };

    try {
      onSalvar(novaNFe);
      toast.success('Nota fiscal salva com sucesso!');
      resetarCampos();
    } catch (error) {
      toast.error('Erro ao salvar nota fiscal');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-nfe">
      {isLoading && <div className="loader">Salvando nota fiscal...</div>}

      <label>Cliente</label>
      <select value={clienteId} onChange={(e) => setClienteId(e.target.value)} className={erros.clienteId ? 'erro' : ''}>
        <option value="">Selecione um cliente</option>
        {clientes.map((c) => (
          <option key={c.id} value={c.id}>
            {c.nome}
          </option>
        ))}
      </select>
      {erros.clienteId && <span className="erro">{erros.clienteId}</span>}

      <label>CNPJ do Emitente</label>
      <input value={cnpjEmitente} onChange={(e) => setCnpjEmitente(e.target.value)} className={erros.cnpjEmitente ? 'erro' : ''} />
      {erros.cnpjEmitente && <span className="erro">{erros.cnpjEmitente}</span>}

      <label>Forma de Pagamento</label>
      <input value={formaPagamento} onChange={(e) => setFormaPagamento(e.target.value)} className={erros.formaPagamento ? 'erro' : ''} />
      {erros.formaPagamento && <span className="erro">{erros.formaPagamento}</span>}

      <label>Data de Emissão</label>
      <input type="date" value={dataEmissao} onChange={(e) => setDataEmissao(e.target.value)} className={erros.dataEmissao ? 'erro' : ''} />
      {erros.dataEmissao && <span className="erro">{erros.dataEmissao}</span>}

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
      {erros.produtos && <span className="erro">{erros.produtos}</span>}

      <ul className="lista-produtos">
        {produtos.map((p, index) => (
          <li key={index}>
            {p.nome} – {p.quantidade} x R${p.valorUnitario.toFixed(2)}
          </li>
        ))}
      </ul>

      <p><strong>Valor Total:</strong> R${valorTotal.toFixed(2)}</p>

      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Processando...' : 'Salvar NFe'}
      </button>
    </form>
  );
}
