import React, { useState } from 'react';
import Loader from './components/Loader';
import Header from './components/Header';
import SwapInterface from './components/SwapInterface';
import { StaggeredContainer } from './components/Animations';
import './index.css';

export default function App() {
  const [loading, setLoading] = useState(true);

  return (
    <>  
      {loading && <Loader onFinish={() => setLoading(false)} />}
      {!loading && (
        <div className="pt-20">  {/* Header 固定分を考慮 */}
          <Header />
          <div className="max-w-xl mx-auto mt-12 space-y-8">
            <StaggeredContainer>
              <SwapInterface />
            </StaggeredContainer>
          </div>
        </div>
      )}
    </>
  );
}