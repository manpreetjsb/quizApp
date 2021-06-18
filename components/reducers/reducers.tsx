import { Quiz } from '../reducers/actions/types'
import { GET_DATA, CHECK_ANSWER, SHOW_QUESTION, MAKE_HIGHLIGHT } from '../reducers/actions/constant'

const initialState: Quiz = {
  questions: [],
  loading: true,
  QuizOver: false,
  score: 0,
  TotalQuestion: 0,
  QuestionNumber: 1,
  index: 0,
}

const reducer = (state: any = initialState, { type, payload }) => {
  console.log('payload', payload)
  switch (type) {
    case GET_DATA:
      return {
        ...state,
        questions: payload.result,
        QuestionNumber: 1,
        TotalQuestion: payload.total,
      }
    case CHECK_ANSWER:
      return {
        ...state,
        index: payload.index,
        score: payload.score,
        QuestionNumber: payload.QuestionNumber,
        questions: payload.questions,
      }
    case SHOW_QUESTION:
      return {
        ...state,
        index: payload.index,
        QuestionNumber: payload.QuestionNumber,
      }
    case MAKE_HIGHLIGHT:
      return {
        ...state,
        questions: payload.questions,
      }
    default:
      return state
  }
}

export default reducer
