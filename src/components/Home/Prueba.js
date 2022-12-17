import {useState ,useEffect} from 'react'
import { Virtual } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import useGetAxios from '../../hooks/useGetAxios';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/virtual';

const imgsProducts = require.context('../../resource/img/products', true);
export default function Prueba() {
    const [Products , setProducts] = useState([])
    const {data , loading} = useGetAxios('http://localhost:4000/api/products')

    console.log(Products.data)
    useEffect(() => {
       data && setProducts(data)
       console.log(data)
    }, [loading]);
    // Create array with 1000 slides ${el.name} ${index + 1}`
    // const slides = Array.from({ length: 1000 }).map(
    const slides = Products.map(
      (el, index) =>
      <img key={index} className='img-cards-products' variant="top" src={imgsProducts(`./${el.image}`)} alt={el.title}  />
      
    );

  return (
    <div style={{color:"wheat"}}>
        
    <Swiper 
    style={{color:"wheat"}} 
    modules={[Virtual]} 
    spaceBetween={40} 
    slidesPerView={3} 
    virtual>
      {slides.map((slideContent, index) => (
        <SwiperSlide  key={index} virtualIndex={index}>
          {slideContent}
        </SwiperSlide>
      ))}
    </Swiper>
  </div>
  )
}
 
