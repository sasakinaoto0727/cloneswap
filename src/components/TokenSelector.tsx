import React from 'react';
import { motion } from 'framer-motion';
import './TokenSelector.css';

export default function TokenSelector() {
  const tokens = ['ETH', 'DAI', 'USDC'];
  return (
    <div>
      {tokens.map(symbol => (
        <motion.div key={symbol} className="token-item" whileHover={{ scale: 1.02 }}>
          <img src={`/token-logos/${symbol.toLowerCase()}.svg`} className="token-logo" alt={symbol} />
          <span className="token-symbol">{symbol}</span>
        </motion.div>
      ))}
    </div>
  );
}