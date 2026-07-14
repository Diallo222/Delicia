import { motion } from "motion/react";
import { useTransitionNavigate } from "../transition";

interface NavButtonProps {
  image: string;
  text: string;
  path: string;
}

const NavButton = ({ image, text, path }: NavButtonProps) => {
  const navigate = useTransitionNavigate();

  return (
    <motion.button
      type="button"
      data-cursor-hover
      onClick={() => navigate(path)}
      whileHover={{ x: 6 }}
      className="flex items-center gap-3 text-left"
    >
      <img
        src={image}
        alt=""
        className="h-14 w-14 object-cover border border-ink/20"
      />
      <span className="font-display text-xl font-bold text-ink hover:text-amber transition-colors">
        {text}
      </span>
    </motion.button>
  );
};

export default NavButton;
