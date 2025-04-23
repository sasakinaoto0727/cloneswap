import React from 'react';
import { motion } from 'framer-motion';
import ConnectPhantom from './ConnectPhantom';
import './Header.css';

const headerVariants = {
  hidden: { y: -20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.6 } }
};

export default function Header() {
  return (
    <motion.header
      className="fixed top-0 left-0 right-0 flex justify-between items-center p-4 bg-black/50 backdrop-blur"
      variants={headerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="text-2xl font-bold text-white">cloneswap</div>
      <div className="wallet-button-container">
        <ConnectPhantom />
      </div>
    </motion.header>
  );
}