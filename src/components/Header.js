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
    const night = useSelector(state => state.night)

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
                <Link to="/">Home</Link>
                <Link to="/Admin-Profile">Admin</Link>
                <Link className='icons-header' to="/ShoppingCart">Shopping <HiOutlineShoppingCart/></Link>
                    <NavDropdown title="Categorias" id="nav-dropdown-dark-example"  menuVariant="dark" variant="secondary">
                        <Link to="/Bicicletas"><NavDropdown.Item href="/">Bicicletas</NavDropdown.Item></Link>
                        <Link to="/Accesorios"><NavDropdown.Item href="/">Accesorios</NavDropdown.Item></Link>
                        <NavDropdown.Divider />
                        <Link to="/Promociones"><NavDropdown.Item href="/">Promociones</NavDropdown.Item></Link>
                    </NavDropdown>
                <Link className='icons-header' to="/Login">Login <HiUser/></Link>
                <motion.div
                    initial={{opacity: 0, y:-100}}
                    animate={{opacity:1, y:0}}
                    transition={{duration: 0.3, delay: 0.5}}
                    className="luna-container"
                    onClick={() => dispatch(setNight())}>
{/*                 <img className='luna' src={night ? luna : sol} alt="nightmode"/>
 */}                <img className='luna' src={night ? imgs(`./luna.png`) : imgs(`./sol.png`)} alt="nightmode"/>
                </motion.div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>

    </header>
  )
}
