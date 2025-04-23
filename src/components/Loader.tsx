// src/components/Loader.tsx
import React, { useEffect } from 'react';

type LoaderProps = {
  onFinish: () => void;
};

const Loader: React.FC<LoaderProps> = ({ onFinish }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 2000); // 2秒後にロード終了
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="flex items-center justify-center h-screen bg-black text-white text-xl">
      Loading...
    </div>
  );
};

export default Loader;
