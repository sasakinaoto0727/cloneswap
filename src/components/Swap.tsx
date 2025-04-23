import React, { useState } from 'react';
import './Swap.css';

const Swap: React.FC = () => {
  const [sellAmount, setSellAmount] = useState('');
  const [buyAmount, setBuyAmount] = useState('');

  const handlePercentageClick = (percentage: number) => {
    // ここに資産総量の計算ロジックを実装
    // 例：資産総量が100の場合
    const totalAsset = 100;
    setSellAmount((totalAsset * percentage).toString());
  };

  return (
    <div className="swap-container">
      <h2>売却</h2>
      <input
        type="number"
        value={sellAmount}
        onChange={(e) => setSellAmount(e.target.value)}
        placeholder="売却額"
      />
      <button onClick={() => handlePercentageClick(0.25)}>25%</button>
      <button onClick={() => handlePercentageClick(0.5)}>50%</button>
      <button onClick={() => handlePercentageClick(0.75)}>75%</button>
      <button onClick={() => handlePercentageClick(1)}>最大</button>

      <h2>購入</h2>
      <input
        type="number"
        value={buyAmount}
        onChange={(e) => setBuyAmount(e.target.value)}
        placeholder="購入額"
      />
    </div>
  );
};

export default Swap;
