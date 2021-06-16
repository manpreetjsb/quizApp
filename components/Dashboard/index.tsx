import React, { useState } from 'react'
import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button'
import { useSelector, useDispatch } from 'react-redux'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import QuestionCard from '../QuestionCard/QuestionCard'
import { getData, updateScore, showQuestion } from '../reducers/actions/actions'
import { Quiz } from '../reducers/actions/types'

const Dashboard: React.FC<Quiz> = () => {
  const dispatch = useDispatch()
  const QuizQuestions = useSelector((state) => state.questions[state.index])
  const QuizState = useSelector((state) => state)

  const nextQuestion = () => {
    console.log('nextQ')
  }

  const checkAnswer = async (prop: string) => {
    console.log(prop)
    console.log(QuizQuestions.correct_answer)
    if (prop === QuizQuestions.correct_answer) {
      console.log('corrent')
      dispatch(updateScore(QuizState.index, QuizState.QuestionNumber, QuizState.score))
    } else {
      console.log('Not corrent')
    }
  }

  const show_question = (index: number) => {
    console.log(index)
    const result = dispatch(showQuestion(index))
  }

  const start_quiz = () => {
    const result = dispatch(getData())
  }
  console.log('b', QuizQuestions)

  return (
    <Container>
      <Box py={5} display="flex" justifyContent="center">
        <Button size="small" variant="contained" color="primary" onClick={() => start_quiz()}>
          start
        </Button>
      </Box>
      {/*  {loading ? <p>Loading Questions...</p> : null} */}
      <Box py={5} display="flex">
        {' '}
        {QuizQuestions && (
          <QuestionCard
            key={QuizState.index}
            questionNo={QuizState.QuestionNumber}
            totalQuestions={QuizState.TotalNumber}
            question={QuizQuestions.question}
            answers={QuizQuestions.answers}
            // userAnswer={QuizQuestions.userAnswers ? QuizQuestions.userAnswers[number] : undefined}
            callBkFunction={checkAnswer}
          />
        )}
      </Box>
      <Box>
        {QuizState.questions.map((item: any, index: any) => {
          return (
            <Button
              color="primary"
              aria-label="contained primary button "
              onClick={() => show_question(index)}
            >
              {index + 1}
            </Button>
          )
        })}
      </Box>
    </Container>
  )
}

export default Dashboard
