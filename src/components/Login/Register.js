import React from 'react'
import {useRef , useState} from 'react'
import { useForm } from 'react-hook-form' 
import './Login.css'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'


export default function Register() {
   
  
    const [errEmail , setErrEmail] = useState(null);
    const [errPassword , setErrPassword] = useState("");
    const {register, formState:{errors} , watch , handleSubmit } = useForm();
    const history = useNavigate();
    const regexEmail =/^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const regExAlpha = /^[a-zA-Z\sñáéíóúü ]*$/;

  

    const verifique = (e) => {
        const email =e.target.value;
         //console.log(watch("pass_sing_up2"))
        fetch('http://localhost:4000/api/user')
        .then(response => response.json())
        .then(result => {
            const dats = result.data
            const mail = dats.filter((element) => { 
            return element.email === email ?  true : false })

                if(mail.length > 0){
                    setErrEmail(true)
                    /* alert("email ya registrado") */
                    }else{
                    setErrEmail(false)
                    }
                   
                
            })
        }
    const submitCreate = (data) => {
    console.log(data)
    const name = data.name;
    const email = data.email_sing_up;
    const password = data.pass_sing_up1;
    const rol_id = 1;
    if(errEmail){

    axios.post('http://localhost:4000/api/user/create' , {name,email,password,rol_id})
    .then(res => {
        console.log(res)
        let error = res?.data?.errors?.[0].msg;
        let userin = res?.data?.name;
        userin && alert("perfil creado ")
        error && alert("Datos erroneos")
        console.log(userin)
    //redireccionamos la pagina con useNavigate
        window.location.reload()
        }).catch((err) => { console.log(err)})
        }else{
          alert("email ya registrado")  
        }
    }

        let contr = watch("pass_sing_up1");


  return (
    <>

                <form onSubmit={handleSubmit(submitCreate)} className='sign-up-form'>
                <div className="login-form">   
                 <div className="sign-up-htm">
                    <div className="group">

                        <input placeholder="Username" required name='name' id="name" type="text" className="input"
                        {...register("name" , 
                        {
                         minLength:{ value:4 , message:"ingrese un nombre entre 4 y 11 caracteres"},
                        maxLength:{value:11 , message:"ingrese un nombre entre 4 y 11 caracteres"},
                        pattern:{value:regExAlpha , message:"Nombre Invalido , evite numeros o caracteres "}
                     })}
                        />
                    {errors.name && <span>{errors.name.message}</span>}
                    </div>

                    <div className="group">
                        <input  onKeyUp={verifique} required placeholder="Email adress" name='email_sing_up' id="email_sing_up" type="email" className="input"
                        {...register("email_sing_up" , {
                            pattern : { value: regexEmail , message:"Formato de Email invalido"}
                        })}
                        />
                        {errors.email_sing_up && <span>{errors.email_sing_up.message}</span>}
                        {errEmail && <span>Email ya Registrado</span>}
                    </div>

                    <div className="group">
                        <input placeholder="Password" required id="pass_sing_up1" type="password" className="input" data-type="password" 
                        {...register("pass_sing_up1" , {
                            minLength:{value:8 , message:"ingrese una contraseña de entre 8 y 12 caracteres"},
                            maxLength:{value:12 , message:"ingrese una contraseña de entre 8 y 12 caracteres"}

                        })}
                        />
                        {errors.pass_sing_up1 && <span>{errors.pass_sing_up1.message}</span>}
                    </div>
                    <div className="group">
                        <input placeholder="Repeat password"  id="pass_sing_up2" type="password" className="input" data-type="password"
                         {...register("pass_sing_up2" , {
                            validate: value =>
                            value === contr ? true : "Las contraseñas no coinciden"
                        })} 
                
                        />
                        {errors.pass_sing_up2 && <span>{errors.pass_sing_up2.message}</span>}
                    </div>

                    <div className="group">
                        <input type="submit" className="button" value="Sign Up"/>
                    </div>
                    <div className="hr"></div>
                    <div className="footer">
                        <label className='label' htmlFor="item-1">Already have an account?</label>
				</div>
			</div> 
            </div> 
        </form>
    </>
  
   
  )
}

