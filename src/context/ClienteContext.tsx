import { createContext } from 'react';
import type { Cliente } from '../types/Cliente';

export interface ClienteContextProps {
  clientes: Cliente[];
  adicionarCliente: (cliente: Cliente) => void;
  editarCliente: (cliente: Cliente) => void;
  excluirCliente: (id: string) => void;
}


export const ClienteContext = createContext<ClienteContextProps | undefined>(undefined);

