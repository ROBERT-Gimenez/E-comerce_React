import { useState  } from 'react';
import {motion} from 'framer-motion'
// resource 
import Logo from '../../resource/img/logo-2.svg'
import useGetAxios from '../../hooks/useGetAxios';
//redux
import { setNight } from '../../Store/state';
import { useDispatch , useSelector } from 'react-redux';
import Buscador from './Buscador';
import { MenuBurger } from '../MenuBurger/MenuBurger';
import NavLinks from './NavLinks';
import AvatarUser from './AvatarUser';
const imgs = require.context('../../resource/img' , true);

export default function Header() {
    const [selectedTab, setSelectedTab] = useState(null);
    const [mostrarElemento, setMostrarElemento] = useState(false)
   
    

    //manejo del store
    const dispatch = useDispatch();
    const night = useSelector(state => state.night);
    const {data} = useGetAxios("http://localhost:4000/api/products")
    /* const ListStore = useSelector(state => state.Products); */

    const cerrar = () => {
      setSelectedTab(null)
      if (mostrarElemento){setMostrarElemento(!mostrarElemento)}
    }

    
  return (
    <header className='container_header' style= {{backgroundColor:night?"#212529":"rgb(199 240 245)"}}
    onMouseLeave={() => cerrar()}
    /* onHoverStart={() => {if (mostrarElemento){setMostrarElemento(!mostrarElemento)} }} */

    >
            <motion.img
              onClick={() => /* navigate("/") */  window.location.href ="/"}
              initial={{opacity: 0, x:-100}} src={Logo} alt="logo"
              animate={{opacity:1, x:0}}
              transition={{duration: 0.3, delay: 0.5}}   
              width="120"  height="60"
              className="d-inline align-top Logo"
            />
          
            <Buscador accion={() => console.log("search")} clas={"search-box"}/>
            <NavLinks
             SelectedTab={selectedTab}
             SetTab={setSelectedTab}
             date={data}
             clas={"container_btns"}
             accion={() => null}
             />
             <AvatarUser 
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
                <MenuBurger/>   

    </header>
  )
}
