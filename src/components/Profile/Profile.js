import {useEffect , useState} from 'react'
import './Profile.css'
import { Table } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import axios from 'axios';
import useUserAvatar from '../../hooks/useUserAvatar';
import MyModal from './MyModal';

export default function Profile() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const token = localStorage.getItem('token');
  const avatarId = localStorage.getItem('avatarId')
  const [user , setUser] = useState(null);
  const [direction , setDirection] = useState(null);
  const Token = useSelector(state => state.Token);
  const avatar = useUserAvatar(avatarId)
  console.log(avatar)
    useEffect(() => {
      const getUserData = async () => {
        try {
          const config = {
            headers: {
              'x-access-token': token,
            },
          };
          const query = new URLSearchParams(window.location.search);
          const keyword = query.get('userId');
          const response = await axios.get(`http://localhost:4000/api/user/detail/${keyword}`, config);
          console.log(response.data?.user)
          console.log(response.data?.direction[0])
          response && setUser(response.data)
          response && setDirection(response.data?.direction[0])
        } catch (error) {
          console.log(error)
        }
      };
      getUserData();
    }, []);
  
    
  function openModal() {
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
  }


  return (
    <div className='profile_container'>
      <article className='article_profile'>
        <img className='img_profile' src={avatarId ? avatar : "https://t3.ftcdn.net/jpg/00/64/67/80/360_F_64678017_zUpiZFjj04cnLri7oADnyMH0XBYyQghG.jpg"}  alt="avatar user" />

        { user &&  <form>
          <label><input type='text' disabled  defaultValue={user.user.name} />Usuario</label>
          <label><input type='text' disabled defaultValue={user.user.telefono ? user.user.telefono : "No agregado"} />telefono</label>
          <label><input type='text' disabled  defaultValue={direction.localidad ? direction.localidad : "No agregado"} />Localidad</label>
          <label><input type='text' disabled defaultValue={direction.direccion ? direction.direccion  : "No agregado"} />direccion</label>
          <label><input type='text' disabled defaultValue={direction.altura ? direction.altura  : "No agregado"} />altura</label>
        </form> }
        <button onClick={openModal}>Edit</button>
      </article>
      <MyModal isOpen={isModalOpen} onClose={closeModal} user={user?.user}/>
      <main className='main_in_profile'>
        <h1>Productos Comprados</h1>
        <Table className='table_orders' striped bordered hover variant="ligth">
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
