import {useEffect , useState} from 'react'
import './Profile.css'
import { Table } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import axios from 'axios';

export default function Profile() {
  
  const [user , setUser] = useState(null);
  let query = new URLSearchParams(window.location.search);
  const Token = useSelector(state => state.Token);

    useEffect(() => {
      const getUserData = async () => {
        try {
          const token = localStorage.getItem('token');
          const config = {
            headers: {
              'x-access-token': token,
            },
          };
          const query = new URLSearchParams(window.location.search);
          const keyword = query.get('userId');
          const response = await axios.get(`http://localhost:4000/api/user/detail/${keyword}`, config);
          setUser(response.data)
          console.log(response)
        } catch (error) {
          console.log(error)
        }
      };
      getUserData();
    }, []);
  

  return (
    <div className='profile_container'>
      <article className='article_profile'>
        <img className='img_profile' src={ user?.avatar ? user.avatar :'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png'} />
        { user &&  <form>
          <label><input type='text' disabled  defaultValue={user.name} />Usuario</label>
          <label><input type='text' disabled defaultValue={user.telefono ? user.telefono : "No agregado"} />telefono</label>
          <label><input type='text' disabled defaultValue={user.direccion_id ? user.direccion_id : "No agregado"} />direccion</label>
          <label><input type='text' disabled  defaultValue={user.direccion_id ? user.direccion_id : "No agregado"} />Localidad</label>
        </form> }
        <button>Edit</button>
      </article>
      <main className='main_in_profile'>
        <h1>Productos Comprados</h1>
        <Table striped bordered hover variant="dark">
      <thead>
        <tr>
          <th>#</th>
          <th>Producto</th>
          <th>Price</th>
          <th>Data Time</th>
          <th>Detalle</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>Rueda N26</td>
          <td>$2566</td>
          <td>12/22/22</td>
          <td><button>Detalle</button></td>
        </tr>
        <tr>
          <td>2</td>
          <td>CADENA TEC</td>
          <td>$1200</td>
          <td>23/06/21</td>
          <td><button>Detalle</button></td>
        </tr>
      
      </tbody>
    </Table>
      </main>
    </div>
  )
}
