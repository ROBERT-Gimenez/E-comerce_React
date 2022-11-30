import React from 'react'
import '../Login/Login.css'

export default function Login() {
  return (
    <form> 
    <div className='container'>
        <div className='login-container'>
            <label className='item1'>Sing In<input id='item-1' type="radio" name="item" className="sing-in" /></label>
            <label className='item2'>Sing Up<input id='item-2' type="radio" name="item" className="sing-up" /></label> 
           {/*  <input id="item-1" type="radio" name="item" className="sign-in" /><label for="item-1" class="item">Sign In</label>
            <input id="item-2" type="radio" name="item" className="sign-up" /><label for="item-2" class="item">Sign Up</label> */}
            <div className='login-form'>
                <div className='sing-in-htm'>
                    <div className='group'>
                        <input placeholder='Username' name="Username" id="user" type="text" className='input'/>
                    </div>
                    <div className='group'>
                        <input placeholder='Password' name="Password" id="pass" type="password" className='input' data-type="password"/>
                    </div>
                    <div className='group'>
                        <input type="submit" className='button' value="Sing In"/>
                    </div>
                    <div className='hr'></div>
                    <div className='footer-login'>
                        <a href="/">Forgot Passwor ?</a>
                    </div>
                </div>
                <div className='sing-up-htm'>
                    <div className='group'>
                        <input placeholder='Username' name='Username' id="user-register" type="text" className='input'/>
                    </div>
                    <div className='group'>
                        <input placeholder='Email adress' name="Email" id="email-register" type="text" className='input' />
                    </div>
                    <div className='group'>
                        <input placeholder='Password' name="Password" id="pass-register" type="password" className='input' datatype='password'/>
                    </div>
                    <div className='group'>
                        <input placeholder='Repeat Password' name="Password2" id="pass2-register" type="password" className='input' datatype='password'/>
                    </div>
                    <div className='group'>
                        <input  type="submit" className='button' value="Sing Up"></input>
                    </div>
                    <div className='hr'></div>
                    <div className='footer'>
                        <label>Already have an account ?</label>
                    </div>
                </div>

            </div>
        </div>
    </div>
    </form>
  )
}
