import {Row , Col , Card , Button} from 'react-bootstrap'
import {useState , useEffect} from 'react'
import {ImHeart} from "react-icons/im";
import './List.css'
import axios from 'axios';
const imgs = require.context('../../resource/img/products', true);

export default function List() {


    const [productsList , setProductsList] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:4000/api/products")
        .then(response => {
            const apiData = response.data;
            console.log(apiData.data)
            setProductsList(apiData.data)
        }).catch(err => alert(err))
    } ,[])
/* Array.from({ length: 8 }) */
  return (
    <div>
        <Row xs={1} md={4} className="g-4">
      {productsList.map((prod,idx) => (
        <Col key={idx}>
         <Card style={{ width: '18rem' }} >
            <ImHeart className='cart-card'/>
            <Card.Img variant="top" src={imgs(`${prod.image}`)} />
            <Card.Body>
                <Card.Title>{prod.title}</Card.Title>
                <Card.Text>
                {prod.description}
                </Card.Text>
                <Button variant="primary">Ver</Button>
            </Card.Body>
            </Card>
        </Col>
      ))}
    </Row>
    </div>
  )
}
