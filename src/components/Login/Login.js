import React from 'react'
import '../Login/Login.css'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'



   
  
export default function Login() {

    
    const history = useNavigate();
    
    
    const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    
    const regexEmail =/^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    /* if(email === "" || password === ""){
        swal(<h2>Los campos no pueden estart vacios</h2>)
        return;
        }
    if(email !== '' && !regexEmail.test(email)){
        swal(<h2>Ingrese un email valido</h2>)
        }
    
    if(email !== 'challenge@alkemy.org' || password !== 'react'){
        swal(<h2>Credenciales Invalidas</h2>)
        }
            
    axios.post('http://challenge-react.alkemy.org' , {email,password})
        .then(res => {
        swal(<h2>Perfecto,Ingresaste Correctamente</h2>)
        const tokenAdquirido = res.data.token;
        localStorage.setItem('token' , tokenAdquirido);// localStorage.getItem('token')
        history("/");//redireccionamos la pagina con useNavigate
        }).catch((err) => { console.log(err)})
    
             */
        }
    
  return (
    <>
    <div className="container-form">
    <div className="login-container">
    <form className='body-login' onSubmit={handleSubmit} > 
            <input id="item-1" type="radio" name="item" className="sign-in" defaultChecked={true}/><label htmlFor="item-1" className="item">Sign In</label>
            <input id="item-2" type="radio" name="item" className="sign-up"/><label htmlFor="item-2" className="item">Sign Up</label>
            <div className="login-form">
                <div className="sign-in-htm">
                    <div className="group">
                        <input placeholder="Username" id="user" name='email' type="email" className="input"/>
                    </div>
                    <div className="group">
                        <input placeholder="Password" id="pass" name='password' type="password" className="input" data-type="password"/>
                    </div>

                    <div className="group">
                        <input type="submit" className="button" value="Sign In"/>
                    </div>
                    <div className="hr"></div>
                    <div className="footer">
                        <a href="#forgot">Forgot Password?</a>
                    </div>
                </div>
            
                <div className="sign-up-htm">
                    <div className="group">
                        <input placeholder="Username" id="user_sing_up" type="text" className="input"/>
                    </div>

                    <div className="group">
                        <input placeholder="Email adress" id="pass_sing_up" type="text" className="input"/>
                    </div>

                    <div className="group">
                        <input placeholder="Password" id="pass_sing_up1" type="password" className="input" data-type="password"/>
                    </div>
                    <div className="group">
                        <input placeholder="Repeat password" id="pass_sing_up2" type="password" className="input" data-type="password"/>
                    </div>

                    <div className="group">
                        <input type="submit" className="button" value="Sign Up"/>
                    </div>
                    <div className="hr"></div>
                    <div className="footer">
                        <label htmlFor="item-1">Already have an account?</label>
				</div>
			</div>
		</div>
    </form>
	</div>
    </div>
    </>
  )
}
