import {NavDropdown , Form , Button ,Navbar ,Nav, Container } from 'react-bootstrap';
import Logo from '../resource/img/logo-2.svg'
export default function Header() {
  return (
    <header>
    <Navbar bg="dark" variant="dark">
    <Container>
        <Navbar.Brand href="/">
            <img
              alt="logo"
              src={Logo}
              width="120"
              height="60"
              className="d-inline align-top Logo"
            />{' '}
        </Navbar.Brand>
        <Nav className="me-auto nav-container">
            <Navbar.Collapse id="navbarScroll" className='nav-contein-btn'>
                <Nav
                    className="me-auto my-2 my-lg-0"
                    style={{ maxHeight: '100px' }}
                    navbarScroll
                >
                    <NavDropdown title="Categorias" id="navbarScrollingDropdown">
                        <NavDropdown.Item href="#action3">Bicicletas</NavDropdown.Item>
                        <NavDropdown.Item href="#action4">Accesorios</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action5">Promociones</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
                <Form className="d-flex">
                    <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                    />
                    <Button variant="outline-success">Search</Button>
                </Form>
            <Nav.Link href="#features">carro</Nav.Link>
            <Nav.Link href="#pricing">Profile</Nav.Link>
            </Navbar.Collapse>
        </Nav>
          
    </Container>
    </Navbar>
    </header>
  )
}
