import {
  Container,
  CssBaseline,
  ThemeProvider,
  Typography,
} from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import React from 'react'
import SeshRow from '../components/sesh-stats/sesh-row'
import SeshStyle from '../style/sesh-stats'

const SeshStats = () => {
  const [seshStats, setSeshStats] = React.useState(initialSeshStats)
  return (
    <ThemeProvider theme={SeshStyle.darkTheme}>
      <CssBaseline />
      <Container variant="div">
        <h1>Sesh Stats</h1>
        <Grid container spacing={2} direction="column" sx={SeshStyle.containerSx}>
          <Grid container spacing={2} key="header">
            {columnHeaderList.map((column, index) => (
              <Grid sx={SeshStyle.headerSx} key={index}>
                <Typography variant="h5">{column}</Typography>
              </Grid>
            ))}
          </Grid>
          <Grid container spacing={2} key="data" direction="column">
            {initialSeshStats.map((player, index) => (
              <Grid key={index}>
                <SeshRow {...player} />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  )
}
export default SeshStats

const columnHeaderList = ['NAME', 'HP', 'VPIP', 'PFR']
const initialSeshStats = [
  {
    name: 'Player 1',
    handsPlayed: 0,
    vpip: 0,
    pfr: 0,
  },
  {
    name: 'Player 2',
    handsPlayed: 0,
    vpip: 0,
    pfr: 0,
  },
  {
    name: 'Player 3',
    handsPlayed: 0,
    vpip: 0,
    pfr: 0,
  },
  {
    name: 'Player 4',
    handsPlayed: 0,
    vpip: 0,
    pfr: 0,
  },
  {
    name: 'Player 5',
    handsPlayed: 0,
    vpip: 0,
    pfr: 0,
  },
  {
    name: 'Player 6',
    handsPlayed: 0,
    vpip: 0,
    pfr: 0,
  },
  {
    name: 'Player 7',
    handsPlayed: 0,
    vpip: 0,
    pfr: 0,
  },
  {
    name: 'Player 8',
    handsPlayed: 0,
    vpip: 0,
    pfr: 0,
  },
  {
    name: 'Player 9',
    handsPlayed: 0,
    vpip: 0,
    pfr: 0,
  },
]
