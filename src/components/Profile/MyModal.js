import {useState } from 'react'
import { AnimatePresence, motion } from "framer-motion";
import { useForm } from 'react-hook-form'
import FormRegister from './FormRegister';
import useAxiosPost from '../../hooks/useAxiosPut';
import Loader from '../Loader';

export default function MyModal({ isOpen, onClose , user }) {


  const {register, formState:{errors} , handleSubmit } = useForm();
  
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loader, setLoader] = useState(false);
  
  const regExAlpha = /^[a-zA-Z\sñáéíóúü ]*$/;
  const [response, error, isLoading, setUrl , setPostData]  = useAxiosPost();
  
  const submitForm = (data) => {
    console.log(data)
      data.avatar = file
      const formData = new FormData();
      formData.append('avatar', file);
      formData.append('name', data.name);
      formData.append('telefono', data.telefono); 
      formData.append('provincia', data.provincia); 
      formData.append('localidad', data.localidad); 
      formData.append('direccion', data.direccion); 
      formData.append('altura', data.altura); 
      setUrl(() => (`http://localhost:4000/api/user/edit/${user.id}`))
      setPostData(formData)
      setLoader(true)
       setInterval(function(){
        window.location.reload();
    }, 3000);
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
        <motion.div style={{position: "absolute" , zIndex:"2"}}
          initial={{ opacity: 0 , y:-50, x:-900 , width:"70%"  }}
          animate={{ opacity: 1 ,y:20 ,x:0  }}
          exit={{ opacity: 0 , x:-900 }}
          transition={{duration:1 , delay:0.3}}
          className="modal-overlay"
          onClick={onClose}
        >
          <motion.div
            initial={{ x:-900  }}
            animate={{ opacity: 1 , x: 0 }}
            exit={{ opacity: 0,  x:-900 , transition:{duration:1} }}
            className="modal-container"
            onClick={(e) => e.stopPropagation()}
          >
            <h4>Editar Datos</h4>
         
        {loader && <Loader/>}
        <form className='modal_form_img' onSubmit={handleSubmit(submitForm)}>

        <div className='container_label'
        onClick={()=> {console.log(isLoading)}}
        >
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
          <label><input type='text'  name='name' id="name" placeholder={user.name} 
           {...register("name" , 
           {
             minLength:{ value:4 , message:"ingrese un nombre entre 4 y 15 caracteres"},
             maxLength:{value:15 , message:"ingrese un nombre entre 4 y 15 caracteres"},
             pattern:{value:regExAlpha , message:"Nombre Invalido , evite numeros o caracteres "}
            })}
            />Usuario</label>
          {errors.name && <span>{errors.name.message}</span>}
        
          <label><input type='text' id='telefono' name='telefono' placeholder={user.telefono ? user.telefono : "No agregado"}
           {...register("telefono" , 
           {
             minLength:{ value:8 , message:"ingrese un nombre entre 8 y 13 caracteres"},
             maxLength:{value:13 , message:"ingrese un nombre entre 8 y 13 caracteres"},
            })}
            />telefono</label>
            {errors.telefono && <span>{errors.telefono.message}</span>}
          <hr/>         
        </div>  
          <FormRegister user={user} register={register} errors={errors}/>
          <button >Guardar</button>
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
