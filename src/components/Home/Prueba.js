import {useState ,useEffect} from 'react'
import { Virtual , Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import useGetAxios from '../../hooks/useGetAxios';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/virtual';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

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
      <>
      <div className='imgs_recomend'>
          <img key={index} className='img-cards-products' variant="top" src={imgsProducts(`./${el.image}`)} alt={el.title}  />
      </div>
          <h5>{el.name}</h5>
      </>
      
    );

  return (
    <div className='body_imgs_recomend' style={{color:"wheat"}}>
        
    <Swiper 
    style={{color:"wheat"}} 
    modules={[Virtual,Navigation, Pagination, Scrollbar, A11y]} 
    spaceBetween={1} 
    slidesPerView={4}
    pagination={{ clickable: true }} 
    scrollbar={{ draggable: true }}
    navigation
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
 
