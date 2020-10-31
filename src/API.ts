import { shuffleArray } from './utils'

export type Question = {
  question: string; 
  correct: string; 
  incorrect: string[];  
}

//creating a question state here to combine the correct answer and incorrect answer into one arr so it can be easier to iterate over and display to the UI 
export type QuestionState = Question & { 
  answers: string[];  
}


export const fetchQuestions = async (
  amount: number, 
  ) => {
  const endpoint = `data.json?amount=${amount}`; 
  const data = await (await fetch(endpoint)).json();  
  return data.map((question: Question) => (
    
    { 
      ...question,
      answers: [
        ...question.incorrect, 
        question.correct 
      ]       
    } 
      ))} 

    // {
    //   ...question, 
    //   answers: shuffleArray([
    //     ...question.incorrect, 
    //     question.correct 
    //   ]),
    // }));    

