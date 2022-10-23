import { useState, useEffect } from 'react';

function getWindowDimensions() {
  const { innerWidth: width } = window;
  return {
    width,
  };
}

export default function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect(() => {
    clearTimeout();
    function handleResize() {
      setTimeout(() => setWindowDimensions(getWindowDimensions()), 1000);
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
}
