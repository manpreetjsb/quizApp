import { Dispatch } from 'redux'
import {
  GET_DATA,
  CHECK_ANSWER,
  SHOW_QUESTION,
  MAKE_HIGHLIGHT,
  FINISH_QUIZ,
  TRY_AGAIN,
} from './constant'
import { Question } from '../actions/types'

const shuffleArray = (array: any[]) => [...array].sort(() => Math.random() - 0.5)

export const getData = () => async (dispatch: Dispatch) => {
  const endpoint = 'https://opentdb.com/api.php?amount=10&category=17&difficulty=easy&type=multiple'
  const data = await (await fetch(endpoint)).json()
  const result = data.results.map((question: Question) => ({
    ...question,
    answers: shuffleArray([...question.incorrect_answers, question.correct_answer]),
    userAnswer: '',
    forLater: false,
  }))

  dispatch({
    type: GET_DATA,
    payload: { result, total: result.length },
  })
}

export const updateScore =
  (
    index: number,
    qnumber: number,
    score: number,
    useranswer: string,
    QuizQuestions: Question[],
    currentAnswer: string
  ) =>
  (dispatch: Dispatch) => {
    let result = QuizQuestions.map((item: Question) => {
      if (item.correct_answer === currentAnswer) {
        item = { ...item, userAnswer: useranswer }
      }
      return item
    })

    dispatch({
      type: CHECK_ANSWER,
      payload: { index: index, QuestionNumber: qnumber, score: score, questions: result },
    })
  }

export const showQuestion = (index: number) => (dispatch: Dispatch) => {
  dispatch({
    type: SHOW_QUESTION,
    payload: { index: index, QuestionNumber: index + 1 },
  })
}

export const finishQuiz = () => (dispatch: Dispatch) => {
  dispatch({
    type: FINISH_QUIZ,
    payload: { QuizOver: false },
  })
}
export const TryAgain = () => (dispatch: Dispatch) => {
  dispatch({
    type: TRY_AGAIN,
    payload: {
      questions: [],
      loading: true,
      QuizOver: true,
      score: 0,
      TotalQuestion: 0,
      QuestionNumber: 1,
      index: 0,
    },
  })
}

export const MakeHighlight =
  (highlight: boolean, currentAnswer: string, QuizQuestions: Question[]) =>
  (dispatch: Dispatch) => {
    let result = QuizQuestions.map((item: Question) => {
      if (item.correct_answer === currentAnswer) {
        item = { ...item, forLater: highlight }
      }
      return item
    })
    dispatch({
      type: MAKE_HIGHLIGHT,
      payload: { questions: result },
    })
  }
