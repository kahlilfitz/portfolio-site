import CloseIcon from '@mui/icons-material/Close'
import EditIcon from '@mui/icons-material/Edit'
import { ClickAwayListener, IconButton, Popper } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import React from 'react'
import SeshStyle from '../../style/sesh-stats'

const PopperPlayer = props => {
  const { handleCloseClick, open, anchorEl, handlePlayerEdit } = props

  return (
    <Popper open={open} anchorEl={anchorEl} placement="top-start">
      <Grid container spacing={2} sx={SeshStyle.PopperPlayerStyle}>
        <Grid>
          <IconButton onClick={handlePlayerEdit}>
            <EditIcon />
          </IconButton>
        </Grid>
        <Grid>
          <IconButton onClick={handleCloseClick}>
            <CloseIcon />
          </IconButton>
        </Grid>
      </Grid>
    </Popper>
  )
}

export default PopperPlayer
