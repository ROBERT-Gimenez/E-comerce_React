import {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import {motion} from 'framer-motion';
import useGetAxios from '../../hooks/useGetAxios'
import { useDispatch , useSelector } from 'react-redux';
import { setListStore } from '../../Store/state';
import {BiCaretDown} from "react-icons/bi";
export default function BtnDropDrawn({clas , action}) {

    const [isOpen, setIsOpen] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {data} = useGetAxios("http://localhost:4000/api/products");

    const night = useSelector(state => state.night);


    const filterList = (categori) => {// eslint-disable-next-line 
        action()
        let products = data.filter(element => element.categoryid == categori) 
        return products
      }
      const Promocions = () => {
        action()
        let products = data.filter(element => element.discount > 0) 
        return products
      }
      const categoriAction = (n , action ) => {
        dispatch(setListStore(action(n)))
         return navigate("/")
        }

  return (
           <motion.div className='categories_conteiner'  
           
            >
            <motion.a 
            className='icons-header'
            onClick={() => setIsOpen(!isOpen)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }} 
           
            >
            Categorias<BiCaretDown/>
            </motion.a>
            {isOpen && (
                <motion.div
        
                className={'container_ul_categori'}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onHoverEnd={() => setIsOpen(false)} 
                >
                <ul className={clas}  
                 >
                    <li onClick={() => categoriAction(1,filterList) }>Bicicletas</li>
                    <li onClick={() => categoriAction(4,filterList)}>Accesorios</li>
                    <li onClick={() => categoriAction(null,Promocions)}>Promociones</li>
                </ul>
                </motion.div>
      )}
            </motion.div> 
  )
}
