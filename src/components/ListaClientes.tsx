// src/components/ListaClientes.tsx
import { useContext } from 'react';
import { ClienteContext } from '../context/ClienteContext';

export function ListaClientes() {
  const { clientes } = useContext(ClienteContext)!;

  return (
    <ul>
      {clientes.map((cliente) => (
        <li key={cliente.id}>
          {cliente.nome} – {cliente.email} – {cliente.telefone}
        </li>
      ))}
    </ul>
  );
}
