import { useState, useEffect } from 'react';
import { ClienteContext } from './ClienteContext';
import type { Cliente } from '../types/Cliente';

export function ClienteProvider({ children }: { children: React.ReactNode }) {
  const [clientes, setClientes] = useState<Cliente[]>([]);

  useEffect(() => {
    const clientesSalvos = localStorage.getItem('clientes');
    if (clientesSalvos) {
      setClientes(JSON.parse(clientesSalvos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('clientes', JSON.stringify(clientes));
  }, [clientes]);

  const adicionarCliente = (cliente: Cliente) => {
    setClientes((prev) => [...prev, cliente]);
  };

  return (
    <ClienteContext.Provider value={{ clientes, adicionarCliente }}>
      {children}
    </ClienteContext.Provider>
  );
}
  