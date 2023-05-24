import { Typography } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import React from 'react'

const SeshStats = () => {
  return (
    <div>
      <h1>Sesh Stats</h1>
      <Grid container spacing={2} direction="column">
        <Grid container spacing={2}>
          <Grid>
            <Typography variant="h5">NAME</Typography>
          </Grid>
          <Grid>
            <Typography variant="h5">HANDS_PLAYED</Typography>
          </Grid>
          <Grid>
            <Typography variant="h5">VPIP</Typography>
          </Grid>
          <Grid>
            <Typography variant="h5">PFR</Typography>
          </Grid>
        </Grid>
      </Grid>
    </div>
  )
}
export default SeshStats
