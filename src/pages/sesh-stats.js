import {
  Container,
  CssBaseline,
  ThemeProvider,
  Typography,
} from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import React from 'react'
import SeshRow, { SeshRowIcon } from '../components/sesh-stats/sesh-row'
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
    switch (action) {
      case SeshRowIcon.SWAP:
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
      case SeshRowIcon.EDIT:
        handleEditPlayerNameOpen(seat)
        break
      case SeshRowIcon.MINUS_HANDS:
        const newSeshStats = [...seshStats]
        const playerToUpdateIndex = newSeshStats.findIndex(
          player => player.seat === seat
        )
        const playerToUpdate = newSeshStats[playerToUpdateIndex]
        playerToUpdate.handsPlayed =
          playerToUpdate.handsPlayed > 0 ? playerToUpdate.handsPlayed - 1 : 0
        newSeshStats[playerToUpdateIndex] = playerToUpdate
        setSeshStats(newSeshStats)
        break
      case SeshRowIcon.PLUS_HANDS:
        const newSeshStats2 = [...seshStats]
        const playerToUpdateIndex2 = newSeshStats2.findIndex(
          player => player.seat === seat
        )
        const playerToUpdate2 = newSeshStats2[playerToUpdateIndex2]
        playerToUpdate2.handsPlayed = playerToUpdate2.handsPlayed + 1
        newSeshStats2[playerToUpdateIndex2] = playerToUpdate2
        setSeshStats(newSeshStats2)
        break
      case SeshRowIcon.MINUS_PFR:
        const newSeshStats3 = [...seshStats]
        const playerToUpdateIndex3 = newSeshStats3.findIndex(
          player => player.seat === seat
        )
        const playerToUpdate3 = newSeshStats3[playerToUpdateIndex3]
        playerToUpdate3.pfr =
          playerToUpdate3.pfr > 0 ? playerToUpdate3.pfr - 1 : 0
        newSeshStats3[playerToUpdateIndex3] = playerToUpdate3
        setSeshStats(newSeshStats3)
        break
      case SeshRowIcon.PLUS_PFR:
        const newSeshStats4 = [...seshStats]
        const playerToUpdateIndex4 = newSeshStats4.findIndex(
          player => player.seat === seat
        )
        const playerToUpdate4 = newSeshStats4[playerToUpdateIndex4]
        playerToUpdate4.pfr = playerToUpdate4.pfr + 1
        newSeshStats4[playerToUpdateIndex4] = playerToUpdate4
        setSeshStats(newSeshStats4)
        break
      case SeshRowIcon.MINUS_VPIP:
        const newSeshStats5 = [...seshStats]
        const playerToUpdateIndex5 = newSeshStats5.findIndex(
          player => player.seat === seat
        )
        const playerToUpdate5 = newSeshStats5[playerToUpdateIndex5]
        playerToUpdate5.vpip =
          playerToUpdate5.vpip > 0 ? playerToUpdate5.vpip - 1 : 0
        newSeshStats5[playerToUpdateIndex5] = playerToUpdate5
        setSeshStats(newSeshStats5)
        break
      case SeshRowIcon.PLUS_VPIP:
        const newSeshStats6 = [...seshStats]
        const playerToUpdateIndex6 = newSeshStats6.findIndex(
          player => player.seat === seat
        )
        const playerToUpdate6 = newSeshStats6[playerToUpdateIndex6]
        playerToUpdate6.vpip = playerToUpdate6.vpip + 1
        newSeshStats6[playerToUpdateIndex6] = playerToUpdate6
        setSeshStats(newSeshStats6)
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
