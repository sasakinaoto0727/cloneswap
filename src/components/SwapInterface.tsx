import React, { useState } from 'react';
import { motion } from 'framer-motion';
import TokenSelector from './TokenSelector';
import './SwapInterface.css';

export default function SwapInterface() {
  const [step, setStep] = useState(0);

  const next = () => setStep(prev => Math.min(prev + 1, 2));

  return (
    <div className="swap-card p-6 bg-black/70 rounded-2xl backdrop-blur-lg">
      {step === 0 && (
        <motion.div initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.5 }}>
          <button onClick={next} className="proceed-button">Start Swap</button>
        </motion.div>
      )}
      {step >= 1 && (
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.2 }}>
          <TokenSelector />
        </motion.div>
      )}
      {step === 2 && (
        <motion.button onClick={next} className="swap-confirm-button" whileTap={{ scale: 0.95 }}>
          Confirm Swap
        </motion.button>
      )}
    </div>
  );
}