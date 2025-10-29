import { useContext } from 'react';
import { ClienteContext } from '../context/ClienteContext';
import type { Cliente } from '../types/Cliente';
import './ListaClientes.css';

interface ListaClientesProps {
  onEditar: (cliente: Cliente) => void;
}

export function ListaClientes({ onEditar }: ListaClientesProps) {
  const { clientes, excluirCliente } = useContext(ClienteContext)!;

  const hoje = new Date();

  const isVencendo = (dataVencimento: string) => {
    const vencimento = new Date(dataVencimento);
    const diasRestantes = (vencimento.getTime() - hoje.getTime()) / (1000 * 60 * 60 * 24);
    return diasRestantes <= 5 && diasRestantes >= 0;
  };

  const isAniversarioSemana = (dataNascimento: string) => {
    const nascimento = new Date(dataNascimento);
    nascimento.setFullYear(hoje.getFullYear());

    const diff = Math.abs(nascimento.getTime() - hoje.getTime()) / (1000 * 60 * 60 * 24);
    return diff <= 7;
  };

  return (
    <ul className="lista-clientes">
      {clientes.map((cliente) => {
        const vencendo = isVencendo(cliente.dataVencimento);
        const aniversario = isAniversarioSemana(cliente.dataNascimento);

        return (
          <li
            key={cliente.id}
            className={`cliente-item ${vencendo ? 'vencendo' : ''} ${aniversario ? 'aniversario' : ''}`}
          >
            <div className="cliente-dados">
              <strong>{cliente.nome}</strong><br />
              {cliente.email} – {cliente.telefone}
              {vencendo && (
                <span className="alerta">
                  ⚠️ Vencimento em breve ({cliente.dataVencimento})
                </span>
              )}
              {aniversario && (
                <span className="aniversario-alerta">
                  🎉 Semana de aniversário!
                </span>
              )}
            </div>
            <div className="cliente-botoes">
              <button onClick={() => onEditar(cliente)}>Editar</button>
              <button onClick={() => excluirCliente(cliente.id)}>Excluir</button>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

