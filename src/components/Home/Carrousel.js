import React from 'react'
import {Carousel} from 'react-bootstrap'
import banner1 from '../../resource/img/carrousel/Banner-1.png'
import banner2 from '../../resource/img/carrousel/Banner-2.png'
import banner3 from '../../resource/img/carrousel/Banner-3.png'
export default function Carrousel() {

  let imgs = [banner1,banner2,banner3]
  return (
    <div>
    <Carousel variant="dark" className='corrousel'>
      {imgs.map((img , indx) => {
        return(
          <Carousel.Item interval={1000} key={indx}>
        <img
          className="d-block w-100  carrousel"
          src={img}
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>Ofertas</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
        )
      })}
    </Carousel>
    </div>
  )
}
