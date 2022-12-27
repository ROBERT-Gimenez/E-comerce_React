import {useState , useEffect} from 'react'
import useGetAxios from '../../hooks/useGetAxios'
import Loader from '../Loader';
import "./DetailProduct.css"
import { BsFillStarFill } from "react-icons/bs";
import { Button } from 'react-bootstrap';
import Prueba from './CarrouselProduct';
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
            <h3 className={"text"}>Precio ${product.price}</h3>
            <div style={{display:"flex" , justifyContent:"space-evenly" , gap: "1rem"}}>
              <h5 style={{color:"beige"}}> Devolución gratis</h5>
              <span style={{color:"#f82e00"}}> Tenés 30 días desde que lo recibís.</span>
            </div>
            <h5>Stock disponible : {product.stock}</h5>


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
        <div className='Body_Medios_Pago'>
          <h3>Medios de pago</h3>
            <div className='medios_de_pago'>
            <div>
            <h5>Targetas De Credito</h5>
            <div className='targetas_conteiner'>
              <img src="https://http2.mlstatic.com/storage/logos-api-admin/a5f047d0-9be0-11ec-aad4-c3381f368aaf-m.svg" alt="visa" /> 
              <img src="https://http2.mlstatic.com/storage/logos-api-admin/b2c93a40-f3be-11eb-9984-b7076edb0bb7-m.svg" alt="express" /> 
              <img src="https://http2.mlstatic.com/storage/logos-api-admin/992bc350-f3be-11eb-826e-6db365b9e0dd-m.svg" alt="Targeta Naranja" /> 
              <img src="https://http2.mlstatic.com/storage/logos-api-admin/aa2b8f70-5c85-11ec-ae75-df2bef173be2-m.svg" alt="MasterCard" />
            </div>
            </div>
            <div>
            <h5>Tarjetas de Débito</h5>
            <div className='targetas_conteiner'>
              <img src="https://http2.mlstatic.com/storage/logos-api-admin/312238e0-571b-11e8-823a-758d95db88db-m.svg" alt="Visa" />
              <img src="https://http2.mlstatic.com/storage/logos-api-admin/ce454480-445f-11eb-bf78-3b1ee7bf744c-m.svg" alt="maestro" />
              <img src="https://http2.mlstatic.com/storage/logos-api-admin/157dce60-571b-11e8-95d8-631c1a9a92a9-m.svg" alt="mastercard" />
              <img src="https://http2.mlstatic.com/storage/logos-api-admin/cb0af1c0-f3be-11eb-8e0d-6f4af49bf82e-m.svg" alt="Cabal" />
            </div>
            </div>
            <div>
            <h5>Efectivo</h5>
            <div className='targetas_conteiner'>
              <img src="https://http2.mlstatic.com/storage/logos-api-admin/fec5f230-06ee-11ea-8e1e-273366cc763d-m.svg" alt="pagofacil" />
            </div>
            </div>
          
           
            </div>
          </div>
        <Prueba/>
    </div>
  )
}
