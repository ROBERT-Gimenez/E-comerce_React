import { Link , useNavigate } from 'react-router-dom';
import {motion} from 'framer-motion'
import useGetAxios from '../../hooks/useGetAxios'
import { useDispatch , useSelector } from 'react-redux';
import { setListStore } from '../../Store/state';
import swal from 'sweetalert'
import {HiOutlineShoppingCart} from "react-icons/hi2";
import { Dropdown } from 'react-bootstrap';



export default function NavLinks({SelectedTab,SetTab, clas}) {

    const dispatch = useDispatch();

    const navigate = useNavigate();
    const localToken = localStorage.getItem('token')
    const Admin = useSelector(state => state.Admin);
    const night = useSelector(state => state.night);
    const {data} = useGetAxios("http://localhost:4000/api/products")


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
        {name:"categoria" , url:"/"},]
        const actionUrls = (name) => {
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
          return null
        }


  return (
      <motion.div className={clas}>
            
            {urls.map((url , index) => {
              if(url.name !== "Admin"){ 
              return (
                <motion.div
                key={index}
                custom={{delay : (index + 1 ) * 0.1}}
                initial="hidden"
                exit="hidden"
                animate="visible"
                variants={variant}
                onHoverStart={() =>  {SetTab(url.name)}}
                className="link_contain"  
                >
                    {actionUrls(url.name)}
                    { url.name === SelectedTab ? (
                <motion.div className="underline" layoutId="underline"
                key={index}
                initial={{opacity: 0, x:-50}}
                animate={{opacity:1, x:0}}
                exit={{opacity: 0}}
                transition={{duration: 0.2, delay: 0.1}}  
                 />
              ) : null}
                    </motion.div>
                )}
                return null
            })}  
            </motion.div>
  )
}
