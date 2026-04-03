import React, { useRef, useLayoutEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Environment } from '@react-three/drei';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const PlantModel = ({ modelRef }) => {
  const { scene } = useGLTF('/heroModel.glb'); 

  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y += 0.002;
    }
  });

  useLayoutEffect(() => {
    if (!modelRef.current) return;

    const ctx = gsap.context(() => {
      gsap.set(modelRef.current.position, { x: 0, y: -1.3, z: 3 });
      gsap.set(modelRef.current.scale, { x: 3, y: 3, z: 3 });


      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '.hero-viewport',
          start: 'top top',
          end: 'bottom bottom',
          scrub: 2.5, // Slightly higher for that 'floaty' feel
          invalidateOnRefresh: true,
        }
      });

      // 1. GENTLE LIGHTING (Ends at 60% of the scroll)
      tl.fromTo(".section-photo img", 
        { filter: "brightness(0.1)" }, 
        { 
          filter: "brightness(1.0)", 
          duration: 0.6, 
          // Sine is much softer than Power eases for lighting
          ease: "sine.inOut" 
        }, 
        0 // Starts immediately
      );

      // 2. PLANT MOVEMENT
      tl.to(modelRef.current.position, { 
        x: () => window.innerWidth > 1200 ? 1.8 : 1.43, 
        y: () => window.innerHeight > 600 ? -1.8 : -2.5,
        z: 0,
        duration: 1, 
        ease: "sine.inOut" // Changed to inOut to match the 'gentle' vibe
      }, 0.1); // Delay the movement slightly so the room 'wakes up' first

      tl.to(modelRef.current.scale, { 
        x: () => window.innerWidth > 1200 ? 1.8 : 1.6, 
        y: () => window.innerWidth > 1200 ? 1.8 : 1.6, 
        z: () => window.innerWidth > 1200 ? 1.8 : 1.6,
        duration: 1,
        ease: "power1.inOut"
      }, 0.1);

      tl.to(modelRef.current.rotation, { 
        y: Math.PI * 1, 
        duration: 1, 
        ease: "none" 
      }, 0);

      // 2. REFINED LIGHTING: Happens earlier and smoother
      tl.fromTo(".section-photo img", 
        { filter: "brightness(0.1)" }, // Start extra dark for drama
        { 
          filter: "brightness(1.0)", 
          // duration: 0.0 means it finishes when the scroll is only 00% done
          duration: .9, 
          // power2.out starts fast and smooths out at the end
          ease: "sine.inOut" 
        }, 
        0.1 // Starts at the very beginning
      );

gsap.set([".hero-logo", ".line-1", ".line-2", ".line-3"], { opacity: 0, y: 300 });

// 2. Control the Logo (Top Corner)
tl.to(".hero-logo", {
    opacity: 0.8,
    y: 0,
    filter: "blur(0px)",
    duration: 1,
    ease: "power2.out"
}, 0.5);

tl.to(".line-1", {
  opacity: 1,
  y: 150,
  x: 470,
  duration: 1,
  ease: "power2.out"
}, 0.6); // Starts at 60% of scroll

tl.to(".line-2", {
  opacity: 1,
  y: 70,
  x: 0,
  duration: 1.2,
  ease: "power2.out"
}, 0.65); // Slightly delayed after the big title

// 5. Control "جربها الآن" (The Button/Link)
tl.to(".line-3", {
  opacity: 1,
  y: -200,
  duration: 2,
  ease: "power2.out"
}, 0.8); // Appears last, when the room is fully bright

    });

    const handleResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", handleResize);

    return () => {
      ctx.revert();
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return <primitive ref={modelRef} object={scene} dispose={null} />;
};

const PlantCanvas = () => {
  const modelRef = useRef();

  return (
    <div className="hero-3d-overlay">
      <Canvas
        gl={{ antialias: true, alpha: true }}
        camera={{ position: [0, 0, 8], fov: 35 }}
      >
        <ambientLight intensity={0.7} />
        <directionalLight intensity={1.5} position={[5, 10, 5]} />
        <Environment preset="city" /> 
        <PlantModel modelRef={modelRef} />
      </Canvas>
    </div>
  );
};

export default PlantCanvas;