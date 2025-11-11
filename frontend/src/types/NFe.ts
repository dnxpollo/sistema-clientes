export interface Produto {
  nome: string;
  quantidade: number;
  valorUnitario: number;
}

export interface NFe {
  id: string;
  clienteId: string;
  cnpjEmitente: string;
  produtos: Produto[];
  valorTotal: number;
  formaPagamento: string;
  dataEmissao: string;
}

