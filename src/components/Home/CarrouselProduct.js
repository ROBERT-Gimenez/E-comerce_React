import {useState ,useEffect} from 'react'
import { Virtual , Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Link , Navigate} from 'react-router-dom';
import useGetAxios from '../../hooks/useGetAxios';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/virtual';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const imgsProducts = require.context('../../resource/img/products', true);

export default function CarrouselProduct() {

    const [Products , setProducts] = useState([])
    const {data , loading} = useGetAxios('http://localhost:4000/api/products')

    
    useEffect(() => {
        data && setProducts(data)
    }, [loading]);
    // Create array with 1000 slides ${el.name} ${index + 1}`
    // const slides = Array.from({ length: 1000 }).map(
    const slides = Products.map(
        (el, index) =>
        <>
        <div id={el.id} key={index}  onClick={() => inDetail(el.id)} className='imgs_recomend'>
        <img 
        className='img-cards-products' 
        variant="top" src={imgsProducts(`./${el.image}`)} 
        alt={el.title}
        
        />
        </div>
        <h5>{el.name}</h5>
      </>
      
      );
      
      const inDetail= (id) => {
        return <Navigate to={`/detalle?productId=${id}`}/>
      }
  return (
    <>
    <h3 style={{color:"wheat"}}>Productos Relacionados</h3>  
    <div className='body_imgs_recomend' style={{color:"wheat"}}>
      <Swiper 
      style={{color:"wheat"}} 
      modules={[Virtual,Navigation, Pagination, Scrollbar, A11y]} 
      spaceBetween={1} 
      slidesPerView={4}
      pagination={{ clickable: true }} 
      scrollbar={{ draggable: false }}
      navigation
      virtual>
        {slides.map((slideContent, index) => (
          <SwiperSlide onClick={() => inDetail(slideContent.props.children[0].props.id)} key={index} virtualIndex={index}>
            {slideContent}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
    </>
  )
}
 
