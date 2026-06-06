import React, { useRef } from 'react';
import './ShopCard.css';
import { BookmarkSimple } from '@phosphor-icons/react';
import { Canvas } from '@react-three/fiber';
import { useGLTF, Environment, OrbitControls } from '@react-three/drei';
import MainButton from './MainButton';

const Model = ({ url, scale }) => {
    const { scene } = useGLTF(url);
    return <primitive object={scene} scale={scale || 1.5} />;
};

const getModelProps = (id) => {
    switch(id) {
        case 1: // Pothos
            return { scale: 3.0, position: [-0.01, -1.7, 1] };
        case 2: // Aloe Vera 
            return { scale: 2, position: [-0.1, -0.5, 0.5] };
        case 13: // Peace Lily
            return { scale: 2.0, position: [-0.2, -1.7, 0.8] };
        default:
            return { scale: 2.0, position: [0, -1.8, 0] };
    }
};

const ShopCard = ({ plant }) => {
    if (!plant) return null;

    const { scale, position } = getModelProps(plant.id);

    return (
        <div className="shopCardCont">
            {plant.rank && (
                <div className="shopCardRank">
                    {plant.rank} الأعلى مبيعًا
                </div>
            )}

            {plant['3DModel'] ? (
                <div className="shopCardImg3D">
                    <Canvas camera={{ position: [0, 0, 6], fov: 40 }} gl={{ alpha: true }}>
                        <ambientLight intensity={0.8} />
                        <directionalLight intensity={2} position={[5, 10, 5]} />
                        <Environment preset="city" />
                        <OrbitControls enableZoom={false} enablePan={false} />
                        <group position={position}>
                            <Model url={plant['3DModel']} scale={scale} />
                        </group>
                    </Canvas>
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
