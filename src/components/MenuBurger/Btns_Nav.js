import * as React from "react";
import { motion } from "framer-motion";
import { MenuItem } from "./MenuItem";
import { useCookies } from 'react-cookie';
import {HiOutlineShoppingCart , HiUser} from "react-icons/hi2";
import { Link , useNavigate } from 'react-router-dom';    
import {BiLogIn } from "react-icons/bi";
import {TbReportSearch } from "react-icons/tb";
import Buscador from "../header/Buscador";


const variants = {
    open: {
        transition: { staggerChildren: 0.07, delayChildren: 0.2 }
    },
    closed: {
        transition: { staggerChildren: 0.05, staggerDirection: -1 }
    }
};


export const Btns_Nav = ({toggle}) => {


    const navigate = useNavigate();
    const localToken = localStorage.getItem('token')
    const [cookies, setCookie] = useCookies(['session']);

    const itemIds = [{name:"Perfil" , url:`/Profile?userId=${cookies.session}` },
                        {name:"Carrito" , url:"ShoppingCart" },
                        {name:"Categoria" , url:"Categoria" },
                        {name:"logaut" , url:"/Login"}];

    function getIcon(name) {
        if (name === 'Perfil') {
        return <HiUser />;
        } else if (name === 'Carrito') {
        return <HiOutlineShoppingCart />;
        } else if(name === 'Categoria') {
        return <TbReportSearch/> ;
        }else{
            return <BiLogIn/>
        }
        }
    function getButton(url) {
        if (url === itemIds[0].url) {
        return localToken ? <Link onClick={toggle} className='icons-header' to={`/Profile?userId=${cookies.session}`}>Profile</Link>:
        <Link onClick={toggle} className='icons-header' to="/Login">Login <HiUser/></Link> ;
        } else if (url === itemIds[1].url) {
        return <Link onClick={toggle} className='icons-header' to="/ShoppingCart">Carrito</Link>;
        } else if (url === itemIds[2].name) {
        return <Link className='icons-header' >Categorias</Link>;
        } else if (url === itemIds[3].url && localToken) {
        return  <Link onClick={() => localStorage.removeItem('token')} className='icons-header' to="/Login">Logaut </Link>;
        }
        }


    return (
    <motion.ul variants={variants}>
        <Buscador clas={"search_burger_menu"}/>
    {itemIds.map((i , index) => {
         if (i.name === "logaut" && !localToken ) {
          return null
}else{
    return (  <MenuItem i={index} key={index} icon={getIcon(i.name)} context={getButton(i.url)}  />
)}
})}
  </motion.ul>
)
};