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
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' , gap:"3rem" }}
            navbarScroll
          >
                <Link to="/Admin-Profile"><Nav.Link href="/" >Admin</Nav.Link></Link>
                <Link to="/ShoppingCart"><Nav.Link href="#action2">Shopping</Nav.Link></Link>
                    <NavDropdown title="Categorias" id="navbarScrollingDropdown">
                        <Link to="/Bicicletas"><NavDropdown.Item href="#action3">Bicicletas</NavDropdown.Item></Link>
                        <Link to="/Accesorios"><NavDropdown.Item href="#action4">Accesorios</NavDropdown.Item></Link>
                        <NavDropdown.Divider />
                        <Link to="/Promociones"><NavDropdown.Item href="/">Promociones</NavDropdown.Item></Link>
                    </NavDropdown>
                <Link to="/Login"><Nav.Link href="/">Login</Nav.Link></Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>

    </header>
  )
}
