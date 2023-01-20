import {useState} from 'react'
import { Link , useNavigate } from 'react-router-dom';
import useGetAxios from '../../hooks/useGetAxios'
import { useDispatch , useSelector } from 'react-redux';
import { setNight , setToken , setListStore } from '../../Store/state';
import {motion} from 'framer-motion'
import swal from 'sweetalert'

export default function NavLinks({SelectedTab,SetTab,setverElemento,verElemento}) {
    
    const {data} = useGetAxios("http://localhost:4000/api/products")
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const localToken = localStorage.getItem('token')


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

    const variant = {
        hidden: { opacity: 0, x:600 },
        visible: ({delay}) => ({
          opacity: 1,
          scale: 1,
          x:0,
          transition: {
            delay,
            duration:1}
        })
      }

    const urls = [
        {name:"Admin",url:"/Admin-Profile"},
        {name:"Carrito",url:"ShoppingCart"},
        {name:"categoria"},
        {name:"Login",url:"/Login"}]
        const actionUrls = (name,url) => {
          if(name === "Login"){
            return localToken?
            <div
             onClick={() => setverElemento(!verElemento)} className='onLine'>
              <motion.img src={avatarId ? avatar : "https://t3.ftcdn.net/jpg/00/64/67/80/360_F_64678017_zUpiZFjj04cnLri7oADnyMH0XBYyQghG.jpg"}  alt="avatar user" 
                        initial={{opacity: 0, x:-100}}
                        animate={{opacity:1, x:0}}
                        transition={{duration: 0.3, delay: 0.5}}
                        className="onLine" />
              <motion.div initial={{scale:0 ,opacity: 0 , x:-50}}
                          animate={{scale:1, y: verElemento ? 10 : -50,x:verElemento ? -0 : -0,
                          opacity: verElemento ? 1 : 0,
                          pointerEvents: verElemento ? 'auto' : 'none',
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
            return <motion.div className='categories_conteiner' 
            >
            <Dropdown className="d-inline mx-2" >
              <Dropdown.Toggle  variant={night?"dark":"light"} autoclose="inside" className='icons-header' id="dropdown-autoclose-outside">
                Categorias
              </Dropdown.Toggle>
    
              <Dropdown.Menu style={{marginTop:"1rem"}} variant={night?"dark":"dark"}>
                <motion.ul className='drop_cateories'
                >
                <Dropdown.Item onClick={() => categoriAction(1,filterList) }>Bicicletas</Dropdown.Item>
                <Dropdown.Item onClick={() => categoriAction(4,filterList)}>Accesorios</Dropdown.Item>
                  <Dropdown.Item onClick={() => categoriAction(null,Promocions)}>Promociones</Dropdown.Item>
                </motion.ul>
              </Dropdown.Menu>
            </Dropdown>
            </motion.div> 
          }
          return /* <Link to={url}>{name}</Link> */
        }


  return (
         <motion.div className='container_btns'>
            {urls.map((url , idx) => {
              if(url.name != "Admin"){ 
              return (
                <motion.div
                key={idx}
                custom={{delay : (idx + 1 ) * 0.1}}
                initial="hidden"
                exit="hidden"
                animate="visible"
                variants={variant}
                onHoverStart={() =>  {SetTab(url.name)}}
                className="link_contain"  
                >
                    {actionUrls(url.name , url.url)}
                    {url.name != "Login" && url.name === {SelectedTab} ? (
                <motion.div className="underline" layoutId="underline"
                key={idx}
                initial={{opacity: 0, x:-50}}
                animate={{opacity:1, x:0}}
                exit={{opacity: 0}}
                transition={{duration: 0.2, delay: 0.1}}  
                 />
              ) : null}
                    </motion.div>
                )}
            })}
            </motion.div>
  )
}
