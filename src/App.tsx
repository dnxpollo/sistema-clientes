import { ClienteProvider } from './context/ClienteProvider';
import { FormularioCliente } from './components/FormularioCliente';
import { ListaClientes } from './components/ListaClientes';


function App() {
  return (
    <ClienteProvider>
      <h1>Sistema de Clientes</h1>
      <FormularioCliente />
      <ListaClientes />
    </ClienteProvider>
  );
}

export default App;
