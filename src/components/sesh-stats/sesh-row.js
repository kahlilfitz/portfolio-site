import { IconButton, Typography } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import React from 'react'
import SeshStyle from '../../style/sesh-stats'
import EditIcon from '@mui/icons-material/Edit'

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
const SeshRow = props => {
  const { name, handsPlayed, vpip, pfr, seat, onEditPlayerNameOpen } = props

  const handlePlayerEditClicked = event => {
    onEditPlayerNameOpen(seat)
  }

  return (
    <div>
      <Grid container spacing={2}>
        <Grid sx={{...SeshStyle.sessionDataSx, ...SeshStyle.widthSmall}}>
          <Typography variant="h6">{seat}</Typography>
        </Grid>
        <Grid sx={{...SeshStyle.sessionDataSx, ...SeshStyle.widthLarge}}>
          <Grid container spacing={2}>
            <Grid>
              <Typography variant="h6">{name}</Typography>
            </Grid>
            <Grid>
              <IconButton onClick={handlePlayerEditClicked}>
                <EditIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
        <Grid sx={{...SeshStyle.sessionDataSx, ...SeshStyle.widthSmall}}>
          <Typography variant="h6">{handsPlayed}</Typography>
        </Grid>
        <Grid sx={{...SeshStyle.sessionDataSx, ...SeshStyle.widthSmall}}>
          <Typography variant="h6">{vpip}</Typography>
        </Grid>
        <Grid sx={{...SeshStyle.sessionDataSx, ...SeshStyle.widthSmall}}>
          <Typography variant="h6">{pfr}</Typography>
        </Grid>
      </Grid>
    </div>
  )
}
export default SeshRow
