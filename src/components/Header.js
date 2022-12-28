import {NavDropdown , Form , Button ,Navbar ,Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {motion} from 'framer-motion'
import {HiOutlineShoppingCart , HiUser} from "react-icons/hi2";
// resource 
import Logo from '../resource/img/logo-2.svg'

//redux
import { setNight } from '../Store/state';
import { useDispatch , useSelector } from 'react-redux';
const imgs = require.context('../resource/img' , true);


export default function Header() {
    
    const dispatch = useDispatch();
    const night = useSelector(state => state.night);

    const variant = {
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

    const urls = [{name:"Home",url:"/"},
    {name:"Admin",url:"/Admin-Profile"},
    {name:"Carrito",url:"ShoppingCart"},
    {name:"categoria"},
    {name:"Login",url:"/Login"}]
    const actionUrls = (name,url) => {
      if(name == "Login"){return <Link className='icons-header' to="/Login">Login <HiUser/></Link> }
      if(name == "Carrito"){ return <Link className='icons-header' to="/ShoppingCart">Carrito <HiOutlineShoppingCart/></Link>}
      if(name == "categoria"){
        return <NavDropdown title="Categorias" id="nav-dropdown-dark-example"  menuVariant="dark" variant="secondary">
        <Link to="/Bicicletas"><NavDropdown.Item href="/">Bicicletas</NavDropdown.Item></Link>
        <Link to="/Accesorios"><NavDropdown.Item href="/">Accesorios</NavDropdown.Item></Link>
        <NavDropdown.Divider />
        <Link to="/Promociones"><NavDropdown.Item href="/">Promociones</NavDropdown.Item></Link>
        </NavDropdown>
      }
      return <Link to={url}>{name}</Link>
    }

  return (
    <header>
    <Navbar variant='dark' bg="dark" expand="lg">
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
            style={{ maxHeight: '100px' , gap:"3rem" }}
            navbarScroll
          >
            {urls.map((url , inx) => { 
              return (
                <motion.div
                    custom={{delay: 1}}
                    initial={{opacity: 0, x:-200}}
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
