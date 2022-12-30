import { Link } from "react-router-dom";
import style from './styles/header.module.css';
import icon from './styles/images/icon2.png';
const Header = () => {


    return (
        <header className={style.navigation}>
            <div className={style.logo}>
                <img src={icon} alt="logo" />   
                <Link to = '/'><p className={style.logo}>Ideal Diet</p></Link>

            </div>
            <nav>
                <Link to = '/home'>
                    <button>                
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    Lista Recetas
                    </button>
                </Link> 

                <Link to = '/home/create'>
                    <button>
                    <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        Sugiere Recetas
                    </button>
                </Link>
                {/* <Link to = '*'>Contacta Nutricionistas</Link> */}
                <Link to= '*'>
                    <button>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        Informacion
                    </button>
                </Link>
            </nav>
        </header>
    );
};
export default Header;