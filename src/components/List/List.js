import {Row , Col , Card , Button} from 'react-bootstrap'
import {useState , useEffect} from 'react'
import {ImHeart} from "react-icons/im";
import './List.css'
import axios from 'axios';
import { useSelector , useDispatch } from 'react-redux';
import { setListStore } from '../../Store/Products';
const imgsProducts = require.context('../../resource/img/products', true);

export default function List() {
  const dispatch = useDispatch();
  const listStore = useSelector(state => state.products)
   const [productsList , setProductsList] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:4000/api/products")
        .then(response => {
            const apiData = response.data;
            setProductsList(apiData.data)
            dispatch(setListStore(productsList))
            
            
        }).catch(err => alert(err))
    } ,[]) 
    console.log(productsList)
  return (
    <div>
        <Row xs={1} md={4} className="g-4">
      {productsList.length > 1 && productsList.map((prod,idx) => (
        
        <Col key={idx}>
         <Card className='body-card-product' >
            <ImHeart className='cart-card'/>
            <Card.Img className='img-cards-products' variant="top" src={imgsProducts(`./${prod.image}`)} alt={prod.title}/>
            <Card.Body>
                <Card.Title>{prod.name.substring(0 ,24)}..</Card.Title>
                <Card.Text>
                {prod.description.substring(0 ,40)}..
                </Card.Text>
                <Button className='btns-products' variant="primary">Ver</Button>
            </Card.Body>
            </Card>
        </Col>
      ))}
    </Row>
    </div>
  )
}
