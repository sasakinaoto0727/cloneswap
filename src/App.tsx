import React from 'react';
import Header from './components/Header';
import Swap from './components/Swap';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center">
        <Swap />
      </main>
    </div>
  );
}