import React from 'react'
import '../Login/Login.css'

export default function Login() {
  return (
    <div>
        <form>
            <div className='group-input'>
            <input type="text" id='name' required className='input-style'/>
            <label for="name" className='input-label'>Email Address</label>
            </div>
        </form>
    </div>
  )
}
