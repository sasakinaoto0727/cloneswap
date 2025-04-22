import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Loader from './components/Loader';
import './index.css';

function Root() {
  const [loading, setLoading] = useState(true);
  return (
    <>
      {loading && <Loader onFinish={() => setLoading(false)} />}
      {!loading && <App />}
    </>
  );
}

const root = document.getElementById('root');
if (!root) throw new Error('Root element not found');
ReactDOM.createRoot(root).render(<Root />);