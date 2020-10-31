import React, {useState} from 'react';
import './App.css';
import QuestionCard from './components/QuestionCard'
import { fetchQuestions } from './API';
//Types 
import { QuestionState } from './API';
import { GlobalStyle } from './App.styles'


export type AnswerObject = {
  question: string; 
  answer: string;
  correct: boolean;
  correctAnswer: string;
}


const TOTAL_QUESTIONS = 10 

const App = () => {

  const [ loading, setLoading ] = useState(false) 
  const [ questions, setQuestions ] = useState<QuestionState[]>([]) 
  const [ number, setNumber ] = useState(0) 
  const [ userAnswers, setUserAnswers ] = useState<AnswerObject[]>([]) 
  const [ score, setScore ] = useState(0) 
  const [ gameOver, setGameOver ] = useState(true) 


  const startTrivia = async () => {
    setLoading(true)
    setGameOver(false)

    const newQuestions = await fetchQuestions(TOTAL_QUESTIONS)
      
      setQuestions(newQuestions)
      setScore(0)
      setUserAnswers([])
      setNumber(0)
      setLoading(false)
  }

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
      if(!gameOver) {
        // Users answers 
        const answer = e.currentTarget.value 
        // Check user answer against correct answer 
        const correct = questions[number].correct === answer; 
        // Add score if answer is correct 
        if(correct ) setScore(prev => prev + 1)
        //Save answer in arr for users answers 
        const answerObject = {
          question: questions[number].question, 
          answer,
          correct,
          correctAnswer: questions[number].correct    
        }
        setUserAnswers(prev => [...prev, answerObject])
      }
  }

  const nextQuestion = () => {
    // Move to the next question if not on the last question 
    const nextQuestion = number + 1 
    
    if (nextQuestion === TOTAL_QUESTIONS) {
      setGameOver(true)
    } else {
      setNumber(nextQuestion)
    }
  }


  return (
    <>
    <GlobalStyle/>
      <div className="App">
        <h1>Quiz</h1>
          {gameOver|| userAnswers.length === TOTAL_QUESTIONS ? ( 
            <button className="start" onClick={startTrivia}>Start</button>
            ) : null}
          {!gameOver ? <p className="score">Score:{score}</p> : null}
          {loading && <p>Loading Questions...</p>}
          {!loading && !gameOver && (
            <QuestionCard
              questionNum={number + 1}
              totalQuestions={TOTAL_QUESTIONS} 
              question={questions[number].question}
              answers={questions[number].answers}
              userAnswer={userAnswers ? userAnswers[number] : undefined}
              callback={checkAnswer}/>
            )} 

            {!gameOver && !loading && 
              userAnswers.length === number + 1 
              && number !== TOTAL_QUESTIONS - 1 ? (
              <button className="next" onClick={nextQuestion}>Next Question</button>
            ) : null}
      </div>
    </>
  );
}

export default App;
