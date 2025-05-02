import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

console.log("🌱 main.tsx loaded");

const rootElement = document.getElementById('root');
console.log("🔍 rootElement:", rootElement);

if (!rootElement) {
  throw new Error('Root element not found');
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// main.tsx
function Root() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading && <Loader onFinish={() => setLoading(false)} />}
      {!loading && <App />}
    </>
  );
}


console.log("✅ ReactDOM rendered App");
