import React, { useRef, useLayoutEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Environment } from '@react-three/drei';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// 1. Move ALL model-specific logic here (GSAP and useFrame)
const PlantModel = ({ modelRef }) => {
  const { scene } = useGLTF('/heroModel.glb'); 

  // Gentle idle rotation while waiting for scroll
  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y += 0.002;
    }
  });

  useLayoutEffect(() => {
    if (!modelRef.current) return;

    const ctx = gsap.context(() => {
      // Starting state
      gsap.set(modelRef.current.position, { x: 0, y: -1.3, z: 3 });
      gsap.set(modelRef.current.scale, { x: 2.5, y: 2.5, z: 2.5 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '.hero-viewport',
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.5,
          invalidateOnRefresh: true,
        }
      });

      tl.to(modelRef.current.position, { x: 1.43, y: -1.4, z: 0 }, 0)
        .to(modelRef.current.scale, { x: 1.8, y: 1.8, z: 1.8 }, 0)
        .to(modelRef.current.rotation, { y: Math.PI * 2 }, 0);
    });

    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, []);

  return <primitive ref={modelRef} object={scene} dispose={null} />;
};

// 2. The Main Canvas Component (Keep this clean)
const PlantCanvas = () => {
  const modelRef = useRef();

  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <Canvas
        gl={{ antialias: true, alpha: true }}
        camera={{ position: [0, 0, 8], fov: 35 }}
      >
        <ambientLight intensity={0.7} />
        <directionalLight intensity={1.5} position={[5, 10, 5]} />
        <Environment preset="city" /> 
        
        {/* The model logic is now correctly placed inside the Canvas context */}
        <PlantModel modelRef={modelRef} />
      </Canvas>
    </div>
  );
};

export default PlantCanvas;