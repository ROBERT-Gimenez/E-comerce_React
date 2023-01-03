import {useState , useEffect} from 'react'
import { useNavigate , Navigate } from 'react-router-dom';
import {Table , Nav } from 'react-bootstrap';
import './Admin.css'
import Loader from '../Loader';
import useGetAxios from '../../hooks/useGetAxios';
import {useSelector} from "react-redux"
import swal from 'sweetalert'

  export default function Admin() {
    const user = useGetAxios("http://localhost:4000/api/user");
    const Product = useGetAxios("http://localhost:4000/api/products")

    const [users , setUsers] = useState([]);
    const [products , setProducts] = useState([]);

    const night = useSelector(state => state.night);
    const Admin = useSelector(state => state.Admin);
    const navigate  = useNavigate ();
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
    const rejectAcces = () => {
      (swal("Error!", "Acceso Denegado!", "error")
      .then((value) => {
        navigate("/")
      }))
    }
  return (
    <div>
      {!Admin && rejectAcces() && <Navigate to="/" />}
    {Admin && (<>
     <Nav
     variant="tabs" defaultActiveKey="/home" >
      <Nav.Item  className={night?"nav_tabsMoon":"nav_tabsSun"}>
        <Nav.Link eventKey="Users" onClick={getUsers}>Users</Nav.Link>
      </Nav.Item>
      <Nav.Item  className={night?"nav_tabsMoon":"nav_tabsSun"}>
        <Nav.Link eventKey="Products" onClick={getProduct}>Products</Nav.Link>
      </Nav.Item>
      <Nav.Item  className={night?"nav_tabsMoon":"nav_tabsSun"}>
        <Nav.Link eventKey="Categorys" >Compras</Nav.Link>
      </Nav.Item>
    </Nav>
    <Table className={night?"nightOn":"nightOf"}
     bordered >
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
          <td>{product.description.substring(0 ,40)}..</td>
          <td>{product.price}</td>
          <td>{product.discount}</td>
          <td>{product.stock}</td>
        </tr>)
        }) }

      </tbody>
        
    </Table>
    </>)}
    </div>
  )
}
