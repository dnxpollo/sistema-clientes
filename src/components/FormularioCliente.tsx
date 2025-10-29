// src/components/FormularioCliente.tsx
import { useContext, useState } from 'react';
import { ClienteContext } from '../context/ClienteContext';
import type { Cliente } from '../types/Cliente';
import { v4 as uuidv4 } from 'uuid';

export function FormularioCliente() {
  const { adicionarCliente } = useContext(ClienteContext)!;
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const novoCliente: Cliente = {
      id: uuidv4(),
      nome,
      email,
      telefone,
      dataCadastro: new Date().toISOString(),
    };
    adicionarCliente(novoCliente);
    setNome('');
    setEmail('');
    setTelefone('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Nome" />
      <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <input value={telefone} onChange={(e) => setTelefone(e.target.value)} placeholder="Telefone" />
      <button type="submit">Cadastrar</button>
    </form>
  );
}
