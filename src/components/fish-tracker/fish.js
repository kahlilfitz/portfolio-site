/**
 *
 *
 */
import { Typography } from '@mui/material'
import React from 'react'

const Fish = props => {
  const { name, handsPlayed } = props
  return (
    <div>
      <Typography variant="h1">{name}</Typography>
      <Typography variant="h2">{handsPlayed}</Typography>
    </div>
  )
}

export default Fish
