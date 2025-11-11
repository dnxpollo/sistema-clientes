import { useState } from 'react';
import { ClienteProvider } from './context/ClienteProvider';
import { NFeProvider } from './context/NFeContext';
import { FormularioCliente } from './components/FormularioCliente';
import { ListaClientes } from './components/ListaClientes';
import { FormularioNFe } from './components/FormularioNFe';
import { ListaNFe } from './components/ListaNFe';
import { NavBar } from './components/NavBar';
import type { Cliente } from './types/Cliente';
import './App.css';
import './components/theme.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Footer } from './components/Footer';

function App() {
  const [clienteEditando, setClienteEditando] = useState<Cliente | null>(null);

  return (
    <ClienteProvider>
      <NFeProvider>
        <main className="app-container">
          <NavBar />
          <h1>Sistema de Clientes</h1>

          <section id="cadastro-cliente" className="cliente-section">
            <h2>Cadastro de Cliente</h2>
            <FormularioCliente
              clienteEditando={clienteEditando}
              setClienteEditando={setClienteEditando}
            />
            <ToastContainer />
          </section>

          <section id="lista-clientes" className="cliente-section">
            <h2>Lista de Clientes</h2>
            <ListaClientes onEditar={setClienteEditando} />
          </section>

          <section id="form-nfe" className="nfe-section">
            <h2>Preenchimento de NFe</h2>
            <FormularioNFe onSalvar={(nfe) => console.log('NFe salva:', nfe)} />
          </section>

          <section id="lista-nfe" className="nfe-section">
            <h2>Notas Fiscais Emitidas</h2>
            <ListaNFe />
          </section>
        </main>
      </NFeProvider>
      <Footer/>
    </ClienteProvider>
  );
}

export default App;
