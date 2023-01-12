import {useState , useEffect} from 'react'
import { useForm } from 'react-hook-form'
import useAxiosPost from '../../hooks/useAxiosPost';
import axios from 'axios';

export default function FormRegister({user}) {


  const {register, formState:{errors} , watch , handleSubmit } = useForm();

  const [data, loading, error, makePostRequest] = useAxiosPost(url, {
    key1: 'value1',
    key2: 'value2'});

  const [provinces, setProvinces] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState('');
  const [localities, setLocalities] = useState([]);
  const [selectedLocality, setSelectedLocality] = useState('');

    useEffect(() => {
        // Obtener las provincias
        axios.get('https://apis.datos.gob.ar/georef/api/provincias')
          .then(response => {
            setProvinces(response.data.provincias);
          })
          .catch(error => {
            console.error(error);
          });
      }, []);
    
      

    useEffect(() => {
        // Obtener las localidades de la provincia seleccionada
        if (selectedProvince) {
          axios.get(`https://apis.datos.gob.ar/georef/api/localidades?provincia=${selectedProvince}&campos=id,nombre&max=5000`)
            .then(response => {
              setLocalities(response.data.localidades);
            })
            .catch(error => {
              console.error(error);
            });
        } else {
          setLocalities([]);
        }
      }, [selectedProvince]);
    
     

    const handleProvinceChange = event => {
        setSelectedProvince(event.target.value);
      };
    
      const handleLocalityChange = event => {
        setSelectedLocality(event.target.value);
      };
      
    
return (
    <div>
        <form className='modal_form'>
        <label>
        <select value={selectedProvince} onChange={handleProvinceChange}>
            <option value="">Seleccione una provincia</option>
            {provinces.map(province => (
            <option key={province.id} value={province.nombre}>{province.nombre}</option>
            ))}
        </select>
        Provincia:
        </label>
        <label>
        <select value={selectedLocality} onChange={handleLocalityChange}>
            <option value="">Seleccione una localidad</option>
            {localities.map(locality => (
            <option key={locality.id} value={locality.nombre}>{locality.nombre}</option>
            ))}
        </select>
        Localidad:
        </label>
        <label>
        <input type='text'  placeholder={user.direccion_id ? user.direccion_id : "No agregado"}
        {...register("name" , 
        {
          minLength:{ value:4 , message:"ingrese un nombre entre 4 y 11 caracteres"},
         })} />
        direccion
        </label>
        {errors.name && <span>{errors.name.message}</span>}
        <button>Guardar</button> 
    </form>
  </div>
  )
}
