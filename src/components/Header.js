import {NavDropdown , Form , Button ,Navbar ,Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {motion} from 'framer-motion'
import {HiOutlineShoppingCart , HiUser} from "react-icons/hi2";
// resource 
import Logo from '../resource/img/logo-2.svg'
import useGetAxios from '../hooks/useGetAxios';

//redux
import { setNight , setListStore } from '../Store/state';
import { useDispatch , useSelector } from 'react-redux';
const imgs = require.context('../resource/img' , true);


export default function Header() {
  
    const {data} = useGetAxios("http://localhost:4000/api/products")
    const dispatch = useDispatch();
    const night = useSelector(state => state.night);
    /* const ListStore = useSelector(state => state.Products); */

    const variant = {
      hidden: { opacity: 0, x:600 },
      visible: ({delay}) => ({
        opacity: 1,
        scale: 1,
        x:0,
        transition: {
          delay,
          duration:1
        }
      })
    }

    const filterList = (categori) => {// eslint-disable-next-line 
      let products = data.filter(element => element.categoryid == categori) 
      return products
    }
    const Promocions = () => {
      let products = data.filter(element => element.discount > 0) 
      return products
    }

    const urls = [{name:"Home",url:"/"},
    {name:"Admin",url:"/Admin-Profile"},
    {name:"Carrito",url:"ShoppingCart"},
    {name:"categoria"},
    {name:"Login",url:"/Login"}]
    const actionUrls = (name,url) => {
      if(name === "Login"){return <Link className='icons-header' to="/Login">Login <HiUser/></Link> }
      if(name === "Carrito"){ return <Link className='icons-header' to="/ShoppingCart">Carrito <HiOutlineShoppingCart/></Link>}
      if(name === "categoria"){
        return <NavDropdown title="Categorias" id="nav-dropdown-dark-example"  menuVariant="dark" variant="secondary">
        <NavDropdown.Item  onClick={() => dispatch(setListStore(filterList(1)))}>Bicicletas</NavDropdown.Item>
        <NavDropdown.Item  onClick={() => dispatch(setListStore(filterList(4)))}>Accesorios</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item onClick={() => dispatch(setListStore(Promocions()))}>Promociones</NavDropdown.Item>
        </NavDropdown>
      }
      return <Link to={url}>{name}</Link>
    }

  return (
    <header style= {{backgroundColor:night?"#212529":"rgb(180 246 255)"}}>
    <Navbar variant='dark' expand="lg">
      <Container fluid>
      <Navbar.Brand href="/">
            <img
              alt="logo"
              src={Logo}
              width="120"
              height="60"
              className="d-inline align-top Logo"
            />{' '}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>

          <Nav
            className="me-auto my-2 my-lg-0 align-items-center"
            style={{ maxHeight: '100px' , gap:"2rem" ,zIndex:"2" }}
            navbarScroll
          >
            {urls.map((url , idx) => { 
              return (
                <motion.div
                key={idx}
                custom={{delay : (idx + 1 ) * 0.3}}
                initial="hidden"
                exit="hidden"
                animate="visible"
                variants={variant}
                >
                    {actionUrls(url.name , url.url)}
                    </motion.div>
                )
            })}
             
                <motion.div
                    initial={{opacity: 0, y:-100}}
                    animate={{opacity:1, y:0}}
                    transition={{duration: 0.3, delay: 0.5}}
                    className="luna-container"
                    onClick={() => dispatch(setNight())}>
                <img className='luna' src={night ? imgs(`./luna.png`) : imgs(`./sol.png`)} alt="nightmode"/>
                </motion.div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>

    </header>
  )
}
