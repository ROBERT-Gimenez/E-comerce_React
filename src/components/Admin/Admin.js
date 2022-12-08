import React from 'react'
 import {Table , Nav} from 'react-bootstrap';
export default function Admin() {
  return (
    <div>
    <Nav variant="tabs" defaultActiveKey="/home" className='nav-admin'>
      <Nav.Item>
        <Nav.Link eventKey="Users">Users</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="Products">Products</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="Categorys" >Categorias</Nav.Link>
      </Nav.Item>
    </Nav>
    <Table striped bordered hover variant="dark">
      <thead>
        <tr>
          <th>#</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Username</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
        </tr>
        <tr>
          <td>2</td>
          <td>Jacob</td>
          <td>Thornton</td>
          <td>@fat</td>
        </tr>
        <tr>
          <td>3</td>
          <td colSpan={2}>Larry the Bird</td>
          <td>@twitter</td>
        </tr>
      </tbody>
    </Table>
    </div>
  )
}
