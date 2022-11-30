import React from 'react'
import '../Login/Login.css'

export default function Login() {
  return (
    <div>
        <nav className='w-full flex py-6 justify-between items-center navbar'>

        </nav>
        <form className='form-style'>
            <div className='group-input'>
            <label className='input-label'>Email Address
            <input type="text" id='name' required className='input-style'/>
            </label>
            </div>
        </form>
    </div>
  )
}
