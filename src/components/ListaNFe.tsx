import { useContext } from 'react';
import { NFeContext } from '../context/NFeContext';
import { ClienteContext } from '../context/ClienteContext';
import './ListaNFe.css';

export function ListaNFe() {
  const { nfes } = useContext(NFeContext)!;
  const { clientes } = useContext(ClienteContext)!;

  const getClienteNome = (id: string) => {
    const cliente = clientes.find((c) => c.id === id);
    return cliente?.nome || 'Cliente não encontrado';
  };

  return (
    <div className="lista-nfe">
      {nfes.length === 0 ? (
        <p>Nenhuma nota fiscal cadastrada.</p>
      ) : (
        <ul>
          {nfes.map((nfe) => (
            <li key={nfe.id} className="nfe-item">
              <strong>Cliente:</strong> {getClienteNome(nfe.clienteId)}<br />
              <strong>CNPJ Emitente:</strong> {nfe.cnpjEmitente}<br />
              <strong>Forma de Pagamento:</strong> {nfe.formaPagamento}<br />
              <strong>Data de Emissão:</strong> {nfe.dataEmissao}<br />
              <strong>Valor Total:</strong> R${nfe.valorTotal.toFixed(2)}<br />
              <strong>Produtos:</strong>
              <ul className="produtos-lista">
                {nfe.produtos.map((p, index) => (
                  <li key={index}>
                    {p.nome} – {p.quantidade} x R${p.valorUnitario.toFixed(2)}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
