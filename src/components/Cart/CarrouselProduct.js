import {useState ,useEffect} from 'react'
import { Virtual , Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigate} from 'react-router-dom';
import useGetAxios from '../../hooks/useGetAxios';
import { motion , AnimatePresence } from 'framer-motion';
import {AiOutlineCloseCircle } from "react-icons/ai";
import {Row , Col , Card } from 'react-bootstrap'




// Import Swiper styles
import 'swiper/css';
import 'swiper/css/virtual';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const imgsProducts = require.context('../../resource/img/products', true);

export default function CarrouselProduct() {


  const formattedPrice = (price , discount) => {
    let discountOn = parseFloat(price - price * discount / 100).toLocaleString('es-AR', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).replace(",", ".");
    let princeNormal = parseFloat(price).toLocaleString('es-AR', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).replace(",", ".");
    if(discount > 0){
      return (<p className="precio-discount">${discountOn}
              <span className="precio">${price}</span>
      </p>)
    }
    return (<p className="precio" >${princeNormal}</p>)  
  }
  const discountOn = (discount) => {
    if (discount > 0) {
      return <p className="sale-off">{discount}%</p>
    }
    return null
  }
    // eslint-disable-next-line
    const [selectedId, setSelectedId] = useState(null)
    const [selectedProd, setSelectedProd] = useState("")
    const [Products , setProducts] = useState([])
    const {data , loading} = useGetAxios('http://localhost:4000/api/products')

    useEffect(() => {
      let query = new URLSearchParams(window.location.search);
      let keyword = query.get('productId');
      // eslint-disable-next-line
      data && setProducts(data.filter(item => {
      // eslint-disable-next-line
          if(item.id != keyword){
            return item
          }
        }))
      } 
      
/*         data && setProducts(data)*/
      // eslint-disable-next-line
    , [loading]);
   

    const slides = Products.map((el, index) =>
        < >
          <motion.div id={el.id} key={index} layoutId={el.id}  onClick={() => inDetail(el.id)} className='imgs_recomend'>
              <img className='img-cards-products' 
              variant="top" src={imgsProducts(`./${el.image}`)} 
              alt={el.title}
              />
          </motion.div>
          <h5>{el.name}</h5>
        </>
      ); 

      const inDetail= (id) => {
        const selctioProd = Products.find(item => { return item.id === id})
        setSelectedProd(selctioProd)
        setSelectedId(id)
        return <Navigate to={`/detalle?productId=${id}`}/>
      };
      
  return (
    !loading && (
    <motion.div
    initial={{opacity:0, scale:0}}
    animate={{opacity:1 , scale:1}}
    transition={{duration:1}}
    >
    <h3 style={{color:"wheat"}}>Productos Relacionados</h3>  
    <div className='body_imgs_recomend' style={{color:"wheat"}}>
        <Swiper 
        breakpoints={{
          // when window width is >= 640px
          340: {
            slidesPerView:2
          },
          // when window width is >= 768px
          768: {
            slidesPerView:4
          },
        }}
            style={{color:"wheat"}} 
            modules={[Virtual,Navigation, Pagination, Scrollbar, A11y]} 
            spaceBetween={1} 
            /* slidesPerView={4} */
            pagination={false} /* {{ clickable: false }} */ 
            scrollbar={{ draggable: false }}
            navigation
            virtual>
          {slides.map((slideContent, index) => (
            <SwiperSlide onClick={() => inDetail(slideContent.props.children[0].props.id)} key={index} virtualIndex={index}>
              {slideContent}
            </SwiperSlide>
          ))}
        </Swiper>

        <AnimatePresence >
        {selectedId && selectedProd && (
          <motion.div className="motion_detail" layoutId={selectedId}>
                <motion.div id={selectedProd.id} key={selectedProd.id} /*  onClick={() => inDetail(selectedProd.id)} */ className='imgs_recomend_container'>
                <div className='content_btn'>
                <motion.button className='btn_close_detail' onClick={() => setSelectedId(null)} ><AiOutlineCloseCircle onClick={() => setSelectedId(null)} /></motion.button>
                </div>

                    {/* <motion.img 
                    className='img-cards-products_detail' 
                    variant="top" src={imgsProducts(`./${selectedProd.image}`)} 
                    alt={selectedProd.title}
                    style={{borderRadius:"10px"}}
                    onClick={()=>{
                      window.location.replace(`/detalle?productId=${selectedProd.id}`)
                    } }
                    /> */}
                   
                <Card style={{border:'none'}} className='body-card-product card' >
                    <span>{discountOn(selectedProd.discount)}</span>
                    <Card.Img className='img-cards-products ' style={{ margin:"auto"}} variant="top" src={imgsProducts(`./${selectedProd.image}`)} alt={selectedProd.title} onClick={() => inDetail(selectedProd.id)} />

                    <Card.Body className="body_card_detail">
                      <Card.Title>{formattedPrice(selectedProd.price,selectedProd.discount)}</Card.Title>
                      <Card.Text>
                      {selectedProd.name.substring(0 ,24)}
                      </Card.Text>
                    </Card.Body>
                  <a style={{marginBottom:'10px'}} href={`/detalle?productId=${selectedProd.id}`} className="agregar">go to product</a>
                </Card>
          </motion.div>
          </motion.div>
          )}
        </AnimatePresence> 
    </div> 
  </motion.div>)
  )
}
 
