import React, { useState } from 'react'
import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button'
import { useSelector, useDispatch } from 'react-redux'
import QuestionCard from '../QuestionCard/QuestionCard'
import { getData, updateScore, showQuestion, updateHighlight } from '../reducers/actions/actions'
import { Quiz } from '../reducers/actions/types'
import { FinishButton } from './index.styles'
import { Typography } from '@material-ui/core'

const Dashboard: React.FC<Quiz> = () => {
  const [start, setStart] = useState(true)

  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()
  const QuizQuestions = useSelector((state) => state.questions[state.index])
  const QuizState = useSelector((state) => state)
  let correct: number = 0

  const checkAnswer = (prop: string) => {
    if (prop === QuizQuestions.correct_answer) {
      correct = 1
    } else {
      correct = 0
    }
    dispatch(
      updateScore(
        QuizState.index + 1,
        QuizState.QuestionNumber + 1,
        QuizState.score + correct,
        prop,
        QuizState.questions,
        QuizQuestions.correct_answer
      )
    )
  }

  const makeHighlight = (prop: boolean) => {
    let highlight = !prop
    dispatch(updateHighlight(highlight, QuizQuestions.correct_answer, QuizState.questions))
  }

  const show_question = (index: number) => {
    const result = dispatch(showQuestion(index))
  }

  const start_quiz = () => {
    setLoading(true)
    dispatch(getData())
    setStart(false)
    setLoading(false)
  }

  const finish_quiz = () => {
    console.log('Finish')
  }

  //console.log('b', QuizQuestions)

  return (
    <Container>
      <Box py={5} display="flex" justifyContent="center">
        {start && (
          <Button size="small" variant="contained" color="primary" onClick={() => start_quiz()}>
            start
          </Button>
        )}
        {QuizState.QuizOver && (
          <FinishButton
            size="small"
            variant="contained"
            color="primary"
            onClick={() => finish_quiz()}
          >
            Finish
          </FinishButton>
        )}
      </Box>
      {/*       <Box display="flex" justifyContent="center">
        {loading && <Typography>Loading Questions...</Typography>}
      </Box> */}
      <Box py={5} display="flex">
        {QuizQuestions && (
          <QuestionCard
            key={QuizState.index}
            questionNo={QuizState.QuestionNumber}
            totalQuestions={QuizState.TotalQuestion}
            question={QuizQuestions.question}
            answers={QuizQuestions.answers}
            userAnswer={QuizQuestions.userAnswer}
            callBkFunction={checkAnswer}
            callBkFunctionHigh={makeHighlight}
            forLater={QuizQuestions.forLater}
          />
        )}
      </Box>
      <Box display="flex" justifyContent="center" whiteSpace>
        {QuizState.questions.map((item: any, index: any) => {
          return (
            <Box m={1}>
              <Button
                key={index}
                color={`${item.forLater ? 'yellow' : 'secondary'}`}
                variant="contained"
                onClick={() => show_question(index)}
              >
                {index + 1}
              </Button>{' '}
            </Box>
          )
        })}
      </Box>
    </Container>
  )
}

export default Dashboard
