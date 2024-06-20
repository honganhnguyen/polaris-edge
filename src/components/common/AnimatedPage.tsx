import { MOTION_VARIANTS } from 'utils/contants';
import { motion } from 'framer-motion';

export default function AnimatedPage({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={MOTION_VARIANTS}
    >
      {children}
    </motion.div>
  );
}
