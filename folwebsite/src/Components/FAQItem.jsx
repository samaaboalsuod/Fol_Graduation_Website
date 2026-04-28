import React, { useState } from 'react';
import { CaretDown } from "@phosphor-icons/react";
import './FAQItem.css';

const FAQItem = ({ item, index }) => {
    const [isOpen, setIsOpen] = useState(false);
    const isRight = index % 2 === 0;

    return (
        <div className={`faqItemCont ${isRight ? 'alignRight' : 'alignLeft'}`}>
            <div 
                className={`faqQuestionBar ${isOpen ? 'open' : ''} ${isRight ? 'qRight' : 'qLeft'}`}
                onClick={() => setIsOpen(!isOpen)}
            >
                <h3>{item.questionar}</h3>
                <CaretDown size={24} weight="bold" className={`arrow ${isOpen ? 'rotate' : ''}`} />
            </div>
            
            <div className={`faqAnswerCard ${isOpen ? 'show' : ''} ${isRight ? 'aRight' : 'aLeft'}`}>
                <div className="answerInner">
                    <p>{item.answerar}</p>
                </div>
            </div>
        </div>
    );
};

export default FAQItem;
