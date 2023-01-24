import { motion } from "framer-motion";

const variants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 }
    }
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 }
    }
  }
};
const zIndex = (name) => name == "list_burger_categori" ? 4 : 0;
const colors = ["#FF008C", "#D309E1", "#9C1AFF", "#7700FF", "#4400FF"];

export const MenuItem = ({ i , icon , context }) => {
  const style = { borderBottom: `2px solid ${colors[i]}` };
  const styleIcon = { border: `2px solid ${colors[i]}` };
  return (
    <motion.li
      variants={variants}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      style={{zIndex:zIndex(context.props.clas)}}
    >
      <div className="icon-placeholder" style={styleIcon} >{icon}</div>
      <div className="text-placeholder" style={style} >{context}</div>
    </motion.li>
  );
};
