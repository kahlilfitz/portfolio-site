import {
  Container,
  CssBaseline,
  ThemeProvider,
  Typography,
} from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import React from 'react'
import SeshRow, { SeshRowName } from '../components/sesh-stats/sesh-row'
import SeshStyle from '../style/sesh-stats'
import DialogChangePlayerName from '../components/sesh-stats/dialog-change-player-name'

const SeshStats = () => {
  const [seshStats, setSeshStats] = React.useState(initialSeshStats)
  const [editPlayerNameOpen, setEditPlayerNameOpen] = React.useState(false)
  const [editPlayerNameSeat, setEditPlayerNameSeat] = React.useState(0)
  const [swapping, setSwapping] = React.useState(false)
  const seatToSwap = React.useRef(0)

  const handleEditPlayerNameOpen = seat => {
    setEditPlayerNameSeat(seat)
    setEditPlayerNameOpen(true)
  }

  const handleEditPlayerNameCancel = () => {
    setEditPlayerNameOpen(false)
  }

  const handleEditPlayerNameSave = name => {
    const newSeshStats = [...seshStats]
    const playerToUpdateIndex = newSeshStats.findIndex(
      player => player.seat === editPlayerNameSeat
    )
    const playerToUpdate = newSeshStats[playerToUpdateIndex]
    playerToUpdate.name = name
    newSeshStats[playerToUpdateIndex] = playerToUpdate
    setSeshStats(newSeshStats)
    setEditPlayerNameOpen(false)
  }

  const handlePlayerAction = (seat, action) => {
    console.log(`handlePlayerAction: seat=${seat}, action=${action}`)
    switch (action) {
      case SeshRowName.SWAP:
        if (swapping) {
          const newSeshStats = [...seshStats]
          const playerToSwapIndex = newSeshStats.findIndex(
            player => player.seat === seatToSwap.current
          )
          const playerToSwap = newSeshStats[playerToSwapIndex]
          const playerToUpdateIndex = newSeshStats.findIndex(
            player => player.seat === seat
          )
          newSeshStats[playerToSwapIndex] = newSeshStats[playerToUpdateIndex]
          newSeshStats[playerToSwapIndex].seat = playerToSwap.seat
          newSeshStats[playerToUpdateIndex] = playerToSwap
          newSeshStats[playerToUpdateIndex].seat = seat
          setSeshStats(newSeshStats)
          setSwapping(false)
        } else {
          seatToSwap.current = seat
          setSwapping(true)
        }
        break
      default: {
        console.log(`Unknown action: ${action}`)
      }
    }
  }

  return (
    <ThemeProvider theme={SeshStyle.darkTheme}>
      <CssBaseline />
      <DialogChangePlayerName
        open={editPlayerNameOpen}
        onCancel={handleEditPlayerNameCancel}
        onSave={handleEditPlayerNameSave}
        seat={editPlayerNameSeat}
      />
      <Container variant="div">
        <h1>Sesh Stats</h1>
        <Grid
          container
          spacing={2}
          direction="column"
          sx={SeshStyle.containerSx}
        >
          <Grid container spacing={2} key="header">
            {columnHeaderList.map((column, index) => (
              <Grid
                sx={{ ...SeshStyle.headerSx, ...columnHeaderWidth[index] }}
                key={index}
              >
                <Typography variant="h5">{column}</Typography>
              </Grid>
            ))}
          </Grid>
          <Grid container spacing={2} key="data" direction="column">
            {seshStats.map((player, index) => (
              <Grid key={index}>
                <SeshRow
                  {...player}
                  widthArray={columnHeaderWidth}
                  onEditPlayerNameOpen={handleEditPlayerNameOpen}
                  onPlayerAction={handlePlayerAction}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  )
}
export default SeshStats

const columnHeaderWidth = [
  SeshStyle.widthSmall,
  SeshStyle.widthLarge,
  SeshStyle.widthMedium,
  SeshStyle.widthMedium,
  SeshStyle.widthMedium,
]
const columnHeaderList = ['SEAT', 'NAME', 'HP', 'VPIP', 'PFR']
const initialSeshStats = [
  {
    seat: 1,
    name: 'Player 1',
    handsPlayed: 0,
    vpip: 0,
    pfr: 0,
  },
  {
    seat: 2,
    name: 'Player 2',
    handsPlayed: 0,
    vpip: 0,
    pfr: 0,
  },
  {
    seat: 3,
    name: 'Player 3',
    handsPlayed: 0,
    vpip: 0,
    pfr: 0,
  },
  {
    seat: 4,
    name: 'Player 4',
    handsPlayed: 0,
    vpip: 0,
    pfr: 0,
  },
  {
    seat: 5,
    name: 'Player 5',
    handsPlayed: 0,
    vpip: 0,
    pfr: 0,
  },
  {
    seat: 6,
    name: 'Player 6',
    handsPlayed: 0,
    vpip: 0,
    pfr: 0,
  },
  {
    seat: 7,
    name: 'Player 7',
    handsPlayed: 0,
    vpip: 0,
    pfr: 0,
  },
  {
    seat: 8,
    name: 'Player 8',
    handsPlayed: 0,
    vpip: 0,
    pfr: 0,
  },
  {
    seat: 9,
    name: 'Player 9',
    handsPlayed: 0,
    vpip: 0,
    pfr: 0,
  },
  {
    seat: 10,
    name: 'Player 10',
    handsPlayed: 0,
    vpip: 0,
    pfr: 0,
  },
]
