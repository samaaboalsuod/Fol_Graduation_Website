import React, { useRef, Suspense, useState, useEffect } from 'react';
import './ShopCard.css';
import { BookmarkSimple } from '@phosphor-icons/react';
import { Canvas } from '@react-three/fiber';
import { useGLTF, Environment, OrbitControls } from '@react-three/drei';
import MainButton from './MainButton';

import { useLoader } from '@react-three/fiber';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { useMemo } from 'react';
import { SkeletonUtils } from 'three-stdlib';

const GLTFModel = ({ url, scale }) => {
    const { scene } = useGLTF(url);
    const clonedScene = useMemo(() => SkeletonUtils.clone(scene), [scene]);
    return <primitive object={clonedScene} scale={scale} dispose={null} />;
};

const OBJModel = ({ url, scale }) => {
    const obj = useLoader(OBJLoader, url);
    const clonedObj = useMemo(() => SkeletonUtils.clone(obj), [obj]);
    return <primitive object={clonedObj} scale={scale} dispose={null} />;
};

const Model = ({ url, scale }) => {
    if (!url) return null;
    const isObj = url.toLowerCase().split('?')[0].trim().endsWith('.obj');
    if (isObj) {
        return <OBJModel url={url} scale={scale} />;
    }
    return <GLTFModel url={url} scale={scale} />;
};

const getModelProps = (id) => {
    switch(id) {
        case 1: return { scale: 3.0, position: [-0.01, -1.3, 1] }; // Pothos
        case 2: return { scale: 2.0, position: [-0.1, -0.5, 0.5] }; // Aloe Vera
        case 3: return { scale: 1.7, position: [-2.4, -1, 0] }; // Snake Plant
        case 4: return { scale: 0.04, position: [0, -1.5, 0] }; // Yucca
        case 5: return { scale: 2.5, position: [0, -1.5, 0] }; // Rubber Plant
        case 6: return { scale: 0.3, position: [0, -1.5, 0] }; // Calathea
        case 8: return { scale: 6.5, position: [0, -1.5, 0] }; // Croton
        case 9: return { scale: 1.6, position: [0, -1.5, 0] }; // Monstera
        case 10: return { scale: 1.5, position: [0, -0.2, 0] }; // Philodendron
        case 11: return { scale: 18.5, position: [0, -1.5, 0] }; // Fiddle Leaf
        case 12: return { scale: 2.3, position: [0, -0.1, 0] }; // Fern
        case 13: return { scale: 2.0, position: [-0.2, -1.7, 0.8] }; // Peace Lily
        case 14: return { scale: 12.0, position: [0, -1.5, 0] }; // Spider Plant (Microscopic native size)
        case 15: return { scale: 16.0, position: [0, -1.5, 0] }; // Jade Plant (Microscopic native size)
        case 16: return { scale: 5.4, position: [0, -1.5, 0] }; // Chinese Money (Microscopic native size)
        case 17: return { scale: 24, position: [100, -20, 0] }; // Areca Palm
        case 18: return { scale: 12, position: [11.3, -12, 0] }; // Dracaena
        default: return { scale: 2.5, position: [0, -1.5, 0] };
    }
};

const ShopCard = ({ plant }) => {
    const cardRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                } else {
                    setIsVisible(false);
                }
            },
            { rootMargin: '200px' } // Load slightly before it scrolls into view
        );
        if (cardRef.current) observer.observe(cardRef.current);
        return () => observer.disconnect();
    }, []);

    if (!plant) return null;

    return (
        <div className="shopCardCont">
            {plant.rank && (
                <div className="shopCardRank">
                    {plant.rank} الأعلى مبيعًا
                </div>
            )}

            {plant['3DModel'] ? (
                <div className="shopCardImg3D" ref={cardRef}>
                    {isVisible && (
                        <Canvas camera={{ position: [0, 0, 6], fov: 40 }} gl={{ alpha: true }}>
                            <ambientLight intensity={0.8} />
                            <directionalLight intensity={2} position={[5, 10, 5]} />
                            <Environment preset="city" />
                            <OrbitControls enableZoom={false} enablePan={false} />
                            <Suspense fallback={null}>
                                <group position={getModelProps(plant.id).position}>
                                    <Model url={plant['3DModel']} scale={getModelProps(plant.id).scale} />
                                </group>
                            </Suspense>
                        </Canvas>
                    )}
                </div>
            ) : (
                <img 
                    src={plant.Cover_Photo} 
                    alt={plant.alt || plant.NameAR} 
                    className="shopCardImg" 
                />
            )}

            <div className="shopCardDetails">
                <p className="shopCardCategory">الفئة {plant.Category}</p>
                
                <div className="shopCardNameRow">
                    <h3 className="shopCardName">
                        {plant.NameAR}
                    </h3>
                    <div className="shopCardPrice">
                        <span>{plant.Price}</span> جنيه
                    </div>
                </div>

                <div className="shopCardActions">
                    <MainButton text="أضف للسلة" />
                    <button className="shopCardSaveBtn">
                        <BookmarkSimple size={24} color="#FAFAEA" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ShopCard;
