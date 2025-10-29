import { createContext } from 'react';
import type { Cliente } from '../types/Cliente';

export interface ClienteContextProps {
  clientes: Cliente[];
  adicionarCliente: (cliente: Cliente) => void;
}

export const ClienteContext = createContext<ClienteContextProps | undefined>(undefined);

