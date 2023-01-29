import {Navigate} from 'react-router-dom'
import {Nav , Table } from 'react-bootstrap'
import { useSelector } from 'react-redux';

export default function Cart() {
  const Token = useSelector(state => state.Token);
  const localToken = localStorage.getItem('token')
  return (
    <div>
    {(!localToken) && <Navigate to="/Login" />}
         <Nav variant="tabs" defaultActiveKey="/home">
      <Nav.Item>
        <Nav.Link eventKey="Users">Carrito</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="Products">Compras</Nav.Link>
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
       {/*  <tr>
          <td>3</td>
          <td colSpan={2}>Mantenimiento General</td>
          <td>01/02/21</td>
        </tr> */}
      </tbody>
    </Table>
    </div>
  )
}
