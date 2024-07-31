import React from "react";
import { motion } from "framer-motion";

interface BarLoaderProps {
  placeholder?: string;
}

const variants = {
  initial: {
    scaleY: 0.5,
    opacity: 0,
  },
  animate: {
    scaleY: 1,
    opacity: 1,
    transition: {
      repeat: Infinity,
      repeatType: "mirror",
      duration: 1,
      ease: "circIn",
    },
  },
};

const style = "h-10 w-3 bg-amber-400";

const BarLoader: React.FC<BarLoaderProps> = ({placeholder}) => {
  return (
    <div className="flex flex-col items-center space-y-4">
      <motion.div
        transition={{
          staggerChildren: 0.25,
        }}
        initial="initial"
        animate="animate"
        className="flex gap-1"
      >
        <motion.div variants={variants} className={style} />
        <motion.div variants={variants} className={style} />
        <motion.div variants={variants} className={style} />
        <motion.div variants={variants} className={style} />
        <motion.div variants={variants} className={style} />
      </motion.div>

      {placeholder && <p className="text-amber-400 text-3xl">{placeholder}</p>}
    </div>
  );
};

export default BarLoader;
