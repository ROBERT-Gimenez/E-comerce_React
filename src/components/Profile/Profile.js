import {useEffect} from 'react'
import './Profile.css'
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
      </article>
      <main className='main_in_profile'><h1>Productos Comprados</h1></main>
    </div>
  )
}
