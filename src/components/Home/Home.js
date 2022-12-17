import React from 'react'
import List from '../List/List'
import Carrousel from './Carrousel'
import Prueba from './Prueba'

export default function Home() {
  return (
    <div className='conteiner-home'>
        <Carrousel/> 
       {/*  <Prueba/> */}
        <List/>
    </div>
  )
}
