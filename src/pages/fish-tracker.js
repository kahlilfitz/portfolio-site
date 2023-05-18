import React from 'react'
import Fish from '../components/fish-tracker/fish'
import Grid from '@mui/material/Unstable_Grid2'
import {
  CssBaseline,
  ThemeProvider,
  Typography,
  createTheme,
} from '@mui/material'

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
})

/**
 * Initialize the page with a component the is titled "Fish Tracker"
 * Map over the fishDict and display each person
 * Display the name and handsPlayed in a flexbox row
 */

const FishTracker = () => {
  const [fishDict, setFishDict] = React.useState(fishDictDefault)
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <main>
        <Typography variant="h1">Fish Tracker</Typography>
        <Grid container spacing={2}>
          {Object.keys(fishDict).map(key => (
            <Grid item xs={4}>
              {fishDict[key]}
            </Grid>
          ))}
        </Grid>
      </main>
    </ThemeProvider>
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <main>
        <Typography variant="h1">Fish Tracker</Typography>
        <Grid container spacing={2}>
          {Object.keys(fishDict).map(key => (
            <Grid item xs={4}>
              {fishDict[key]}
            </Grid>
          ))}
        </Grid>
      </main>
    </ThemeProvider>
  )
}

/**
 * Create a dictionary where the key is the number from 1 to 9 indicating the seat number
 */

const fishDictDefault = {
  1: <Fish name="Fish 1" handsPlayed={0} />,
  2: <Fish name="Fish 2" handsPlayed={0} />,
  3: <Fish name="Fish 3" handsPlayed={0} />,
  4: <Fish name="Fish 4" handsPlayed={0} />,
  5: <Fish name="Fish 5" handsPlayed={0} />,
  6: <Fish name="Fish 6" handsPlayed={0} />,
  7: <Fish name="Fish 7" handsPlayed={0} />,
  8: <Fish name="Fish 8" handsPlayed={0} />,
  9: <Fish name="Fish 9" handsPlayed={0} />,
  1: <Fish name="Fish 1" handsPlayed={0} />,
  2: <Fish name="Fish 2" handsPlayed={0} />,
  3: <Fish name="Fish 3" handsPlayed={0} />,
  4: <Fish name="Fish 4" handsPlayed={0} />,
  5: <Fish name="Fish 5" handsPlayed={0} />,
  6: <Fish name="Fish 6" handsPlayed={0} />,
  7: <Fish name="Fish 7" handsPlayed={0} />,
  8: <Fish name="Fish 8" handsPlayed={0} />,
  9: <Fish name="Fish 9" handsPlayed={0} />,
}

export default FishTracker
