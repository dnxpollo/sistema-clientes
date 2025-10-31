import { useEffect, useState } from 'react';
import './NavBar.css';

export function NavBar() {
  const [ativo, setAtivo] = useState('');

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
    handleScroll(); // inicial
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className="navbar">
      <a href="#cadastro-cliente" className={ativo === 'cadastro-cliente' ? 'ativo' : ''}>Cadastro de Cliente</a>
      <a href="#lista-clientes" className={ativo === 'lista-clientes' ? 'ativo' : ''}>Lista de Clientes</a>
      <a href="#form-nfe" className={ativo === 'form-nfe' ? 'ativo' : ''}>Preencher NFe</a>
      <a href="#lista-nfe" className={ativo === 'lista-nfe' ? 'ativo' : ''}>Notas Fiscais</a>
    </nav>
  );
}
