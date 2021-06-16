import { GET_DATA, CHECK_ANSWER, SHOW_QUESTION } from './constant'

export const shuffleArray = (array: any[]) => [...array].sort(() => Math.random() - 0.5)

export const getData = () => async (dispatch: any) => {
  const endpoint = 'https://opentdb.com/api.php?amount=10&category=17&difficulty=easy&type=multiple'
  const data = await (await fetch(endpoint)).json()
  const result = data.results.map((question: any) => ({
    ...question,
    answers: shuffleArray([...question.incorrect_answers, question.correct_answer]),
  }))

  dispatch({
    type: GET_DATA,
    payload: { result, total: result.length },
  })
}

export const updateScore =
  (index: number, qnumber: number, score: number) => async (dispatch: any) => {
    dispatch({
      type: CHECK_ANSWER,
      payload: { index: index + 1, QuestionNumber: qnumber + 1, score: score + 1 },
    })
  }

export const showQuestion = (index: number) => async (dispatch: any) => {
  dispatch({
    type: SHOW_QUESTION,
    payload: { index: index + 1 },
  })
}
