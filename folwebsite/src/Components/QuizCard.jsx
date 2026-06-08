import React from 'react';
import { useNavigate } from 'react-router-dom';
import './QuizCard.css';
import IconButton from './IconButton';

const QuizCard = ({ text }) => {
  const navigate = useNavigate();
  return (
    <div className="quiz-card-container" onClick={() => navigate('/Questions')}>
      <div className="quiz-card-content">
        <IconButton onClick={(e) => { e.stopPropagation(); navigate('/Questions'); }} />
        <p className="quiz-text">
          {text || "إذا كنت محتارًا، أجب على بعض أسئلتنا ولنختر معًا كل ما يناسبك"}
        </p>
        
      </div>
    </div>
  );
};

export default QuizCard;