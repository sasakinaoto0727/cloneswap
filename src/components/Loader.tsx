import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Loader({ onFinish }: { onFinish: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onFinish, 2000);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black flex items-center justify-center z-50"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
      >
        <motion.img
          src="/bg-pattern.png"
          alt="logo"
          className="w-32 h-32"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        />
      </motion.div>
    </AnimatePresence>
  );
}