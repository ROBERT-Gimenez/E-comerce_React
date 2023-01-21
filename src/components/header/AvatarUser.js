import React from 'react'
import useUserAvatar from '../../hooks/useUserAvatar';
import { Link , useNavigate } from 'react-router-dom';
import {motion} from 'framer-motion'
import { useCookies } from 'react-cookie';
import {HiUser} from "react-icons/hi2";
import {BiLogIn } from "react-icons/bi";

export default function AvatarUser({verElemento , setverElemento }) {

     // eslint-disable-next-line
    const [cookies, setCookie] = useCookies(['session']);

    const navigate = useNavigate();
    const localToken = localStorage.getItem('token')
    const avatarId = localStorage.getItem('avatarId')
    const avatar = useUserAvatar(avatarId);

   
  return (
    <>
        {localToken?
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
    </>
  )
}
