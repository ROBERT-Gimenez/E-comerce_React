import React from 'react'
import '../Login/Login.css'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'



   
  
export default function Login() {

    
    const history = useNavigate();
    
    const verifique = (e) => {
        const email =e.target.value;
        console.log(email)
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
    const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const regexEmail =/^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
     if(email === "" || password === ""){
        alert("Los campos no pueden estart vacios")
        return;
        }
    if(email !== '' && !regexEmail.test(email)){
        alert("Ingrese un email valido")
        }
    
    /* if(email !== 'challenge@alkemy.org' || password !== 'react'){
        alert("Credenciales Invalidas")
        } */
        console.log("consulta")    
        axios.post('http://localhost:4000/api/user/login' , {email,password})
        .then(res => {
            console.log(res.data.data.name)
        alert("Perfecto,Ingresaste Correctamente")
        /*const tokenAdquirido = res.data.token;
        localStorage.setItem('token' , tokenAdquirido); */// localStorage.getItem('token')
       //redireccionamos la pagina con useNavigate
        }).catch((err) => { console.log(err)})
    
             
        }
    const submitCreate = (e) => {
    e.preventDefault();
    const name = document.querySelector("#name").value;
    const email = document.querySelector("#email_sing_up").value;
    const password = document.querySelector("#pass_sing_up1").value;
    const password2 = document.querySelector("#pass_sing_up2").value;
    const rol_id = 1;
    console.log(name)
    console.log(email)
    console.log(password)
    console.log(password2)
    const regexEmail =/^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
     if(email === "" || password === ""){
        alert("Los campos no pueden estart vacios")
        return;
        }
    if(email !== '' && !regexEmail.test(email)){
        alert("Ingrese un email valido caca")
        }
            
    axios.post('http://localhost:4000/api/user/create' , {name,email,password,rol_id})
        .then(res => {
        alert("Usuario Creado Correctamente")
        const tokenAdquirido = res.data.token;
        localStorage.setItem('token' , tokenAdquirido);// localStorage.getItem('token')
        window.location.reload()//redireccionamos la pagina con useNavigate
        }).catch((err) => { console.log(err)})
    
             
        }


    
  return (
    <>
    <div className="container-form">
    <div className="login-container">
            <input id="item-1" type="radio" name="item"  className="sign-in" defaultChecked={true}/><label htmlFor="item-1" className="item">Sign In</label>
            <input id="item-2" type="radio" name="item"  className="sign-up"/><label htmlFor="item-2" className="item">Sign Up</label>
    <form className='body-login'  onSubmit={handleSubmit} > 
            <div className="login-form">
                <div className="sign-in-htm">
                    <div className="group">
                        <input  placeholder="Username" id="email " name="email" type="email" className="input"/>
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
            </div>
                </form>
                <form onSubmit={submitCreate} className='sign-up-form'>
                <div className="login-form">   
                 <div className="sign-up-htm">
                    <div className="group">
                        <input placeholder="Username" name='name' id="name" type="text" className="input"/>
                    </div>

                    <div className="group">
                        <input onKeyDown={verifique} placeholder="Email adress" id="email_sing_up" type="email" className="input"/>
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
