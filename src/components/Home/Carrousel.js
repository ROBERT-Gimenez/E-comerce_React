import React from 'react'
import {Carousel} from 'react-bootstrap'
import banner1 from '../../resource/img/carrousel/Banner-1.png'
import banner2 from '../../resource/img/carrousel/Banner-2.png'
import banner3 from '../../resource/img/carrousel/Banner-3.png'
import { motion } from 'framer-motion'

export default function Carrousel() {
  let imgs = [banner1,banner2,banner3]
  return (
    <motion.div
    initial={{x:-1800 , opacity:0}}
    animate={{x:0 , opacity:2}}
    transition={{duration:2}}
    >
    <Carousel variant="transparent" className='corrousel'>
      {imgs.map((img , indx) => {
        return(
        <Carousel.Item interval={2000} key={indx}>
        <img
          className="d-block w-100  carrousel"
          src={img}
          alt="slide"
        />
        </Carousel.Item>
        )
      })}
    </Carousel>
    </motion.div>
  )
}
