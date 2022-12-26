import {useRef , useState} from 'react'
import { useForm } from 'react-hook-form' 
import '../Login/Login.css'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import Register from './Register'



   
  
export default function Login() {
    const [verMail , setMail] = useState(null);
    const {register, formState:{errors} , watch , handleSubmit } = useForm();
    const history = useNavigate();
    const regexEmail =/^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
  

    const verifique = (e) => {
        e.target.addEventListener('blur' , () => {
            const email =e.target.value
            
        
        fetch('http://localhost:4000/api/user')
        .then(response => response.json())
        .then(result => {
            const dats = result.data
            const mail = dats.filter((element) => { 
            return element.email === email ?  true : false })
            
            mail.length > 0 ? setMail(true) : setMail(false)
                                     
        })
        .catch(err =>{console.log(err)})

    })
    
    }
   
    const SubmitLogin = (data) => {
    const email =data.email
    const password =data.password

        axios.post('http://localhost:4000/api/user/login' , {email,password})
        .then(res => {
            console.log(res)
            let error = res?.data?.errors?.[0].msg
            let userin = res?.data?.data?.user?.name
            console.log(error)
            userin && alert("Perfecto,Ingresaste Correctamente")
            error && alert("Datos erroneos")
            const tokenAdquirido = userin
            localStorage.setItem('token' , tokenAdquirido); // localStorage.getItem('token')
        //redireccionamos la pagina con useNavigate
/*         userin && history("/")
 */        }).catch((err) => { 
            const error = err.response?.data?.message
            alert(error)
            
        })
    
             
        }

        let contr = watch("pass_sing_up1");

    
        
    
  return (
    <>
    <div className="container-form">
    <div className="login-container">
            <input id="item-1" type="radio" name="item"  className="sign-in" defaultChecked={true}/><label htmlFor="item-1" className="item">Sign In</label>
            <input id="item-2" type="radio" name="item"  className="sign-up"/><label htmlFor="item-2" className="item">Sign Up</label>
    <form className='body-login'  onSubmit={handleSubmit(SubmitLogin)} > 
            <div className="login-form">
                <div className="sign-in-htm">
                    <div className="group">

                        <input placeholder="Enter your Email" required  onClick={verifique} id="email " name="email" type="email" className="input" 
                         {...register("email" , 
                         {
                          minLength:{ value:4 , message:"ingrese un nombre entre 4 y 11 caracteres"},
                          pattern :{value:regexEmail , message:"Formato invalido"}
                      })}
                        />
                       {errors.email && <span>{errors.email.message}</span>}
                        {!verMail && <span>Email no Registrado</span>} 

                    </div>
                    <div className="group">

                        <input placeholder="Password" id="pass" name='password' type="password" className="input" data-type="password"
                         {...register("password" , 
                         {
                            minLength:{value:7 , message:"ingrese una contraseña de entre 8 y 12 caracteres"},
                      })}
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
    <Register/>
	</div>
    </div>
    </>
  )
}
