import {Row , Col , Card } from 'react-bootstrap'
import { useEffect} from 'react'
import {ImHeart} from "react-icons/im";
import { Link , useNavigate  } from 'react-router-dom';
import { motion } from "framer-motion"
import { useSelector , useDispatch } from 'react-redux';
import { setListStore } from '../../Store/state';
import Loader from '../Loader';
import useGetAxios from '../../hooks/useGetAxios';
import './List.css'
const imgsProducts = require.context('../../resource/img/products', true);

export default function List() {
  const navigate  = useNavigate ();
  /* const [productsList , setProductsList] = useState([]); */
  const {data , loading} = useGetAxios("http://localhost:4000/api/products")

  const dispatch = useDispatch();
  const ListStore = useSelector(state => state.Products);
  
  useEffect(() => {
    /* !loading && setProductsList(data) */
    !loading && ListStore.length < 1 && dispatch(setListStore(data))
    // eslint-disable-next-line
      } ,[loading])   
    
  const inDetail= (id) => {
    return navigate(`/detalle?productId=${id}`)  
  }

  const container = {
    hidden: { opacity: 0, scale: 0 },
    visible: ({delay}) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay,
        duration:1
      }
    })
  }

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


  
  return (
      <div>

      <h2 className='title_ofertas'>Productos</h2>
        <Row xs="auto" md="auto" lg="auto" className="container-col-card">
      {loading && <Loader/>}

      { !loading  && ListStore.map((prod,idx) => (
        <motion.div
        key={idx}
        custom={{delay : (idx + 1 ) * 0.2}}
        variants={container}
        initial="hidden"
        animate="visible"
        style={{display: "grid" , placeItems: "center"}}
        >
        <Col key={idx}>
         <Card className='body-card-product' >
  
          <ImHeart className='cart-card'/>
          <span>{discountOn(prod.discount)}</span>
        <Card.Img className='img-cards-products' style={{ margin:"auto"}} variant="top" src={imgsProducts(`./${prod.image}`)} alt={prod.title} onClick={() => inDetail(prod.id)} />

            <Card.Body className="body_card_detail">
                <Card.Title>{formattedPrice(prod.price,prod.discount)}</Card.Title>
                <Card.Text>
                {prod.name.substring(0 ,24)}
                </Card.Text>
               {/*  <Card.Text>
                {prod.description.substring(0 ,40)}..
                </Card.Text> */}
              <Link to={`/detalle?productId=${prod.id}`} className="btn btn-primary">View Detail</Link>
            </Card.Body>
            </Card>
        </Col>
      </motion.div>
    
    ))}
    </Row>
    </div>
  )
}
