import { useContext, useState, useEffect } from 'react';
import { ClienteContext } from '../context/ClienteContext';
import type { Cliente } from '../types/Cliente';
import { v4 as uuidv4 } from 'uuid';
import './FormularioCliente.css';

interface FormularioClienteProps {
  clienteEditando: Cliente | null;
  setClienteEditando: (cliente: Cliente | null) => void;
}

export function FormularioCliente({ clienteEditando, setClienteEditando }: FormularioClienteProps) {
  const { adicionarCliente, editarCliente } = useContext(ClienteContext)!;

  const [nome, setNome] = useState('');
  const [matricula, setMatricula] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [dataVencimento, setDataVencimento] = useState('');
  const [responsavelFinanceiro, setResponsavelFinanceiro] = useState('');
  const [cpfResponsavel, setCpfResponsavel] = useState('');
  const [valor, setValor] = useState('');
  const [formaPagamento, setFormaPagamento] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');
  const [endereco, setEndereco] = useState('');
  const [erros, setErros] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (clienteEditando) {
      setNome(clienteEditando.nome);
      setMatricula(clienteEditando.matricula);
      setDataNascimento(clienteEditando.dataNascimento);
      setDataVencimento(clienteEditando.dataVencimento || '');
      setResponsavelFinanceiro(clienteEditando.responsavelFinanceiro);
      setCpfResponsavel(clienteEditando.cpfResponsavel);
      setValor(clienteEditando.valor);
      setFormaPagamento(clienteEditando.formaPagamento);
      setTelefone(clienteEditando.telefone);
      setEmail(clienteEditando.email);
      setEndereco(clienteEditando.endereco);
    }
  }, [clienteEditando]);

  const validarCampos = () => {
    const novosErros: { [key: string]: string } = {};

    if (!nome.trim()) novosErros.nome = 'Nome é obrigatório';
    if (!matricula.trim()) novosErros.matricula = 'Matrícula é obrigatória';
    if (!dataNascimento.trim()) novosErros.dataNascimento = 'Data de nascimento é obrigatória';
    if (!dataVencimento.trim()) novosErros.dataVencimento = 'Data de vencimento é obrigatória';
    if (!responsavelFinanceiro.trim()) novosErros.responsavelFinanceiro = 'Responsável financeiro é obrigatório';
    if (!cpfResponsavel.trim() || cpfResponsavel.length !== 11) novosErros.cpfResponsavel = 'CPF deve ter 11 dígitos';
    if (!valor.trim() || Number(valor) <= 0) novosErros.valor = 'Valor deve ser maior que zero';
    if (!formaPagamento.trim()) novosErros.formaPagamento = 'Forma de pagamento é obrigatória';
    if (!telefone.trim()) novosErros.telefone = 'Telefone é obrigatório';
    if (!email.trim() || !email.includes('@')) novosErros.email = 'Email inválido';
    if (!endereco.trim()) novosErros.endereco = 'Endereço é obrigatório';

    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validarCampos()) return;

    const clienteFinal: Cliente = {
      id: clienteEditando?.id || uuidv4(),
      nome,
      matricula,
      dataNascimento,
      dataVencimento,
      responsavelFinanceiro,
      cpfResponsavel,
      valor,
      formaPagamento,
      telefone,
      email,
      endereco,
      dataCadastro: clienteEditando?.dataCadastro || new Date().toISOString(),
    };

    if (clienteEditando) {
      editarCliente(clienteFinal);
    } else {
      adicionarCliente(clienteFinal);
    }

    setNome('');
    setMatricula('');
    setDataNascimento('');
    setDataVencimento('');
    setResponsavelFinanceiro('');
    setCpfResponsavel('');
    setValor('');
    setFormaPagamento('');
    setTelefone('');
    setEmail('');
    setEndereco('');
    setErros({});
    setClienteEditando(null);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Nome</label>
      <input value={nome} onChange={(e) => setNome(e.target.value)} className={erros.nome ? 'erro' : ''} />
      {erros.nome && <span className="erro">{erros.nome}</span>}

      <label>Matrícula</label>
      <input value={matricula} onChange={(e) => setMatricula(e.target.value)} className={erros.matricula ? 'erro' : ''} />
      {erros.matricula && <span className="erro">{erros.matricula}</span>}

      <label>Data de Nascimento</label>
      <input value={dataNascimento} onChange={(e) => setDataNascimento(e.target.value)} type="date" className={erros.dataNascimento ? 'erro' : ''} />
      {erros.dataNascimento && <span className="erro">{erros.dataNascimento}</span>}

      <label>Data de Vencimento</label>
      <input value={dataVencimento} onChange={(e) => setDataVencimento(e.target.value)} type="date" className={erros.dataVencimento ? 'erro' : ''} />
      {erros.dataVencimento && <span className="erro">{erros.dataVencimento}</span>}

      <label>Responsável Financeiro</label>
      <input value={responsavelFinanceiro} onChange={(e) => setResponsavelFinanceiro(e.target.value)} className={erros.responsavelFinanceiro ? 'erro' : ''} />
      {erros.responsavelFinanceiro && <span className="erro">{erros.responsavelFinanceiro}</span>}

      <label>CPF do Responsável</label>
      <input value={cpfResponsavel} onChange={(e) => setCpfResponsavel(e.target.value)} className={erros.cpfResponsavel ? 'erro' : ''} />
      {erros.cpfResponsavel && <span className="erro">{erros.cpfResponsavel}</span>}

      <label>Valor</label>
      <input value={valor} onChange={(e) => setValor(e.target.value)} type="number" className={erros.valor ? 'erro' : ''} />
      {erros.valor && <span className="erro">{erros.valor}</span>}

      <label>Forma de Pagamento</label>
      <input value={formaPagamento} onChange={(e) => setFormaPagamento(e.target.value)} className={erros.formaPagamento ? 'erro' : ''} />
      {erros.formaPagamento && <span className="erro">{erros.formaPagamento}</span>}

      <label>Telefone</label>
      <input value={telefone} onChange={(e) => setTelefone(e.target.value)} className={erros.telefone ? 'erro' : ''} />
      {erros.telefone && <span className="erro">{erros.telefone}</span>}

      <label>Email</label>
      <input value={email} onChange={(e) => setEmail(e.target.value)} className={erros.email ? 'erro' : ''} />
      {erros.email && <span className="erro">{erros.email}</span>}

      <label>Endereço</label>
      <input value={endereco} onChange={(e) => setEndereco(e.target.value)} className={erros.endereco ? 'erro' : ''} />
      {erros.endereco && <span className="erro">{erros.endereco}</span>}

      <button type="submit">{clienteEditando ? 'Atualizar' : 'Cadastrar'}</button>
    </form>
  );
}
