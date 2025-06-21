import { Link, useNavigate } from 'react-router-dom';
import './header.css';
import logo from './../../img/logo.png';
import { useAuth } from '../../context/AuthContext';

function Header() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  return (
    <div className="header">
      <div className="container header__row">
        <Link to="/" className="header__logo">
          <img src={logo} alt="Logo" />
        </Link>

        <div className="header__nav">
          <ul><button onClick={() => navigate('/')}>Главная</button></ul>
          <ul><button onClick={() => navigate('/sche')}>Расписания</button></ul>
          <ul><button onClick={() => navigate('/notes')}>Заметки</button></ul>
          <ul><button>О нас</button></ul>
        </div>

        <div className="header__auth">
          {user ? (
            <button onClick={() => { logout(); navigate('/loginregistr'); }}>
              Выход
            </button>
          ) : (
            <button onClick={() => navigate('/loginregistr')}>
              Войти
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;