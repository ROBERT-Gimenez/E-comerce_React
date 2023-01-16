import { useState , useEffect } from 'react';
import { Link , useNavigate } from 'react-router-dom';
import {motion} from 'framer-motion'
import {HiOutlineShoppingCart , HiUser} from "react-icons/hi2";
import {BiLogIn } from "react-icons/bi";
import { Dropdown } from 'react-bootstrap';
// resource 
import Logo from '../resource/img/logo-2.svg'
import useGetAxios from '../hooks/useGetAxios';
import swal from 'sweetalert'
import { useCookies } from 'react-cookie';
import useUserAvatar from '../hooks/useUserAvatar'

//redux

import { setNight , setToken , setListStore } from '../Store/state';
import { useDispatch , useSelector } from 'react-redux';
import Buscador from './Buscador';
const imgs = require.context('../resource/img' , true);

export default function Header() {
    const [mostrarElemento, setMostrarElemento] = useState(false)
    const [cookies, setCookie] = useCookies(['session']);
    const navigate  = useNavigate ();
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
    const variant = {
      hidden: { opacity: 0, x:600 },
      visible: ({delay}) => ({
        opacity: 1,
        scale: 1,
        x:0,
        transition: {
          delay,
          duration:1
        }
      })
    }

    const filterList = (categori) => {// eslint-disable-next-line 
      let products = data.filter(element => element.categoryid == categori) 
      return products
    }
    const Promocions = () => {
      let products = data.filter(element => element.discount > 0) 
      return products
    }
    const categoriAction = (n , action ) => {
      dispatch(setListStore(action(n)))
       return navigate("/")
      }
    
    const checkUser = () => {
       (localToken.length < 100) && (swal("Espere!", "Por favor inicie session Primero!", "warning")
      .then((value) => {
        navigate("/Login")
      }))
    }

    const urls = [{name:"Home",url:"/"},
    {name:"Admin",url:"/Admin-Profile"},
    {name:"Carrito",url:"ShoppingCart"},
    {name:"categoria"},
    {name:"Login",url:"/Login"}]
    const actionUrls = (name,url) => {
      if(name === "Login"){
        return localToken?
        <div
         onClick={() => setMostrarElemento(!mostrarElemento)} className='onLine'>
          <motion.img src={avatarId ? avatar : "https://t3.ftcdn.net/jpg/00/64/67/80/360_F_64678017_zUpiZFjj04cnLri7oADnyMH0XBYyQghG.jpg"}  alt="avatar user" 
                    initial={{opacity: 0, y:-100}}
                    animate={{opacity:1, y:0}}
                    transition={{duration: 0.3, delay: 0.5}}
                    className="onLine" />
          <motion.div initial={{scale:0 ,opacity: 0 , y:-50}}
                      animate={{scale:1, y: mostrarElemento ? -50 : -50,x:mostrarElemento ? -70 : -0,
                      opacity: mostrarElemento ? 1 : 0,
                      pointerEvents: mostrarElemento ? 'auto' : 'none',
                      }}
                      transition={{ duration: 0.2 }}
                      exit={{y:-300 , opacity: 0 , scale:0 }}
                      className='container_online'>
            <Link onClick={() =>  navigate("/ShoppingCart") } className='icons-header' to={`/Profile?userId=${cookies.session}`}>Profile<HiUser/></Link>
            <Link onClick={() => localStorage.removeItem('token')} className='icons-header' to="/Login">Logaut <BiLogIn/></Link>
          </motion.div>
          </div>:<Link className='icons-header' to="/Login">Login <HiUser/></Link> }
      if(name === "Carrito"){ return <Link onClick={() => checkUser()} className='icons-header' to="/ShoppingCart">Carrito <HiOutlineShoppingCart/></Link>}
      if(name === "Admin" && Admin){ return <Link className='icons-header' to="/ShoppingCart">Admin <HiOutlineShoppingCart/></Link>}
      if(name === "categoria"){
        return <motion.div className='categories_conteiner' >
        <Dropdown className="d-inline mx-2">
          <Dropdown.Toggle variant={night?"dark":"light"} autoclose="inside" className='icons-header' id="dropdown-autoclose-outside">
            Categorias
          </Dropdown.Toggle>

          <Dropdown.Menu variant={night?"dark":"dark"}>
            <motion.ul className='drop_cateories'>
            <Dropdown.Item><Link onClick={() => categoriAction(1,filterList) }>Bicicletas</Link></Dropdown.Item>
            <Dropdown.Item><Link onClick={() => categoriAction(4,filterList)}>Accesorios</Link></Dropdown.Item>
              <Dropdown.Item><Link onClick={() => categoriAction(null,Promocions)}>Promociones</Link></Dropdown.Item>
             {/*  <Dropdown.Item onClick={() => categoriAction(1,filterList) }>Bicicletas</Dropdown.Item>
              <Dropdown.Item onClick={() => categoriAction(4,filterList)}>Accesorios</Dropdown.Item>
              <Dropdown.Item onClick={() => categoriAction(null,Promocions)}>Promociones</Dropdown.Item> */}
            </motion.ul>
          </Dropdown.Menu>
        </Dropdown>
        </motion.div> 
      }
      return /* <Link to={url}>{name}</Link> */
    }

  return (
    <header className='container_header' style= {{backgroundColor:night?"#212529":"rgb(199 240 245)"}}
    onMouseLeave={(e) => {if (!e.target.classList.contains("onLine") && mostrarElemento ){setMostrarElemento(!mostrarElemento)} }}
    >
            <motion.img
              onClick={() => navigate("/")}
              initial={{opacity: 0, x:-100}} src={Logo} alt="logo"
              animate={{opacity:1, x:0}}
              transition={{duration: 0.3, delay: 0.5}}   
              width="120"  height="60"
              className="d-inline align-top Logo"
            />
          
            <Buscador/>
            {urls.map((url , idx) => { 
              return (
                <motion.div
                key={idx}
                custom={{delay : (idx + 1 ) * 0.3}}
                initial="hidden"
                exit="hidden"
                animate="visible"
                variants={variant}
                >
                    {actionUrls(url.name , url.url)}
                    </motion.div>
                )
            })}
                <motion.div
                    initial={{opacity: 0, y:-100}}
                    animate={{opacity:1, y:0}}
                    transition={{duration: 0.3, delay: 0.5}}
                    className="luna-container"
                    onClick={() => dispatch(setNight())}>
                <img className='luna' src={night ? imgs(`./luna.png`) : imgs(`./sol.png`)} alt="nightmode"/>
                </motion.div>

    </header>
  )
}
