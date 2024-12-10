import { useEffect, useRef } from 'react';

export default function Vanta() {
  const vantaRef = useRef(null);

  useEffect(() => {
    let vantaEffect = null;

    const loadVanta = async () => {
      const VANTA = await import('vanta/dist/vanta.net.min');
      const THREE = await import('three');
      vantaEffect = VANTA.default({
        el: vantaRef.current,
        THREE: THREE,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        waveHeight: 20,
        waveSpeed: 1,
        zoom: 1.0,
        color: 0x19d4d4, // Set the color of the waves// Set the color of the waves
            backgroundColor: 0x50f31, // Set the background color
      });
    };

    loadVanta();

    return () => {
      if (vantaEffect) vantaEffect.destroy(); // Clean up effect on unmount
    };
  }, []);

  return (
    <div ref={vantaRef} style={{ height: '100vh', width: '100%' }}>
      <div style={{ position: 'relative', zIndex: 1, color: 'white', padding: '20px' }}>
        <h1>Welcome to My Next.js App</h1>
        <p>Vanta.js makes it look awesome!</p>
      </div>
    </div>
  );
}
