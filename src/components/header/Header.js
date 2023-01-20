import { useState , useEffect } from 'react';
import { Link , useNavigate } from 'react-router-dom';
import {motion} from 'framer-motion'
import {HiOutlineShoppingCart , HiUser} from "react-icons/hi2";
import {BiLogIn } from "react-icons/bi";
import { Dropdown } from 'react-bootstrap';
// resource 
import Logo from '../resource/img/logo-2.svg'
import useGetAxios from '../../hooks/useGetAxios';
import swal from 'sweetalert'
import { useCookies } from 'react-cookie';
import useUserAvatar from '../../hooks/useUserAvatar'
import { MenuToggle } from '../MenuBurger/MenuToggle';
//redux

import { setNight , setToken , setListStore } from '../../Store/state';
import { useDispatch , useSelector } from 'react-redux';
import Buscador from '../Buscador';
import { Example } from '../MenuBurger/Example';
import NavLinks from './NavLinks';
const imgs = require.context('../resource/img' , true);

export default function Header() {
    const [selectedTab, setSelectedTab] = useState(null);
    const [mostrarElemento, setMostrarElemento] = useState(false)
    const [cookies, setCookie] = useCookies(['session']);
    const navigate = useNavigate();
    //manejo del store
    const dispatch = useDispatch();
    const Token = useSelector(state => state.Token);
    const night = useSelector(state => state.night);
    const Admin = useSelector(state => state.Admin);
    const localToken = localStorage.getItem('token')
    const avatarId = localStorage.getItem('avatarId')
    const verifyAvatar = localStorage.getItem('avatar')
    const {data} = useGetAxios("http://localhost:4000/api/products")
    const avatar = useUserAvatar(avatarId);
    /* const ListStore = useSelector(state => state.Products); */

    useEffect(() => {
      console.log(avatarId)
    }, [avatar]);

   

    
    const cerrar = () => {
      setSelectedTab(null)
      if (mostrarElemento){setMostrarElemento(!mostrarElemento)}
    }

    

  return (
    <header className='container_header' style= {{backgroundColor:night?"#212529":"rgb(199 240 245)"}}
    onMouseLeave={() =>cerrar()}
    /* onHoverStart={() => {if (mostrarElemento){setMostrarElemento(!mostrarElemento)} }} */

    >
            <motion.img
              onClick={() => /* navigate("/") */ window.location.reload()}
              initial={{opacity: 0, x:-100}} src={Logo} alt="logo"
              animate={{opacity:1, x:0}}
              transition={{duration: 0.3, delay: 0.5}}   
              width="120"  height="60"
              className="d-inline align-top Logo"
            />
          
            <Buscador/>
            <NavLinks
             SelectedTab={selectedTab}
             SetTab={setSelectedTab}
             setverElemento={setMostrarElemento}
             verElemento={mostrarElemento}

             />
                <motion.div
                    initial={{opacity: 0, y:-100}}
                    animate={{opacity:1, y:0}}
                    transition={{duration: 0.3, delay: 0.5}}
                    className="luna-container"
                    onClick={() => dispatch(setNight())}>
                <img className='luna' src={night ? imgs(`./luna.png`) : imgs(`./sol.png`)} alt="nightmode"/>
                </motion.div>
                <Example/>   

    </header>
  )
}
