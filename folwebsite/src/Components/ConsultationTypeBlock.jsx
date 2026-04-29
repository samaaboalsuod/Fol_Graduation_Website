import { motion } from 'framer-motion';
import { Flower } from '@phosphor-icons/react';
import './ConsultationTypeBlock.css';

const ConsultationTypeBlock = ({ title, points, img, reverse }) => {
    const pointsList = points ? points.split(/[,\n]/).filter(p => p.trim() !== '') : [];

    return (
        <motion.div 
            className={`consultationTypeBlockContainer ${reverse ? 'reverse' : ''}`}
            initial={{ opacity: 0, x: reverse ? -40 : 40, filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
            {/* 
              Order in RTL: 
              First element in DOM -> Far Right
              Last element in DOM -> Far Left
              To get [Image (Left) | Points (Middle) | Title (Right)]:
            */}
            
            <div className="verticalTitleSection">
                <h3 className="outlinedTitle">{title}</h3>
            </div>

            <div className="pointsSection">
                <ul className="pointsList">
                    {pointsList.map((point, index) => (
                        <li key={index} className="pointItem">
                            <Flower className="pointIcon" size={24} weight="fill" />
                            <span className="pointText">{point.trim()}</span>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="imagePart">
                <img src={img} alt={title} />
                <div className="imgOverlay"></div>
            </div>
        </motion.div>
    );
};

export default ConsultationTypeBlock;
