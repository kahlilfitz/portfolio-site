import React from 'react'
import Person from '../components/fish-tracker/person'
import Grid from '@mui/material/Unstable_Grid2'

/**
 * Initialize the page with a component the is titled "Fish Tracker"
 * Map over the fishDict and display each person
 * Display the name and handsPlayed in a flexbox row
 */

const FishTracker = () => {
  const [fishDict, setFishDict] = React.useState(fishDictDefault)
  return (
    <div>
      <h1>Fish Tracker</h1>
      <Grid container spacing={2}>
        {Object.keys(fishDict).map(key => (
          <Grid item xs={4}>
            {fishDict[key]}
          </Grid>
        ))}
      </Grid>
    </div>
  )
}

/**
 * Create a dictionary where the key is the number from 1 to 9 indicating the seat number
 */

const fishDictDefault = {
  1: <Person name="Fish 1" handsPlayed={0} />,
  2: <Person name="Fish 2" handsPlayed={0} />,
  3: <Person name="Fish 3" handsPlayed={0} />,
  4: <Person name="Fish 4" handsPlayed={0} />,
  5: <Person name="Fish 5" handsPlayed={0} />,
  6: <Person name="Fish 6" handsPlayed={0} />,
  7: <Person name="Fish 7" handsPlayed={0} />,
  8: <Person name="Fish 8" handsPlayed={0} />,
  9: <Person name="Fish 9" handsPlayed={0} />,
}

export default FishTracker
