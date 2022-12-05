import {Row , Col , Card , Button} from 'react-bootstrap'
import img from '../../resource/img/carrousel/banner-4.png'
import React from 'react'
import {ImHeart} from "react-icons/im";
import './List.css'


export default function List() {
  return (
    <div>
        <Row xs={1} md={4} className="g-4">
      {Array.from({ length: 8 }).map((_, idx) => (
        <Col key={idx}>
         <Card style={{ width: '18rem' }} >
            <ImHeart className='cart-card'/>
            <Card.Img variant="top" src={img} />
            <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <Card.Text>
                Some quick example text to build on the card title and make up the
                bulk of the card's content.
                </Card.Text>
                <Button variant="primary">Go somewhere</Button>
            </Card.Body>
            </Card>
        </Col>
      ))}
    </Row>
    </div>
  )
}
