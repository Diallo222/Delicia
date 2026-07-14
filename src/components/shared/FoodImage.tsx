import { motion } from "motion/react";

interface FoodImageProps {
  image: string;
  className?: string;
}

const FoodImage = ({ image, className = "" }: FoodImageProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`overflow-hidden ${className}`}
    >
      <img
        src={image}
        alt=""
        className="h-full w-full object-cover opacity-80"
      />
    </motion.div>
  );
};

export default FoodImage;
