import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import ExpenseOverview from './../expense/ExpenseOverview.js'

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 800,
    margin: 'auto',
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
  },
  title: {
    padding: `${theme.spacing(3)}px ${theme.spacing(2.5)}px ${theme.spacing(2)}px`,
    color: theme.palette.openTitle
  },
  media: {
    minHeight: 440
  },
  credit: {
    padding: 10,
    textAlign: 'right',
    backgroundColor: '#ededed',
    borderBottom: '1px solid #d0d0d0',
    '& a': {
      color: '#4f83cc'
    }
  }
}))

export default function Home() {
  const classes = useStyles()
  return (
    <>
      <ExpenseOverview />
    </>
  )
}