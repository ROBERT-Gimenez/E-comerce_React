import React from 'react'
import {Nav , Table } from 'react-bootstrap'

export default function Cart() {
  return (
    <div>
         <Nav variant="tabs" defaultActiveKey="/home">
      <Nav.Item>
        <Nav.Link eventKey="Users">Carrito</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="Products">Compras</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="Categorys" >Direcciones</Nav.Link>
      </Nav.Item>
    </Nav>
    <Table striped bordered hover variant="dark">
      <thead>
        <tr>
          <th>#</th>
          <th>Producto</th>
          <th>Price</th>
          <th>Data Time</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>Rueda N26</td>
          <td>$2566</td>
          <td>12/22/22</td>
        </tr>
        <tr>
          <td>2</td>
          <td>CADENA TEC</td>
          <td>$1200</td>
          <td>23/06/21</td>
        </tr>
        <tr>
          <td>3</td>
          <td colSpan={2}>Mantenimiento General</td>
          <td>01/02/21</td>
        </tr>
      </tbody>
    </Table>
    </div>
  )
}
