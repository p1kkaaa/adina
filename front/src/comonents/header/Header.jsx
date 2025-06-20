import './header.css'
import logo from './../../img/logo.png'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Header() {
     const navigate = useNavigate();

    const handleClick = () => {
        navigate('/loginregistr');
      };
    
    const handleClick2 = () => {
        navigate('/notes');
    }

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };
    return (
        <div className="header">
            <div className="container">
                <div className="header__row">
                    <div className="header__logo">
                        <Link to="/">
                        <img src={logo} alt="" />
                        {/* <span>ToDoist</span> */}
                        </Link>
                    </div>

                    <div className="header__search">
                        <input
                            type="text"
                            placeholder="Поиск..."
                            className="header__search-input"
                        />
                        <button type="submit" className="header__search-btn">🔍</button>
                    </div>

                    <div className="header__nav">
                        <ul>

                            <li><button>Главная</button></li>
                            <li><button>Расписания</button></li>
                            <li><button onClick={handleClick2}>Заметки</button></li>
                            <li><button>О нас</button></li>


                            <div className="header__auth">
                                <button onClick={handleClick} className="header__login-btn">Войти</button>
                            </div>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header