import React from 'react'
import '../Login/Login.css'

export default function Login() {
  return (
    <form> 
    <div className="container-form">
        <div className="login-container">
            <input id="item-1" type="radio" name="item" className="sign-in" checked/><label for="item-1" className="item">Sign In</label>
            <input id="item-2" type="radio" name="item" className="sign-up"/><label for="item-2" className="item">Sign Up</label>
            <div className="login-form">
                <div className="sign-in-htm">
                    <div className="group">
                        <input placeholder="Username" id="user" type="text" className="input"/>
                    </div>
                    <div className="group">
                        <input placeholder="Password" id="pass" type="password" className="input" data-type="password"/>
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
                        <input placeholder="Username" id="user" type="text" className="input"/>
                    </div>

                    <div className="group">
                        <input placeholder="Email adress" id="pass" type="text" className="input"/>
                    </div>

                    <div className="group">
                        <input placeholder="Password" id="pass" type="password" className="input" data-type="password"/>
                    </div>
                    <div className="group">
                        <input placeholder="Repeat password" id="pass" type="password" className="input" data-type="password"/>
                    </div>

                    <div className="group">
                        <input type="submit" className="button" value="Sign Up"/>
                    </div>
                    <div className="hr"></div>
                    <div className="footer">
                        <label for="item-1">Already have an account?</label>
				</div>
			</div>
		</div>
	</div>
</div>
    </form>
  )
}
