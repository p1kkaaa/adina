import { Link, useNavigate } from 'react-router-dom';
import './header.css';
import logo from './../../img/logo.png';
import { useAuth } from '../../context/AuthContext';

function Header() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  return (
    <header className="header">
      <div className="container header__row">
        <Link to="/" className="header__logo">
          <img src={logo} alt="Logo" />
        </Link>

        <nav className="header__nav">
          <button onClick={() => navigate('/')}>Главная</button>
          <button onClick={() => navigate('/sche')}>Расписания</button>
          <button onClick={() => navigate('/reminders')}>Напоминания</button>
          <button onClick={() => navigate('/notes')}>Заметки</button>
          <button onClick={() => {/* navigate к странице «О нас» */}}>О нас</button>
        </nav>

        <div className="header__auth">
          {user ? (
            <button
              onClick={() => {
                logout();
                navigate('/loginregistr');
              }}
            >
              Выход
            </button>
          ) : (
            <button onClick={() => navigate('/loginregistr')}>
              Войти
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
