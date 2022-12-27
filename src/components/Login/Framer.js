/* import { motion } from "framer-motion";

const Frameer = ({ title, image, description }) => (
  <motion.div
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
    className="card"
  >
    <h3>{title}</h3>
    <img src={image} alt={title} />
    <p>{description}</p>
  </motion.div>
);
export default Frameer; */
import React from "react";
import { motion } from "framer-motion";


export default function Frameer() {
  const [isActive, setIsActive] = React.useState(false);
  return (
    <motion.div
        style={{color:"white"}}
      className="block"
      onClick={() => setIsActive(!isActive)}
      animate={{
        rotate: isActive ? 180 : 360
      }}
    >
      Hello Framer motion
    </motion.div>
  );
}