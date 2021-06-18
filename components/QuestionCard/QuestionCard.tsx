import React from 'react'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Switch from '@material-ui/core/Switch'
import { Typography } from '@material-ui/core'
import FormControlLabel from '@material-ui/core/FormControlLabel'

import { QuestionHolder } from './Question.styles'

interface Props {
  question: string
  answers: string[]
  questionNo: number
  totalQuestions: number
  callBkFunction: (item: string) => void
  userAnswer: string
  callBkFunctionHigh: (forLater: boolean) => void
  forLater: boolean
}

const QuestionCard: React.FC<Props> = ({
  questionNo,
  totalQuestions,
  question,
  answers,
  userAnswer,
  callBkFunction,
  callBkFunctionHigh,
  forLater,
}) => {
  return (
    <QuestionHolder container spacing={3}>
      <Box textAlign="center">
        <Typography>
          {questionNo} / {totalQuestions}
        </Typography>
        <Box m={1}>
          {forLater}
          <FormControlLabel
            control={
              <Switch
                checked={forLater}
                onChange={() => callBkFunctionHigh(forLater)}
                name="safeForLater"
                color="primary"
              />
            }
            label="Highlight"
          />
        </Box>
      </Box>
      <Grid item component="h3" dangerouslySetInnerHTML={{ __html: question }}></Grid>
      {answers.map((item, index) => {
        return (
          <Grid item key={index}>
            <Button
              size="small"
              variant="outlined"
              color={`${item === userAnswer ? 'secondary' : 'primary'}`}
              onClick={() => callBkFunction(item)}
            >
              <Typography dangerouslySetInnerHTML={{ __html: item }}></Typography>
            </Button>
          </Grid>
        )
      })}
    </QuestionHolder>
  )
}

export default QuestionCard
