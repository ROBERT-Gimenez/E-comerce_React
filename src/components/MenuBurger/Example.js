import * as React from "react";
import { useRef } from "react";
import { motion, useCycle } from "framer-motion";
import { useDimensions } from "./useDimensions";
import { MenuToggle } from "./MenuToggle";
import "./Burguerstyle.css"

const sidebar = {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
    transition: {
      type: "spring",
      stiffness: 20,
      restDelta: 2
    }
  }),
  closed: {
    clipPath: "circle(21px at 262px 41px)",
    transition: {
      delay: 0.2,
      type: "spring",
      stiffness: 400,
      damping: 40
    }
  }
};

export const Example = () => {
  const [isOpen, toggleOpen] = useCycle(false, true);
  const containerRef = useRef(null);
  const { height } = useDimensions(containerRef);

  return (
    <motion.div
    className="Burger_Menu"
    initial={false}
    custom={height}
    animate={isOpen ? "open" : "closed"}
    ref={containerRef}
    >
    <MenuToggle toggle={() => toggleOpen()} />
    <motion.nav className={isOpen ? "nav_open" : "nav_close"}>
      <motion.div className="background" variants={sidebar} />
        <p>MENU</p>
        <p>MENU</p>
        <p>MENU</p>
    </motion.nav>
    </motion.div>
  );
};
