import {useState , useEffect} from 'react'
import useGetAxios from '../../hooks/useGetAxios'
import Loader from '../Loader';
const imgsProducts = require.context('../../resource/img/products', true);
export default function DetailProduct() {
  const [product , setproduct] = useState([])
  let query = new URLSearchParams(window.location.search);
  let keyword = query.get('productId');
  const {data , loading} = useGetAxios(`http://localhost:4000/api/products/${keyword}`);
  useEffect(() => {
    setproduct(data)
    console.log(data)
    console.log(product)
  },[loading])

  return (
    <div>
      {loading ? <Loader/> : (
      <div className='rectangule'>
        <div className='img-content'>
        <img src={imgsProducts(`./${product.image}`)} />
        </div>
        <div className='detail-content'>
          <h1>{product.name}</h1>
          <div className='rating-stars'></div>
          <p className='Description'>{product.description}</p>
          <button>comprar</button>
          <button>agregar al carro</button>

        </div>

      </div>)}
    </div>
  )
}
