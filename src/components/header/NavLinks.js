import { Link , useNavigate } from 'react-router-dom';
import {motion} from 'framer-motion'
import useGetAxios from '../../hooks/useGetAxios'
import { useDispatch , useSelector } from 'react-redux';
import { setListStore } from '../../Store/state';
import swal from 'sweetalert'
import {HiOutlineShoppingCart} from "react-icons/hi2";
import { useState } from 'react';
import BtnDropDrawn from '../MenuBurger/BtnDropDrawn';



export default function NavLinks({SelectedTab,SetTab, clas}) {

    const [isOpen, setIsOpen] = useState(false)

    const navigate = useNavigate();

    const localToken = localStorage.getItem('token')
    const Admin = useSelector(state => state.Admin);
    const night = useSelector(state => state.night);

      
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
            return <BtnDropDrawn action={() => console.log()} clas={'list_categori'}/> }
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
