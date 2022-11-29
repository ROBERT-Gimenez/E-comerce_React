import React from 'react'
import {Navbar , Container} from 'react-bootstrap'

export default function Footer() {
  return (
    <div>
        <Navbar bg="dark" variant="dark">
          <Container>
          <Navbar.Brand href="#home">
            <img
              alt=""
              src=""
              width="30"
              height="70"
              className="d-inline-block align-top"
            />{' '}
            copyright Bike's Master
          </Navbar.Brand>
        </Container>
      </Navbar>
    </div>
  )
}
