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
  const [previewUrl, setPreviewUrl] = useState(null);

  const night = useSelector(state => state.night);
  const regExAlpha = /^[a-zA-Z\sñáéíóúü ]*$/;

  const handleFileChange = event => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    const reader = new FileReader();
    reader.onload = function() {
      setPreviewUrl(reader.result);
    };
    reader.readAsDataURL(selectedFile);
  
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
       /*  userin && (swal("Perfil Registrado!", "Genial ahora puedes ingresar con tu perfil!", "success")
        .then((value) => {
            window.location.reload() 
          })) */
        error && alert("Datos erroneos")
   
        }).catch((err) => { console.log(err)})
    }
 
    

  return (
    <div className='modal_container'>
    <AnimatePresence>
      {isOpen && (
        <motion.div style={{position: "fixed" , zIndex:"2"}}
          initial={{ opacity: 0 , x:-900 , width:"100%"  }}
          animate={{ opacity: 1 , x:0  }}
          exit={{ opacity: 0 , x:-900 }}
          transition={{duration:1 , delay:0.3}}
          className="modal-overlay"
          onClick={onClose}
        >
          <motion.div
            initial={{ x:-900 , width:"70%" }}
            animate={{ opacity: 1 , x: 0 }}
            exit={{ opacity: 0,  x:-900 , transition:{duration:1} }}
            className="modal-container"
            onClick={(e) => e.stopPropagation()}
          >
            <h4>Editar Datos</h4>
         

        <form className='modal_form_img' onSubmit={submitUpdate}>

        <div className='conteiner_img_upload'>
        <h5>Avatar</h5>
            {previewUrl ? <img className="img_prev" src={previewUrl} alt="Vista previa" /> : ''}
          <br /> 
            <label className='label_img'>
              {file ? `Subir foto:${file.name}` : ''}
              <input name='avatar' id='avatar' type="file" onChange={handleFileChange} />
            </label>
        </div> 
          <br />
          <div className='container_label'>
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
            </div>
            
        </form> 
        <hr/>
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
        <input type='text'  defaultValue={user.direccion_id ? user.direccion_id : "No agregado"} />
        direccion
        </label>
        <button>Guardar</button> 
    </form>
        <hr/>
        
      
  
            <button className='btn_modal_close' onClick={onClose}>Cancelar</button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
    </div>
  )
}
