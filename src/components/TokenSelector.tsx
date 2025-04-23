// TokenSelector.jsx

import React, { useState } from 'react';
import './TokenSelector.css';

const mockTokens = [
  { id: 'eth', symbol: 'ETH', name: 'Ethereum', logoUrl: '/token-logos/eth.svg' },
  { id: 'usdc', symbol: 'USDC', name: 'USD Coin', logoUrl: '/token-logos/usdc.svg' },
  { id: 'sol', symbol: 'SOL', name: 'Solana', logoUrl: '/token-logos/sol.svg' },
  // 他のトークンを追加
];

function TokenSelector({ selectedToken, onTokenSelect }) {
  const [isOpen, setIsOpen] = useState(false);
  
  const handleSelectToken = (token) => {
    onTokenSelect(token);
    setIsOpen(false);
  };
  
  return (
    <div className="token-selector">
      {selectedToken ? (
        <button 
          className="token-selector-button" 
          onClick={() => setIsOpen(true)}
        >
          <img 
            src={selectedToken.logoUrl} 
            alt={selectedToken.symbol} 
            className="token-logo"
          />
          <span className="token-symbol">{selectedToken.symbol}</span>
          <span className="dropdown-icon">▼</span>
        </button>
      ) : (
        <button 
          className="token-selector-button" 
          onClick={() => setIsOpen(true)}
        >
          <span>トークンを選択</span>
          <span className="dropdown-icon">▼</span>
        </button>
      )}
      
      {isOpen && (
        <div className="token-selector-modal">
          <div className="token-selector-header">
            <h3>トークンを選択</h3>
            <button 
              className="close-button"
              onClick={() => setIsOpen(false)}
            >
              ✕
            </button>
          </div>
          
          <input 
            type="text"
            placeholder="トークン名を検索"
            className="token-search-input"
          />
          
          <div className="token-list">
            {mockTokens.map(token => (
              <div 
                key={token.id}
                className="token-item"
                onClick={() => handleSelectToken(token)}
              >
                <img 
                  src={token.logoUrl} 
                  alt={token.symbol} 
                  className="token-logo"
                />
                <div className="token-info">
                  <span className="token-symbol">{token.symbol}</span>
                  <span className="token-name">{token.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default TokenSelector;
