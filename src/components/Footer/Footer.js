import {Link} from 'react-router-dom'
import {Navbar} from 'react-bootstrap'
import {ImWhatsapp} from "react-icons/im";
import Logo from '../../resource/img/logo-2.svg'
import { useSelector } from 'react-redux';
import './FooterStiles.css'
export default function Footer() {

  const night = useSelector(state => state.night);


  return (
    <div className={night?'footer-general':'footer_night'}>
        <div className='circle'><a href='/' className='whattsapp-icon'><ImWhatsapp/></a></div>
        <Navbar  variant="dark" className='bg_footer'>
          <>
          <Navbar.Brand href="#home">
            <img
              alt="Logo"
              src={Logo}
              width="60"
              height="90"
              className="d-inline-block align-top"
            />{' '}
          <p> copyright Bike's Master </p>
          </Navbar.Brand>
        </>
        </Navbar>
        <div className={'footer_Links'}>
        <a href="https://www.buenosaires.gob.ar/defensaconsumidor">Defensa al Consumidor</a>
        <Link to="/">Contacto</Link>
        <Link to="/">Consulta</Link>
        <Link to="/">Redes sociales</Link>
        </div>
    </div>
  )
}
