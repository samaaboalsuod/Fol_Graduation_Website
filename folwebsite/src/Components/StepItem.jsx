import { motion } from 'framer-motion';
import './StepItem.css';

const StepItem = ({ number, title, description, reverse }) => {
    return (
        <motion.div 
            className={`stepItemContainer ${reverse ? 'reverse' : ''}`}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { 
                    opacity: 1, 
                    y: 0,
                    transition: { 
                        staggerChildren: 0.15,
                        duration: 0.8, 
                        ease: [0.22, 1, 0.36, 1] 
                    }
                }
            }}
        >
            <motion.div 
                className="stepNumberBox"
                variants={{ 
                    hidden: { opacity: 0, scale: 0.8, x: 20 }, 
                    visible: { opacity: 1, scale: 1, x: 0 } 
                }}
            >
                <h2 className="stepNumber">{number}</h2>
            </motion.div>
            
            <motion.div 
                className="stepContentBox"
                variants={{ 
                    hidden: { opacity: 0, x: 10 }, 
                    visible: { opacity: 1, x: 0 } 
                }}
            >
                <h3 className="stepTitle">{title}</h3>
                <p className="stepDescription">{description}</p>
            </motion.div>
        </motion.div>
    );
};

export default StepItem;
