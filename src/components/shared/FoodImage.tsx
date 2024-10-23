import React from "react";
import { motion } from "framer-motion";
interface FoodImageProps {
  image: string;
}
const FoodImage: React.FC<FoodImageProps> = ({ image }) => {
  return (
    <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="w-full h-full flex justify-center items-center ">
    <div className="bg-amber-500 pb-20 md:px-0 md:pb-12 rounded-t-full absolute bottom-0  ">
    <img src={image} className="w-[300px] h-[300px] md:w-[420px] md:h-[420px] object-contain" />
  </div>
  </motion.div>
  );
};

export default FoodImage;
