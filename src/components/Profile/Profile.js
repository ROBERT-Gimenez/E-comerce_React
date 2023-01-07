import {useEffect} from 'react'
import './Profile.css'
import { Table } from 'react-bootstrap';
import useGetAxios from '../../hooks/useGetAxios'
import { useSelector } from 'react-redux';
export default function Profile() {

  const Token = useSelector(state => state.Token);
  useEffect(() => {
    console.log(Token)
   
  }, []);

  return (
    <div className='profile_container'>
      <article className='article_profile'>
        <img className='img_profile' src='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png' />
        <form>
          <label><input type='text' disabled/>Usuario</label>
          <label><input type='text' disabled/>telefono</label>
          <label><input type='text' disabled/>direccion</label>
          <label><input type='text' disabled/>Localidad</label>
        </form>
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
