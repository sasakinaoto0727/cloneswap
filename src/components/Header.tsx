import React from 'react';
import { motion } from 'framer-motion';

export default function Header() {
  return (
    <motion.header
      className="flex justify-between items-center p-6 bg-black/50 backdrop-blur"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }} /* ヘッダーのスライドイン ([motion.dev](https://motion.dev/docs/react-animation?utm_source=chatgpt.com)) */
    >
      <div className="text-2xl font-bold">cloneswap</div>
      <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg">
        Connect Wallet
      </button>
    </motion.header>
  );
}