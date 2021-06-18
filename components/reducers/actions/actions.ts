import { GET_DATA, CHECK_ANSWER, SHOW_QUESTION, MAKE_HIGHLIGHT } from './constant'

export const shuffleArray = (array: any[]) => [...array].sort(() => Math.random() - 0.5)

export const getData = () => async (dispatch: any) => {
  const endpoint = 'https://opentdb.com/api.php?amount=10&category=17&difficulty=easy&type=multiple'
  const data = await (await fetch(endpoint)).json()
  const result = data.results.map((question: any) => ({
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
    QuizQuestions: any,
    currentAnswer: string
  ) =>
  (dispatch: any) => {
    console.log(QuizQuestions)

    let result = QuizQuestions.map((item: any) => {
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

export const showQuestion = (index: number) => async (dispatch: any) => {
  dispatch({
    type: SHOW_QUESTION,
    payload: { index: index, QuestionNumber: index + 1 },
  })
}

export const updateHighlight =
  (highlight: boolean, currentAnswer: string, QuizQuestions: any) => (dispatch: any) => {
    let result = QuizQuestions.map((item: any) => {
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
