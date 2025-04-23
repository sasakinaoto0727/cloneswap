import { ReactNode } from 'react';
import { motion } from 'framer-motion';

// 子要素を順々に出すコンテナ
export const StaggeredContainer = ({ children }: { children: ReactNode }) => {
  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.3 } }
  };
  const item = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } }
  };

  return (
    <motion.div variants={container} initial="hidden" animate="visible">
      {React.Children.map(children, child => (
        <motion.div variants={item}>{child}</motion.div>
      ))}
    </motion.div>
  );
};