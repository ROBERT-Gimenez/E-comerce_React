import {useRef} from 'react'
import { useForm } from 'react-hook-form' 
import '../Login/Login.css'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'



   
  
export default function Login() {

    const {register, formState:{errors} , watch , handleSubmit } = useForm();
    const history = useNavigate();
    const regexEmail =/^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const regExAlpha = /^[a-zA-Z\sñáéíóúü ]*$/;
    console.log(useForm())
    const verifique = (e) => {
        const email =e.target.value;
        console.log(watch("pass_sing_up2"))
        fetch('http://localhost:4000/api/user')
        .then(response => response.json())
        .then(result => {
            console.log(result.data) 
            result.data.forEach(element => {
                if(email === element.email){
                    alert("email ya registrado")
                    }
                   
                
            });
        })
    }
    const SubmitLogin = (e) => {
    e.preventDefault()
    const email =e.target.email.value;
    const password =e.target.password.value;
    console.log(email)
    console.log(password)
        axios.post('http://localhost:4000/api/user/login' , {email,password})
        .then(res => {
            console.log(res)
            let error = res?.data?.errors?.[0].msg;
            let userin = res?.data?.data?.name;
            userin && alert("Perfecto,Ingresaste Correctamente")
            error && alert("Datos erroneos")
            const tokenAdquirido = userin;
            localStorage.setItem('token' , tokenAdquirido); // localStorage.getItem('token')
        //redireccionamos la pagina con useNavigate
        userin && history("/")
        }).catch((err) => { console.log(err)})
    
             
        }
    const submitCreate = (data) => {
    console.log(data)
    const name = document.querySelector("#name").value;
    const email = document.querySelector("#email_sing_up").value;
    const password = document.querySelector("#pass_sing_up1").value;
    const password2 = document.querySelector("#pass_sing_up2").value;
    const rol_id = 1;
    const regexEmail =/^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
     if(email === "" || password === ""){
        alert("Los campos no pueden estart vacios")
        return;
        }
    if(email !== '' && !regexEmail.test(email)){
        alert("Ingrese un email valido caca")
        }
   /*          
    axios.post('http://localhost:4000/api/user/create' , {name,email,password,rol_id})
        .then(res => {
        alert("Usuario Creado Correctamente")
        window.location.reload()//redireccionamos la pagina con useNavigate
        }).catch((err) => { console.log(err)}) */
    
             
        }

        let contr = watch("pass_sing_up1");

    
        
    
  return (
    <>
    <div className="container-form">
    <div className="login-container">
            <input id="item-1" type="radio" name="item"  className="sign-in" defaultChecked={true}/><label htmlFor="item-1" className="item">Sign In</label>
            <input id="item-2" type="radio" name="item"  className="sign-up"/><label htmlFor="item-2" className="item">Sign Up</label>
    <form className='body-login'  onSubmit={SubmitLogin} > 
            <div className="login-form">
                <div className="sign-in-htm">
                    <div className="group">
                        <input  placeholder="Username" id="email " name="email" type="email" className="input" 
                        {...register('email' , {
                            required : { value:true , message:"Campo Requerido"} ,
                            pattern : { value: regexEmail , message :"Formato incorrecto"}})}
                        />
                        {errors.email && <span>{errors.email.message}</span>}
                    </div>
                    <div className="group">
                        <input placeholder="Password" id="pass" name='password' type="password" className="input" data-type="password"
                        {...register('password' , { required : { value:true , message:"ingrese una Contraseña"}})}
                        />
                        {errors.password && <span>{errors.password.message}</span>}

                    </div>
                    <label><input type="checkbox" name="recordar" id="recordar"/> Recordarme</label>
                    <br/>
                    <br/>
                    <div className="group">
                        <input type="submit" className="button" value="Sign In"/>
                    </div>
                    <div className="hr"></div>
                    <div className="footer">
                        <a href="#forgot">Forgot Password?</a>
                    </div>
                </div>
            </div>
                </form>
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
                        <input onKeyDown={verifique} required placeholder="Email adress" name='email_sing_up' id="email_sing_up" type="email" className="input"
                        {...register("email_sing_up" , {
                            pattern : { value: regexEmail , message:"Formato de Email invalido"}
                        })}
                        />
                        {errors.email_sing_up && <span>{errors.email_sing_up.message}</span>}
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
	</div>
    </div>
    </>
  )
}
