import React from 'react'
import Grid from '@mui/material/Unstable_Grid2'
import { Typography } from '@mui/material'

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
  const { name, handsPlayed, vpip, pfr } = props
  return (
    <div>
      <Grid container spacing={2}>
        <Grid>
          <Typography variant="h6">{name}</Typography>
        </Grid>
        <Grid>
          <Typography variant="h6">{handsPlayed}</Typography>
        </Grid>
        <Grid>
          <Typography variant="h6">{vpip}</Typography>
        </Grid>
        <Grid>
          <Typography variant="h6">{pfr}</Typography>
        </Grid>
      </Grid>
    </div>
  )
}
export default SeshRow
