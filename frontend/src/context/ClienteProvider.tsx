import { useState, useEffect } from 'react';
import { ClienteContext } from './ClienteContext';
import type { Cliente } from '../types/Cliente';

export function ClienteProvider({ children }: { children: React.ReactNode }) {
  const [clientes, setClientes] = useState<Cliente[]>(() => {
    const clientesSalvos = localStorage.getItem('clientes');
    return clientesSalvos ? JSON.parse(clientesSalvos) : [];
  });

  useEffect(() => {
    localStorage.setItem('clientes', JSON.stringify(clientes));
  }, [clientes]);

  const adicionarCliente = (cliente: Cliente) => {
    setClientes((prev) => [...prev, cliente]);
  };
  const editarCliente = (clienteAtualizado: Cliente) => {
  setClientes((prev) =>
    prev.map((c) => (c.id === clienteAtualizado.id ? clienteAtualizado : c))
  );
};
const excluirCliente = (id: string) => {
  setClientes((prev) => prev.filter((c) => c.id !== id));
};

  return (
   <ClienteContext.Provider value={{ clientes, adicionarCliente, editarCliente, excluirCliente }}>

      {children}
    </ClienteContext.Provider>
  );
}
