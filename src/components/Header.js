import {NavDropdown , Form , Button ,Navbar ,Nav, Container } from 'react-bootstrap';
import Logo from '../resource/img/logo-2.svg'
import { Link } from 'react-router-dom';

export default function Header() {
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
                <Link to="/ShoppingCart">Shopping</Link>
                    <NavDropdown title="Categorias" id="nav-dropdown-dark-example"  menuVariant="dark" variant="secondary">
                        <Link to="/Bicicletas"><NavDropdown.Item href="/">Bicicletas</NavDropdown.Item></Link>
                        <Link to="/Accesorios"><NavDropdown.Item href="/">Accesorios</NavDropdown.Item></Link>
                        <NavDropdown.Divider />
                        <Link to="/Promociones"><NavDropdown.Item href="/">Promociones</NavDropdown.Item></Link>
                    </NavDropdown>
                <Link to="/Login">Login</Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>

    </header>
  )
}
