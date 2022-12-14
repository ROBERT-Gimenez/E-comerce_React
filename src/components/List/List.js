import {Row , Col , Card , Button} from 'react-bootstrap'
import {useState , useEffect} from 'react'
import {ImHeart} from "react-icons/im";
import './List.css'
import { Link , Navigate} from 'react-router-dom';
import Loader from '../Loader';
import { useSelector , useDispatch } from 'react-redux';
import { setListStore } from '../../Store/state';
import useGetAxios from '../../hooks/useGetAxios';
const imgsProducts = require.context('../../resource/img/products', true);

export default function List() {
  const dispatch = useDispatch();
  const listStore = useSelector(state => state.Products)
  const [productsList , setProductsList] = useState([]);
  
  const {data , loading} = useGetAxios("http://localhost:4000/api/products")
  useEffect(() => {
       !loading && setProductsList(data)
      } ,[loading])   
    
  const inDetail= (id) => {
    return <Navigate to={`/detalle?movieId=${id}`}/>
  }
         
  return (
    <div>
        <Row xs="auto" md="auto" lg="auto" className="container-col-card">
      {loading && <Loader/>}
      { !loading  && productsList.map((prod,idx) => (
        
        <Col key={idx}>
         <Card className='body-card-product' >
            <ImHeart className='cart-card'/>
            <Card.Img className='img-cards-products' variant="top" src={imgsProducts(`./${prod.image}`)} alt={prod.title} onClick={() => inDetail(prod.id)} />
            <Card.Body>
                <Card.Title>{prod.name.substring(0 ,24)}..</Card.Title>
                <Card.Text>
                {prod.description.substring(0 ,40)}..
                </Card.Text>
              <Link to={`/detalle?productId=${prod.id}`} className="btn btn-primary">View Detail</Link>
            </Card.Body>
            </Card>
        </Col>
      ))}
    </Row>
    </div>
  )
}
