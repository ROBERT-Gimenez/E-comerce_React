import {useState , useEffect} from 'react'
import {Table , Nav } from 'react-bootstrap';
import style from './Admin.css'
import Loader from '../Loader';
import useGetAxios from '../../hooks/useGetAxios';
import {useSelector} from "react-redux"


  export default function Admin() {
    const user = useGetAxios("http://localhost:4000/api/user");
    const Product = useGetAxios("http://localhost:4000/api/products")

    const [users , setUsers] = useState([]);
    const [products , setProducts] = useState([]);

    const night = useSelector(state => state.night);

    useEffect(() => {
    user.data && setUsers(user.data)
    // eslint-disable-next-line
    },[user.loading]);

    function getProduct(){
      Product.data && setProducts(Product.data) 
      setUsers([])
    } 
    function getUsers(){
      user.data && setUsers(user.data)
      setProducts([])
    } 

  return (
    <div>
       
    <Nav style= {{backgroundColor:night?"slategray":"rgb(19 19 21)"}}
     variant="tabs" defaultActiveKey="/home" className={style.nav}>
      <Nav.Item>
        <Nav.Link eventKey="Users" onClick={getUsers}>Users</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="Products" onClick={getProduct}>Products</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="Categorys" >Compras</Nav.Link>
      </Nav.Item>
    </Nav>
    <Table style= {{backgroundColor:night?"slategray":"rgb(19 19 21)"}} 
    striped bordered hover >
      {(users.loading || Product.loading) &&  <Loader/>}
      <thead>
        {users.loading && <Loader/>}
        {users && users.length > 1 ? 
          <tr>
          <th>#</th>
          <th>First Name</th>
          <th>Email</th>
          <th>phone</th>
        </tr>
        :
        <tr>
          <th>#</th>
          <th>Product Name</th>
          <th>description</th>
          <th>price</th>
          <th>discount</th>
          <th>stock</th>
        </tr>
        }
      </thead>
      <tbody>
        {!user.loading && users.map((user , indx)=> {
          return(
          <tr key={indx}>
          <td>{user.id}</td>
          <td>{user.name}</td>
          <td>{user.email}</td>
          <td>{user.telefono}</td>
        </tr>)
        }) }
        {!Product.loading && products.map((product , indx)=> {
          return(
          <tr key={indx}>
          <td>{product.id}</td>
          <td>{product.name}</td>
          <td>{product.description}</td>
          <td>{product.price}</td>
          <td>{product.discount}</td>
          <td>{product.stock}</td>
        </tr>)
        }) }

      </tbody>
        
    </Table>
    </div>
  )
}
