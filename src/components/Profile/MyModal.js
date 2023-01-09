import {useState , useEffect} from 'react'
import { AnimatePresence, motion } from "framer-motion";
import axios from 'axios';
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'


export default function MyModal({ isOpen, onClose , user }) {
  const {register, formState:{errors} , watch , handleSubmit } = useForm();
  const [provinces, setProvinces] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState('');
  const [localities, setLocalities] = useState([]);
  const [selectedLocality, setSelectedLocality] = useState('');
  const [file, setFile] = useState(null);
  const night = useSelector(state => state.night);
  const regExAlpha = /^[a-zA-Z\sñáéíóúü ]*$/;

  const handleFileChange = event => {
    setFile(event.target.files[0]);
  };

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
  const submitUpdate = (data) => {

    const name = data.name;
    const email = data.email_sing_up;
    const password = data.pass_sing_up1;
    const rol_id = 1;
   

    axios.post('http://localhost:4000/api/user/create' , {name,email,password,rol_id})
    .then(res => {
        console.log(res)
        let error = res?.data?.errors?.[0].msg;
        let userin = res?.data?.name;
        userin && (swal("Perfil Registrado!", "Genial ahora puedes ingresar con tu perfil!", "success")
        .then((value) => {
            window.location.reload() 
          }))
        error && alert("Datos erroneos")
   
        }).catch((err) => { console.log(err)})
    }
 
    

  return (
    <div className='modal_container'>
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 , x:300 }}
          animate={{ opacity: 1 , x:0 }}
          exit={{ opacity: 0 , x:300 }}
          className="modal-overlay"
          onClick={onClose}
        >
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            className="modal-container"
            onClick={(e) => e.stopPropagation()}
          >
            <h4>Editar Datos</h4>
         

        <form className='modal_form' onSubmit={submitUpdate}>
          <label>
            Subir foto: {file ? `${file.name}` : 'No hay archivo seleccionado'}
            <input name='avatar' id='avatar' type="file" onChange={handleFileChange} />
          </label>
          <br />
          <label><input type='text'  name='name' id="name" defaultValue={user.name} 
           {...register("name" , 
           {
            minLength:{ value:4 , message:"ingrese un nombre entre 4 y 11 caracteres"},
           maxLength:{value:11 , message:"ingrese un nombre entre 4 y 11 caracteres"},
           pattern:{value:regExAlpha , message:"Nombre Invalido , evite numeros o caracteres "}
        })}
          />Usuario</label>
          {errors.name && <span>{errors.name.message}</span>}
        
          <label><input type='text' id='telefono' name='telefono' defaultValue={user.telefono ? user.telefono : "No agregado"}
           {...register("telefono" , 
           {
            minLength:{ value:8 , message:"ingrese un nombre entre 8 y 12 caracteres"},
           maxLength:{value:12 , message:"ingrese un nombre entre 4 y 11 caracteres"},
        })}
          />telefono</label>
            {errors.telefono && <span>{errors.telefono.message}</span>}
            <hr/>
          <button>Guardar</button>         
        </form> 
        <hr/>
        <form className='modal_form'>
      <label>
        Provincia:
        <select value={selectedProvince} onChange={handleProvinceChange}>
          <option value="">Seleccione una provincia</option>
          {provinces.map(province => (
            <option key={province.id} value={province.nombre}>{province.nombre}</option>
          ))}
        </select>
      </label>
      <label>
        Localidad:
        <select value={selectedLocality} onChange={handleLocalityChange}>
          <option value="">Seleccione una localidad</option>
          {localities.map(locality => (
            <option key={locality.id} value={locality.nombre}>{locality.nombre}</option>
          ))}
        </select>
      </label>
      <label>
        <input type='text'  defaultValue={user.direccion_id ? user.direccion_id : "No agregado"} />
        direccion
        </label>
        <hr/>
        <button>Guardar</button> 
    </form>
        
      
  
            <button className='btn_modal_close' onClick={onClose}>Cancelar</button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
    </div>
  )
}
