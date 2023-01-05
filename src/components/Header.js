import {NavDropdown , Form , Button ,Navbar ,Nav, Container } from 'react-bootstrap';
import { Link , useNavigate } from 'react-router-dom';
import {motion} from 'framer-motion'
import {HiOutlineShoppingCart , HiUser} from "react-icons/hi2";
// resource 
import Logo from '../resource/img/logo-2.svg'
import useGetAxios from '../hooks/useGetAxios';
import swal from 'sweetalert'
import { useCookies } from 'react-cookie';

//redux
import { setNight , setToken , setListStore } from '../Store/state';
import { useDispatch , useSelector } from 'react-redux';
const imgs = require.context('../resource/img' , true);

export default function Header() {

    const [cookies, setCookie] = useCookies(['session']);
    const navigate  = useNavigate ();
    const {data} = useGetAxios("http://localhost:4000/api/products")
    //manejo del store
    const dispatch = useDispatch();
    const Token = useSelector(state => state.Token);
    const night = useSelector(state => state.night);
    const Admin = useSelector(state => state.Admin);
    const localToken = localStorage.getItem('token')
    /* const ListStore = useSelector(state => state.Products); */
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
      if(name === "Login"){return localToken?<Link onClick={() => localStorage.removeItem('token')} className='icons-header' to="/Login">Logaut {cookies.session}<HiUser/></Link>:<Link className='icons-header' to="/Login">Login <HiUser/></Link> }
      if(name === "Carrito"){ return <Link onClick={() => checkUser()} className='icons-header' to="/ShoppingCart">Carrito <HiOutlineShoppingCart/></Link>}
      if(name === "Admin" && Admin){ return <Link className='icons-header' to="/ShoppingCart">Admin <HiOutlineShoppingCart/></Link>}
      if(name === "categoria"){
        return <motion.div>
        <Link className='icons-header'>Categorias</Link>
        <motion.ul className='drop_cateories'>Categorias
        <motion.li  onClick={() => categoriAction(1,filterList) }>Bicicletas</motion.li>
        <motion.li  onClick={() => categoriAction(4,filterList)}>Accesorios</motion.li>
        <motion.li onClick={() => categoriAction(null,Promocions)}>Promociones</motion.li>
        </motion.ul>
        </motion.div> 
      }
      return /* <Link to={url}>{name}</Link> */
    }

  return (
    <header className='container_header' style= {{backgroundColor:night?"#212529":"rgb(180 246 255)"}}>
            <motion.img
              initial={{opacity: 0, x:-100}} src={Logo} alt="logo"
              animate={{opacity:1, x:0}}
              transition={{duration: 0.3, delay: 0.5}}   
              width="120"  height="60"
              className="d-inline align-top Logo"
            />{' '}
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
