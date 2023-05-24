/**
 *
 *
 */
import { Container, Popover, Typography } from '@mui/material'
import React from 'react'

const Fish = props => {
  const { id, name, handsPlayed } = props
  const [anchorEl, setAnchorEl] = React.useState(null)
  const handlePopoverOpen = event => {
    setAnchorEl(event.currentTarget)
  }
  const handlePopoverClose = () => {
    setAnchorEl(null)
  }
  const open = Boolean(anchorEl)

  return (
    <Container
      id={id}
      onMouseEnter={handlePopoverOpen}
      onMouseLeave={handlePopoverClose}
    >
      <Typography variant="h1">
        {name}
      </Typography>
      <Typography variant="h2">
        {handsPlayed}
      </Typography>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <Typography variant="h1">
          Hover!
        </Typography>
      </Popover>
    </Container>
  )
}

export default Fish
