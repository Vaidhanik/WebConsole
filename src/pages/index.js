import { useEffect, useRef,useState } from 'react';
import Head from 'next/head';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { effect } from 'zod';
export default function Home() {

  const router = useRouter();
  const [vantaEffect, setVantaEffect] = useState(null);
  const vantaRef = useRef(null);

  useEffect(() => {


    const loadVantaScripts = async () => {
      // Dynamically import scripts
      const threeScript = document.createElement('script');
      threeScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js';
      threeScript.async = true;
      document.body.appendChild(threeScript);

      const vantaScript = document.createElement('script');
      vantaScript.src = 'https://cdn.jsdelivr.net/npm/vanta/dist/vanta.net.min.js';
      vantaScript.async = true;
      document.body.appendChild(vantaScript);

      vantaScript.onload = () => {
        if (window.VANTA) {
          // Initialize Vanta effect
          const effect = window.VANTA.NET({
            el: vantaRef.current,
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            zoom: 1.0,
            color: 0x00ffff, // Set the color of the NET
            backgroundColor: 0x000000, // Set the background color
          });
          setVantaEffect(effect);
        }
      };
    };

    loadVantaScripts();

    return () => {
      // Clean up Vanta effect on unmount
      if (vantaEffect) {
        vantaEffect.destroy();
      }
    };
  }, []);



  return (
    <>
      <Head>
        <title>Vaidhanik Firewall</title>
        <meta name="description" content="My Vanta.js app" />
      </Head>
      <div ref={vantaRef} className='h-[100vh] w-[100%] flex justify-center items-center'>
        <div className='flex flex-col align-middle items-center'>
        <h1 className='text-9xl'>
          Welcome
        </h1>
<Button className="bg-white text-black hover:text-white text-3xl p-8">
<Link href={"/Login"}>Login</Link>
</Button>
        </div>
      </div>
    </>
  );
}
