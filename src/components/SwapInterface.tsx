import React, { useState, useEffect } from 'react';
import TokenSelector, { Token } from './TokenSelector';
import './SwapInterface.css';

// ダミー残高と価格（後でAPIから取得）
const FAKE_BALANCES: Record<string, number> = { ETH: 2.5, USDC: 1000, SOL: 10 };
const FAKE_PRICES:   Record<string, number> = { ETH: 4200, USDC: 1,   SOL: 180 };

export default function SwapInterface() {
  const [fromToken, setFromToken] = useState<Token>({ symbol: 'ETH',  logoUrl: '/token-logos/eth.svg' });
  const [toToken,   setToToken]   = useState<Token>({ symbol: 'USDC', logoUrl: '/token-logos/usdc.svg' });
  const [fromValue, setFromValue] = useState<string>('');
  const [toValue,   setToValue]   = useState<string>('');

  // 残高とドル換算
  const fromBalance = FAKE_BALANCES[fromToken.symbol] || 0;
  const fromUSD     = (Number(fromValue || 0) * (FAKE_PRICES[fromToken.symbol] || 0)).toFixed(2);

  // 入力変更時にドル換算を更新
  const onFromChange = (v: string) => {
    setFromValue(v);
    // 擬似的にレート1:1と仮定
    setToValue(v);
  };

  return (
    <div className="swap-card-large">
      <h2 className="swap-title">Swap</h2>

      {/* From ボックス */}
      <div className="swap-box">
        <div className="box-header">From</div>
        <div className="box-body">
          <input
            type="number"
            className="swap-input"
            placeholder="0.0"
            value={fromValue}
            onChange={e => onFromChange(e.target.value)}
          />
          <TokenSelector selected={fromToken} onSelect={setFromToken} />
        </div>
        <div className="box-footer">
          <span className="balance">Balance: {fromBalance} {fromToken.symbol}</span>
          <span className="usd">≈ ${fromUSD}</span>
        </div>
      </div>

      {/* To ボックス */}
      <div className="swap-box">
        <div className="box-header">To</div>
        <div className="box-body">
          <input
            type="number"
            className="swap-input"
            placeholder="0.0"
            value={toValue}
            onChange={e => setToValue(e.target.value)}
          />
          <TokenSelector selected={toToken} onSelect={setToToken} />
        </div>
        <div className="box-footer">
          <span className="balance">
            Balance: {FAKE_BALANCES[toToken.symbol] || 0} {toToken.symbol}
          </span>
          <span className="usd">
            ≈ ${(Number(toValue || 0) * (FAKE_PRICES[toToken.symbol] || 0)).toFixed(2)}
          </span>
        </div>
      </div>

      <button className="swap-button-large">Swap</button>
    </div>
  );
}
