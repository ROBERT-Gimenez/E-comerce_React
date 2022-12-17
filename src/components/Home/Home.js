import React from 'react'
import List from '../List/List'
import Carrousel from './Carrousel'

export default function Home() {
  return (
    <div className='conteiner-home'>
        <Carrousel/>  
        <List/>
    </div>
  )
}
