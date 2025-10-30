import { useState } from 'react';
import { ClienteProvider } from './context/ClienteProvider';
import { NFeProvider } from './context/NFeContext';
import { FormularioCliente } from './components/FormularioCliente';
import { ListaClientes } from './components/ListaClientes';
import { FormularioNFe } from './components/FormularioNFe';
import { ListaNFe } from './components/ListaNFe';
import type { Cliente } from './types/Cliente';
import './App.css';

function App() {
  const [clienteEditando, setClienteEditando] = useState<Cliente | null>(null);

  return (
    <ClienteProvider>
      <NFeProvider>
        <main className="app-container">
          <h1>Sistema de Clientes</h1>

          <section className="cliente-section">
            <FormularioCliente
              clienteEditando={clienteEditando}
              setClienteEditando={setClienteEditando}
            />
            <ListaClientes onEditar={setClienteEditando} />
          </section>

          <section className="nfe-section">
            <h2>Preenchimento de NFe</h2>
            <FormularioNFe onSalvar={(nfe) => console.log('NFe salva:', nfe)} />
            <ListaNFe />
          </section>
        </main>
      </NFeProvider>
    </ClienteProvider>
  );
}

export default App;
