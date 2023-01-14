import {useState , useEffect} from 'react'
import { useForm } from 'react-hook-form'
import useAxiosPost from '../../hooks/useAxiosPost';
import axios from 'axios';
import { useCallback } from 'react';

export default function FormRegister({user}) {


  const {register, formState:{errors} , watch , handleSubmit } = useForm();

  const [provinces, setProvinces] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState('');
  const [localities, setLocalities] = useState([]);
  const [selectedLocality, setSelectedLocality] = useState('');
  const [data, loading] = useAxiosPost();
  const [response, error, isLoading, setUrl, setPostData] = useAxiosPost();
 
  const onSubmit = (data) => {
    setUrl(`http://localhost:4000/api/user/edit/${user.id}`);
    setPostData(data);
    console.log(data)
    console.log(error)

};

    const containsNumber = (value) => {
        const regex = /\d/;
        if(regex.test(value)) {
            return true;
        }
        return "ingrese algun número para indicar la altura";
    }
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
        <form className='modal_form'  onSubmit={handleSubmit(onSubmit)}>
        <label>
        <select name='provincia' value={selectedProvince} onChange={handleProvinceChange}
        {...register("provincia",{value: selectedProvince, onChange: handleProvinceChange})}>
            <option value="">Seleccione una provincia</option>
            {provinces.map(province => (
            <option key={province.id} value={province.nombre}>{province.nombre}</option>
            ))}
        </select>
        Provincia:
        </label>
        <label>
        <select name="localidad"  onChange={handleLocalityChange}
            {...register("localidad",{value: {selectedLocality}}
)}>
            <option value={selectedLocality}>Seleccione una localidad</option>
            {localities.map(locality => (
            <option key={locality.id} value={locality.nombre}>{locality.nombre}</option>
            ))}
        </select>
        Localidad:
        </label>
        <label>
        <input name='direccion' type='text'  placeholder={user.direccion_id ? user.direccion_id : "direccion y altura"}
        {...register("direccion" , 
        {
          minLength:{ value:4 , message:"la direccion es muy corta"},
          validate: {containsNumber}
         })} />
        direccion
        </label>
        {errors.direccion && <span>{errors.direccion.message}</span>}
        <button>Guardar</button> 
    </form>
  </div>
  )
}
