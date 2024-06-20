import { motion } from 'framer-motion';
type LogoAnimationProps = {
  appendToBody?: boolean;
  width?: number;
  height?: number;
};

const LogoAnimation = ({
  appendToBody,
  width = 150,
  height = 150,
}: LogoAnimationProps) => {
  const transition = { duration: 1.2, repeat: Infinity, ease: 'easeInOut' };
  return (
    <motion.div
      initial={{ opacity: 0.8 }}
      animate={{
        opacity: 1,
        transition: {
          duration: 0,
          ease: 'easeInOut',
        },
      }}
      exit={{
        opacity: 0,
        transition: { duration: 0.4, ease: 'easeInOut' },
      }}
      className={`loading-logo ${appendToBody ? 'append-to-body' : ''}`}
    >
      <div className="logo-animation" style={{ width, height }}>
        <motion.svg
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          viewBox="440 450 480.5 460.9"
          xmlSpace="preserve"
          initial="hidden"
          animate="visible"
        >
          <path
            className="logo-st0"
            d="M845.2,904.8H512.1c-32.1,0-58.4-26.3-58.4-58.4V513.3c0-32.1,26.3-58.4,58.4-58.4h333.2
     c32.1,0,58.4,26.3,58.4,58.4v333.2C903.6,878.6,877.3,904.8,845.2,904.8z"
          />
          <g>
            <motion.polyline
              className="logo-st1"
              fill="transparent"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1, fill: '#fff', opacity: 1 }}
              transition={transition}
              points="519.4,452 519.4,841 704.8,841 704.8,522.6 561.2,625.8 561.2,798.9 830,798.9 830,609.7 
       746.6,609.7 746.6,841.8 905.8,841.8 			"
            />
          </g>
          <motion.path
            className="logo-st2"
            animate={{
              opacity: [0, 1, 0],
              transition: {
                duration: 1.2,
                repeat: Infinity,
                ease: 'easeInOut',
              },
            }}
            d="M814.6,488.1c0,0,2.1,18.5,4.6,21c2.6,2.6,13.8,4.8,13.8,4.8s-11.1,2.1-13.7,4.7c-2.6,2.6-4.7,21.5-4.7,21.5
     s-2-19.2-4.6-21.8c-2.6-2.5-13.7-4.4-13.7-4.4s11.3-1.9,13.8-4.5C812.6,506.8,814.6,488.1,814.6,488.1z"
          />
        </motion.svg>
      </div>
    </motion.div>
  );
};

export default LogoAnimation;
