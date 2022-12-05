import React from 'react'
import {Navbar} from 'react-bootstrap'
import {ImWhatsapp} from "react-icons/im";

export default function Footer() {
  return (
    <div className='footer-general'>
        <a href='/' className='whattsapp-icon'><ImWhatsapp/></a>
        <Navbar bg="dark" variant="dark">
          <>
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
        </>
      </Navbar>
    </div>
  )
}
