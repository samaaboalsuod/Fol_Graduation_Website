import React from 'react';
import './QuizCard.css';
import IconButton from './IconButton';

const QuizCard = ({ text }) => {
  return (
    <div className="quiz-card-container">
      <div className="quiz-card-content">
        <IconButton onClick={() => console.log("Button Clicked!")} />
        <p className="quiz-text">
          {text || "إذا كنت محتارًا، أجب على بعض أسئلتنا ولنختر معًا كل ما يناسبك"}
        </p>
        
      </div>
    </div>
  );
};

export default QuizCard;