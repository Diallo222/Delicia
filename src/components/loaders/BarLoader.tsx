import { motion } from "motion/react";

interface BarLoaderProps {
  placeholder?: string;
}

const BarLoader = ({ placeholder = "Loading…" }: BarLoaderProps) => {
  return (
    <div className="flex flex-col items-center justify-center gap-6 py-20">
      <div className="flex h-16 items-end gap-1.5">
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.span
            key={i}
            className="w-2 origin-bottom bg-amber"
            animate={{ scaleY: [0.35, 1, 0.35] }}
            transition={{
              duration: 0.9,
              repeat: Infinity,
              delay: i * 0.1,
              ease: "easeInOut",
            }}
            style={{ height: "100%" }}
          />
        ))}
      </div>
      <p className="font-body text-sm uppercase tracking-[0.25em] text-muted">
        {placeholder}
      </p>
    </div>
  );
};

export default BarLoader;
