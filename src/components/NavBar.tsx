import { useEffect, useState } from 'react';
import './NavBar.css';
import logo from '../assets/logo.png';

export function NavBar() {
  const [ativo, setAtivo] = useState<string>('');
  const [menuAberto, setMenuAberto] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      const seções = ['cadastro-cliente', 'lista-clientes', 'form-nfe', 'lista-nfe'];
      for (const id of seções) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setAtivo(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <a href="#topo" className="logo-link">
          <img src={logo} alt="Logo da empresa" className="logo" />
        </a>
      </div>

      <div className={`nav-links ${menuAberto ? 'ativo' : ''}`}>
        <a href="#cadastro-cliente" className={ativo === 'cadastro-cliente' ? 'ativo' : ''}>Cadastro de Cliente</a>
        <a href="#lista-clientes" className={ativo === 'lista-clientes' ? 'ativo' : ''}>Lista de Clientes</a>
        <a href="#form-nfe" className={ativo === 'form-nfe' ? 'ativo' : ''}>Preencher NFe</a>
        <a href="#lista-nfe" className={ativo === 'lista-nfe' ? 'ativo' : ''}>Notas Fiscais</a>
      </div>

      <button className="menu-toggle" onClick={() => setMenuAberto(!menuAberto)}>
        ☰
      </button>
    </nav>
  );
}
