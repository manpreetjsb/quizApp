export interface Question {
  answer: string[]
  category: string
  correct_answer: string
  difficulty: string
  incorrect_answers: string[]
  question: string
  type: string
  userAnswer: String
  forLater: boolean
}

export interface Quiz {
  questions: Question[]
  loading: boolean
  QuizOver: boolean
  score: number
  QuestionNumber: number
  TotalQuestion: number
  index: number
}
