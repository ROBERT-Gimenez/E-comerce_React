import {useState , useEffect} from 'react'
import { AnimatePresence, motion } from "framer-motion";
import axios from 'axios';
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import FormRegister from './FormRegister';
import useAxiosPost from '../../hooks/useAxiosPost';

export default function MyModal({ isOpen, onClose , user }) {


  const {register, formState:{errors} , watch , handleSubmit } = useForm();
  const [response, error, isLoading, setUrl, setPostData] = useAxiosPost();

  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const night = useSelector(state => state.night);
  const regExAlpha = /^[a-zA-Z\sñáéíóúü ]*$/;

    const onSubmit = (data) => {
      const formData = new FormData();
      formData.append('avatar', file);
      formData.append('name', data.name);
      formData.append('telefono', data.telefono);
      setUrl(`http://localhost:4000/api/user/edit/${user.id}`);
      setPostData(formData);
      console.log(file)
      console.log(error)
  };

  const handleFileChange = event => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    const reader = new FileReader();
    reader.onload = function() {
      setPreviewUrl(reader.result);
    };
    reader.readAsDataURL(selectedFile);
  };
 

  

  return (
    <div className='modal_container'>
    <AnimatePresence>
      {isOpen && (
        <motion.div style={{position: "fixed" , zIndex:"2"}}
          initial={{ opacity: 0 , y:-50, x:-900 , width:"100%"  }}
          animate={{ opacity: 1 ,y:-70 ,x:0  }}
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
         

        <form className='modal_form_img' onSubmit={handleSubmit(onSubmit)}>

        <div className='conteiner_img_upload'>
        <h5>Avatar</h5>
            {previewUrl ? <img className="img_prev" src={previewUrl} alt="Vista previa" /> : ''}
          <br /> 
            <label className='label_img'>
              {file ? `Subir foto:${file.name}` : ''}
              <input name='avatar' id='avatar' type="file" value={file?.path} onChange={handleFileChange} 
              />
            </label>
        </div> 
          <br />
        <div className='container_label'>
          <label><input type='text'  name='name' id="name" placeholder={user.name} 
           {...register("name" , 
           {
             minLength:{ value:4 , message:"ingrese un nombre entre 4 y 11 caracteres"},
             maxLength:{value:11 , message:"ingrese un nombre entre 4 y 11 caracteres"},
             pattern:{value:regExAlpha , message:"Nombre Invalido , evite numeros o caracteres "}
            })}
            />Usuario</label>
          {errors.name && <span>{errors.name.message}</span>}
        
          <label><input type='text' id='telefono' name='telefono' placeholder={user.telefono ? user.telefono : "No agregado"}
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
          <FormRegister user={user}/>
        <hr/>
          <button className='btn_modal_close' onClick={onClose}>Cancelar</button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
    </div>
  )
}
