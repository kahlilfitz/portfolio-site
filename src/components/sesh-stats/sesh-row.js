import { IconButton, Typography } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import React from 'react'
import SeshStyle from '../../style/sesh-stats'
import EditIcon from '@mui/icons-material/Edit'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle'
import SwapVerticalCircleIcon from '@mui/icons-material/SwapVerticalCircle'

/**
 *
 * SeshRow is a component that displays the stats for a single player in a single session
 * It has the following colmns:
 * 1. Player Name
 * 2. Hands Played
 * 3. VPIP
 * 4. PFR
 *
 * When you click the player name, it should open a modal allowing you to change the player name
 * When you click the hands played, it should open a modal allowing you to increment/decerement the hands played
 * When you click the VPIP, it should open a modal allowing you to increment/decerement the VPIP
 * When you click the PFR, it should open a modal allowing you to increment/decerement the PFR
 */
export const SeshRowIcon = {
  SWAP: 'SWAP',
  EDIT: 'EDIT',
  PLUS_VPIP: 'PLUS_VPIP',
  MINUS_VPIP: 'MINUS_VPIP',
  PLUS_PFR: 'PLUS_PFR',
  MINUS_PFR: 'MINUS_PFR',
  PLUS_HANDS: 'PLUS_HANDS',
  MINUS_HANDS: 'MINUS_HANDS',
}

const SeshRow = props => {
  const {
    name,
    handsPlayed,
    vpip,
    pfr,
    seat,
    onPlayerAction,
    widthArray,
    swapping,
  } = props

  const handleIconClicked = name => {
    onPlayerAction(seat, name)
  }

  return (
    <div>
      <Grid container spacing={2}>
        <Grid sx={{ ...SeshStyle.sessionDataSx, ...widthArray[0] }}>
          <Grid container sx={SeshStyle.subGridSx}>
            <Grid>
              <Typography variant="h6">{seat}</Typography>
            </Grid>
            <Grid>
              <IconButton
                onClick={event => {
                  handleIconClicked(SeshRowIcon.SWAP)
                }}
                sx={swapping ? SeshStyle.swappingSx : SeshStyle.notSwappingSx}
              >
                <SwapVerticalCircleIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
        <Grid sx={{ ...SeshStyle.sessionDataSx, ...widthArray[1] }}>
          <Grid container sx={SeshStyle.subGridSx}>
            <Grid>
              <Typography variant="h6">{name}</Typography>
            </Grid>
            <Grid>
              <IconButton
                onClick={() => {
                  handleIconClicked(SeshRowIcon.EDIT)
                }}
              >
                <EditIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
        <Grid sx={{ ...SeshStyle.sessionDataSx, ...widthArray[2] }}>
          <Grid container sx={SeshStyle.subGridSx}>
            <Grid>
              <Typography variant="h6">{handsPlayed}</Typography>
            </Grid>
            <Grid>
              <IconButton
                onClick={() => {
                  handleIconClicked(SeshRowIcon.MINUS_HANDS)
                }}
              >
                <RemoveCircleIcon />
              </IconButton>
            </Grid>
            <Grid>
              <IconButton
                onClick={() => {
                  handleIconClicked(SeshRowIcon.PLUS_HANDS)
                }}
              >
                <AddCircleIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
        <Grid sx={{ ...SeshStyle.sessionDataSx, ...widthArray[3] }}>
          <Grid container sx={SeshStyle.subGridSx}>
            <Grid>
              <Typography variant="h6">{vpip}</Typography>
            </Grid>
            <Grid>
              <IconButton
                onClick={() => {
                  handleIconClicked(SeshRowIcon.MINUS_VPIP)
                }}
              >
                <RemoveCircleIcon />
              </IconButton>
            </Grid>
            <Grid>
              <IconButton
                onClick={() => {
                  handleIconClicked(SeshRowIcon.PLUS_VPIP)
                }}
              >
                <AddCircleIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
        <Grid sx={{ ...SeshStyle.sessionDataSx, ...widthArray[4] }}>
          <Grid container sx={SeshStyle.subGridSx}>
            <Grid>
              <Typography variant="h6">{pfr}</Typography>
            </Grid>
            <Grid>
              <IconButton
                onClick={() => {
                  handleIconClicked(SeshRowIcon.MINUS_PFR)
                }}
              >
                <RemoveCircleIcon />
              </IconButton>
            </Grid>
            <Grid>
              <IconButton
                onClick={() => {
                  handleIconClicked(SeshRowIcon.PLUS_PFR)
                }}
              >
                <AddCircleIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  )
}
export default SeshRow
