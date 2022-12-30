import style from './styles/landingPage.module.css';
import icon from './styles/images/icon2.png';
import insta from './styles/images/insta.png';
import mail from './styles/images/mail.png';
import linkedin from './styles/images/linkedin.png';
import phone from './styles/images/phone.png';
import { Link } from 'react-router-dom';

const LandingPage = () => {

return (
    <div className={style.fondo}>
      <div className={style.fondo2}>
        <header className={style.navigation}>
          <div className={style.logo}>
            <img src={icon}alt="aqui"  />
            <Link to = '/'><p>Ideal Diet</p></Link>
          </div>
          <div>
            <Link to = '/home'>
              <button>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                Home
              </button></Link>
            <button>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              Iniciar Sesion
            </button>
            <button>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              Inscribirse
            </button>
            <input type="text" />
          </div>
        </header> 

        <section >
          <div className={style.body}>
            <h3>No tenes un nutricionista ?</h3>
            <h4>Ecuentra tu dieta ideal con un solo CLick</h4>
            <Link to ='/home'><button> Comienza tu experiencia ahora!! </button></Link>
          </div>
        </section>

        <footer>
          <div className={style.caja}>
            <p>Instagram</p>
            <a href={`https://instagram.com/sebaajaime?igshid=NDk5N2NlZjQ=`} target='_blank'><img src={insta} alt="instagram" /></a>
          </div>
          <div className={style.caja}>
            <p>Linkedin</p>
            <a href="https://www.linkedin.com/in/aramis-jaime-b2807a24b" target='_blank'><img src={linkedin} alt="" /> </a>
          </div>
          <div className={style.caja}>
            <p>Telefono</p>
            <img src={phone} alt="" />
          </div>
          <div className={style.caja}>
            <p>Correo</p>
            <img src={mail} alt="" />
          </div>

        </footer>
      </div>
  </div>
);

};
export default LandingPage;

