import { ReactNode } from 'react';
import { HTMLMotionProps, motion } from 'framer-motion';

const motionItem = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 },
};

type MotionCardProps = {
  index: number;
  children: ReactNode;
} & HTMLMotionProps<'div'>;

export default function MotionCard(props: MotionCardProps) {
  const { index, children, ...otherProps } = props;
  return (
    <motion.div
      variants={motionItem}
      initial='initial'
      animate='animate'
      exit='exit'
      transition={{
        duration: 0.5,
        ease: 'easeInOut',
        delay: index * 0.25,
      }}
      {...otherProps}
    >
      {children}
    </motion.div>
  );
}
