import * as React from 'react';
//Types 
import { AnswerObject }from '../App';

//Styles 
import { Wrapper, ButtonWrapper } from './QuestionCard.styles'

type Props = {
  question: string;
  answers: string[];
  callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
  userAnswer: AnswerObject | undefined; 
  questionNum: number;
  totalQuestions: number;
}

const QuestionCard: React.FC<Props> = ({
  question, 
  answers, 
  callback, 
  userAnswer, 
  questionNum, 
  totalQuestions

}) => (
  <Wrapper>
    <p className="number">
      Pytanie: {questionNum} / {totalQuestions}
    </p>
    <p dangerouslySetInnerHTML={{ __html: question}}></p>
    <div>
      {answers.map(answer => (
        <ButtonWrapper 
          key={answer}
          correct={userAnswer?.correctAnswer === answer}
          userClicked={userAnswer?.answer === answer}>
        <div> 
          <button disabled={!!userAnswer} value={answer} onClick={callback}>
          <span dangerouslySetInnerHTML={{__html : answer}}></span>
          </button>
        </div>
        </ButtonWrapper>
      ))}
    </div>
  </Wrapper>
)


export default QuestionCard 
