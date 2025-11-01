import logo from '../assets/logo.png';
import './Header.css';

export function Header() {
  return (
    <header className="header">
      <a href="#topo" className="logo-link">
        <img src={logo} alt="Logo da empresa" className="logo" />
      </a>
    </header>
  );
}
