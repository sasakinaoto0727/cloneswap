import React from 'react';
import './TokenSelector.css';

export type Token = {
  symbol: string;
  logoUrl: string;
};

const TOKENS: Token[] = [
  { symbol: 'ETH',  logoUrl: '/token-logos/eth.svg' },
  { symbol: 'USDC', logoUrl: '/token-logos/usdc.svg' },
  { symbol: 'SOL',  logoUrl: '/token-logos/sol.svg' },
];

type Props = {
  selected: Token;
  onSelect: (token: Token) => void;
};

export default function TokenSelector({ selected, onSelect }: Props) {
  return (
    <div className="token-selector-wrapper">
      <img src={selected.logoUrl} alt={selected.symbol} className="token-logo" />
      <select
        value={selected.symbol}
        onChange={(e) => {
          const token = TOKENS.find((t) => t.symbol === e.target.value)!;
          onSelect(token);
        }}
        className="token-select"
      >
        {TOKENS.map((t) => (
          <option key={t.symbol} value={t.symbol}>
            {t.symbol}
          </option>
        ))}
      </select>
    </div>
  );
}
