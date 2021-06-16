import React from 'react'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'

import { QuestionHolder } from './Question.styles'

interface Props {
  question: string
  answers: string[]
  questionNo: number
  totalQuestions: number
  callBkFunction: any
  /* userAnswer: boolean */
}

const QuestionCard: React.FC<Props> = ({
  questionNo,
  totalQuestions,
  question,
  answers,
  callBkFunction,
}) => {
  return (
    <QuestionHolder container spacing={3}>
      <Box>
        {questionNo} / {totalQuestions}
      </Box>
      <Grid item component="h3" dangerouslySetInnerHTML={{ __html: question }}></Grid>
      {answers.map((item) => {
        return (
          <Grid item>
            <Button
              size="small"
              variant="contained"
              color="primary"
              onClick={() => callBkFunction(item)}
            >
              {item}
            </Button>
          </Grid>
        )
      })}
    </QuestionHolder>
  )
}

export default QuestionCard
