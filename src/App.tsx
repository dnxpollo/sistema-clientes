import { useState } from 'react';
import { ClienteProvider } from './context/ClienteProvider';
import { FormularioCliente } from './components/FormularioCliente';
import { ListaClientes } from './components/ListaClientes';
import type { Cliente } from './types/Cliente';

function App() {
  const [clienteEditando, setClienteEditando] = useState<Cliente | null>(null);

  return (
    <ClienteProvider>
      <h1>Sistema de Clientes</h1>
      <FormularioCliente
        clienteEditando={clienteEditando}
        setClienteEditando={setClienteEditando}
      />
      <ListaClientes onEditar={setClienteEditando} />
    </ClienteProvider>
  );
}

export default App;
