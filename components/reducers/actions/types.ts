export interface Question {
  answer: string[]
  category: string
  correct_answer: string
  difficulty: string
  incorrect_answers: string[]
  question: string
  type: string
}
export interface Quiz {
  questions: Question[]
  loading: boolean
  QuizOver: boolean
  score: number
  QuestionNumber: number
  TotalNumber: number
  index: number
}

export interface AnswerObject {
  question: string
  answer: string
  correct: boolean
  correctAnswer: string
}
