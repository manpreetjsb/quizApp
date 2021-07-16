import React, { useState } from 'react'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button'
import { useSelector, useDispatch } from 'react-redux'
import QuestionCard from '../QuestionCard/QuestionCard'
import {
  getData,
  updateScore,
  showQuestion,
  MakeHighlight,
  finishQuiz,
  TryAgain,
} from '../reducers/actions/actions'
import { Question, Quiz } from '../reducers/actions/types'
import { FinishButton } from './index.styles'

const text = (x: string) => x

const Dashboard: React.FC<Quiz> = () => {
  const [start, setStart] = useState(true)
  const [showFinish, setShowFinish] = useState(false)
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()
  const QuizQuestions = useSelector((state: Quiz) => state.questions[state.index])
  const QuizState = useSelector((state: Quiz) => state)
  let correct: number = 0

  const checkAnswer = (userAnswerProp: string) => {
    if (userAnswerProp === QuizQuestions.correct_answer) {
      correct = 1
    } else {
      correct = 0
    }

    const increase = QuizState.index < 9 ? 1 : 0
    console.log(increase)
    dispatch(
      updateScore(
        QuizState.index + increase,
        QuizState.QuestionNumber + increase,
        QuizState.score + correct,
        userAnswerProp,
        QuizState.questions,
        QuizQuestions.correct_answer
      )
    )
  }

  const make_highlight = (prop: boolean) => {
    let highlight = !prop
    dispatch(MakeHighlight(highlight, QuizQuestions.correct_answer, QuizState.questions))
  }

  const show_question = (index: number) => {
    dispatch(showQuestion(index))
  }

  const start_quiz = () => {
    setLoading(true)
    dispatch(getData())
    setStart(false)
    setLoading(false)
    setShowFinish(true)
  }

  const finish_quiz = () => {
    dispatch(finishQuiz())
    setShowFinish(false)
  }
  const try_again = () => {
    dispatch(TryAgain())
    setStart(true)
    start_quiz()
  }

  return (
    <Container>
      <Box py={5} display="flex" justifyContent="center">
        {start && (
          <Button size="small" variant="contained" color="primary" onClick={() => start_quiz()}>
            start
          </Button>
        )}
        {showFinish && (
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
      {QuizState.QuizOver && (
        <Grid>
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
                callBkFunctionHigh={make_highlight}
                forLater={QuizQuestions.forLater}
              />
            )}
          </Box>
          <Box display="flex" justifyContent="center">
            {QuizState.questions.map((item: Question, index: number) => {
              return (
                <Box m={1}>
                  <Button
                    key={index}
                    color={`${item.forLater ? 'primary' : 'secondary'}`}
                    variant="contained"
                    onClick={() => show_question(index)}
                  >
                    {index + 1}
                  </Button>
                </Box>
              )
            })}
          </Box>
        </Grid>
      )}

      {!QuizState.QuizOver && (
        <Grid>
          <Box display="flex" justifyContent="center" m={1} onClick={() => try_again()}>
            <Button size="small" variant="contained" color="primary">
              Try Again
            </Button>
          </Box>
          <Box display="flex" justifyContent="center" m={2}>
            Your Score is {QuizState.score} / Out of 10
          </Box>
        </Grid>
      )}
    </Container>
  )
}

export default Dashboard
