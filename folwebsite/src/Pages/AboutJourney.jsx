import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import JourneyTextCard from '../Components/JourneyTextCard';
import './AboutJourney.css';

import plantStage1 from '../Assets/Icons/plantStage1.png';
import plantStage2 from '../Assets/Icons/plantStage2.png';
import plantStage3 from '../Assets/Icons/plantStage3.png';

const AboutJourney = () => {
    return (
        <div className="journeyContainer">
            
            {/* STAGE 1 */}
            <div className="journeyBlock block1">
                <JourneyTextCard 
                    title="بدأنا بخوف بسيط من الفشل"
                    description="في عام ٢٠٢٢، لاحظنا أن الكثير من الناس يخافون من شراء النباتات. ليس لأنهم لا يحبونها، بل لأنهم يخشون أن تموت بين أيديهم."
                />
                <motion.img 
                    src={plantStage1} 
                    className="journeyPlant plant1" 
                    alt="Plant Stage 1"
                    initial={{ y: 50, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: false, margin: "-100px" }}
                    transition={{ duration: 1 }}
                />
            </div>

            {/* STAGE 2 */}
            <div className="journeyBlock block2">
                <JourneyTextCard 
                    title="فقررنا تغيير ذلك"
                    description="أنشأنا منصة لا تبيع النباتات فقط، بل تبني الثقة والمعرفة والدعم المستمر."
                />
                <motion.img 
                    src={plantStage2} 
                    className="journeyPlant plant2" 
                    alt="Plant Stage 2"
                    initial={{ y: 50, opacity: 0, rotate: -5 }}
                    whileInView={{ y: 0, opacity: 1, rotate: 0 }}
                    viewport={{ once: false, margin: "-100px" }}
                    transition={{ duration: 1 }}
                />
            </div>

            {/* STAGE 3 */}
            <div className="journeyBlock block3">
                <JourneyTextCard 
                    title="فلسفة الازدهار المستمر"
                    description="نحن لا نمنحك نباتاً فحسب، بل نمنحك الثقة لجعله يزدهر عبر تطبيقنا وإرشادات الموقع"
                />
                <motion.img 
                    src={plantStage3} 
                    className="journeyPlant plant3" 
                    alt="Plant Stage 3"
                    initial={{ scale: 0.9, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: false, margin: "-100px" }}
                    transition={{ duration: 1 }}
                />
            </div>

        </div>
    );
};

export default AboutJourney;
