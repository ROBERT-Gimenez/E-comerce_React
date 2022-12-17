import {useState , useEffect} from 'react'
import useGetAxios from '../../hooks/useGetAxios'
import Loader from '../Loader';
import "./DetailProduct.css"
import { BsFillStarFill } from "react-icons/bs";
import { Button } from 'react-bootstrap';
const imgsProducts = require.context('../../resource/img/products', true);


export default function DetailProduct() {

  let query = new URLSearchParams(window.location.search);
  let keyword = query.get('productId');
  const [product , setproduct] = useState([]);
  const [Stars , setStars] = useState(0);
  const {data , loading} = useGetAxios(`http://localhost:4000/api/products/${keyword}`);
  
  useEffect(() => {
    data !== null && setproduct(data)
    console.log(data)
   },[data])

   const stars = [1,2,3,4,5] ;

   const selected = (e) => {
     const n = e.target
     const l = n.parentElement.getAttribute('name')

     if(l == Stars){
       setStars(0)
      }
      setStars(l)
   }

  return (
    <div className='body_detail'>
      {loading && <Loader/>}
        {product.id !== undefined && (
         <div className="rectangule">
          
          <div className="img_content" >
           <img className={"img"} alt={product.name} src={imgsProducts(`./${product.image}`)} />
          </div>

          <div className='detail-content'>
            <h1 className={"text"}>{product.name}</h1>
            <div className='stars_content'>{stars.map((s , indx)=> { 
              if(Stars < s){
              return (<BsFillStarFill key={indx} name={s} className='star-noselect' onClick={selected}/>)
              }
              return <BsFillStarFill key={indx} name={s} className='star_select' onClick={selected}/>
            })}
            </div>
            <div className='rating-stars'></div>
            <p className={"text"}>{product.description}</p>

              <div className="d-grid gap-2">
              <Button variant="primary" size="lg">
                Comprar 
              </Button>
              <Button variant="secondary" size="lg">
              Agregar al Carrito
              </Button>
              </div>
  
          </div>
  
        </div>) 
        }
    </div>
  )
}