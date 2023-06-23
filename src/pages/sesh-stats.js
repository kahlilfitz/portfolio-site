import AddCircleIcon from '@mui/icons-material/AddCircle'
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle'
import {
  Container,
  CssBaseline,
  IconButton,
  ThemeProvider,
  Typography,
} from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import React from 'react'
import DialogChangePlayerName from '../components/sesh-stats/dialog-change-player-name'
import SeshRow, { SeshRowIcon } from '../components/sesh-stats/sesh-row'
import SeshStyle from '../style/sesh-stats'

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
        const playerToUpdate = newSeshStats.find(player => player.seat === seat)
        playerToUpdate.handsPlayed =
          playerToUpdate.handsPlayed > 0 ? playerToUpdate.handsPlayed - 1 : 0
        playerToUpdate.isSeated = true
        setSeshStats(newSeshStats)
        break
      case SeshRowIcon.PLUS_HANDS:
        const newSeshStats2 = [...seshStats]
        const playerToUpdate2 = newSeshStats2.find(
          player => player.seat === seat
        )
        playerToUpdate2.handsPlayed = playerToUpdate2.handsPlayed + 1
        playerToUpdate2.isSeated = true
        setSeshStats(newSeshStats2)
        break
      case SeshRowIcon.MINUS_PFR:
        const newSeshStats3 = [...seshStats]
        const playerToUpdate3 = newSeshStats3.find(
          player => player.seat === seat
        )
        playerToUpdate3.pfr =
          playerToUpdate3.pfr > 0 ? playerToUpdate3.pfr - 1 : 0
        playerToUpdate3.isSeated = true
        setSeshStats(newSeshStats3)
        break
      case SeshRowIcon.PLUS_PFR:
        const newSeshStats4 = [...seshStats]
        const playerToUpdate4 = newSeshStats4.find(
          player => player.seat === seat
        )
        playerToUpdate4.pfr = playerToUpdate4.pfr + 1
        playerToUpdate4.isSeated = true
        setSeshStats(newSeshStats4)
        break
      case SeshRowIcon.MINUS_VPIP:
        const newSeshStats5 = [...seshStats]
        const playerToUpdate5 = newSeshStats5.find(
          player => player.seat === seat
        )
        playerToUpdate5.vpip =
          playerToUpdate5.vpip > 0 ? playerToUpdate5.vpip - 1 : 0
        playerToUpdate5.isSeated = true
        setSeshStats(newSeshStats5)
        break
      case SeshRowIcon.PLUS_VPIP:
        const newSeshStats6 = [...seshStats]
        const playerToUpdate6 = newSeshStats6.find(
          player => player.seat === seat
        )
        playerToUpdate6.vpip = playerToUpdate6.vpip + 1
        playerToUpdate6.isSeated = true
        setSeshStats(newSeshStats6)
        break
      case SeshRowIcon.TOGGLE_SEATED:
        const newSeshStats7 = [...seshStats]
        const playerToUpdate7 = newSeshStats7.find(
          player => player.seat === seat
        )
        playerToUpdate7.isSeated = !playerToUpdate7.isSeated
        setSeshStats(newSeshStats7)
        break
      case SeshRowIcon.RESET:
        const newSeshStats8 = [...seshStats]
        const playerToUpdate8 = newSeshStats8.find(
          player => player.seat === seat
        )
        playerToUpdate8.isSeated = true
        playerToUpdate8.handsPlayed = 0
        playerToUpdate8.pfr = 0
        playerToUpdate8.vpip = 0
        playerToUpdate8.name = `Player ${seat}`
        setSeshStats(newSeshStats8)
        break

      default: {
        console.log(`Unknown action: ${action}`)
      }
    }
  }

  const handleAllChangeClick = action => {
    const doChangeAll = change => {
      const newSeshStats = [...seshStats]
      newSeshStats.forEach(player => {
        if (player.isSeated) {
          player.handsPlayed = player.handsPlayed + change
        }
      })
      setSeshStats(newSeshStats)
    }

    switch (action) {
      case 'MINUS_ALL':
        doChangeAll(-1)
        break
      case 'PLUS_ALL':
        doChangeAll(1)
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
            {columnHeaderList.map((column, index) => {
              if (column === 'HP') {
                return (
                  <Grid
                    sx={{ ...SeshStyle.headerSx, ...columnHeaderWidth[index] }}
                    key={index}
                  >
                    <Grid container sx={SeshStyle.subGridSx}>
                      <Grid>
                        <Typography variant="h5">{column}</Typography>
                      </Grid>
                      <Grid>
                        <IconButton
                          onClick={event => {
                            handleAllChangeClick('MINUS_ALL')
                          }}
                        >
                          <RemoveCircleIcon />
                        </IconButton>
                      </Grid>
                      <Grid>
                        <IconButton
                          onClick={event => {
                            handleAllChangeClick('PLUS_ALL')
                          }}
                        >
                          <AddCircleIcon />
                        </IconButton>
                      </Grid>
                    </Grid>
                  </Grid>
                )
              }
              return (
                <Grid
                  sx={{ ...SeshStyle.headerSx, ...columnHeaderWidth[index] }}
                  key={index}
                >
                  <Typography variant="h5">{column}</Typography>
                </Grid>
              )
            })}
          </Grid>
          <Grid container spacing={2} key="data" direction="column">
            {seshStats.map((player, index) => (
              <Grid key={index}>
                <SeshRow
                  {...player}
                  widthArray={columnHeaderWidth}
                  onEditPlayerNameOpen={handleEditPlayerNameOpen}
                  onPlayerAction={handlePlayerAction}
                  swapping={swapping}
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
  SeshStyle.widthLarge,
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
    isSeated: true,
  },
  {
    seat: 2,
    name: 'Player 2',
    handsPlayed: 0,
    vpip: 0,
    pfr: 0,
    isSeated: true,
  },
  {
    seat: 3,
    name: 'Player 3',
    handsPlayed: 0,
    vpip: 0,
    pfr: 0,
    isSeated: true,
  },
  {
    seat: 4,
    name: 'Player 4',
    handsPlayed: 0,
    vpip: 0,
    pfr: 0,
    isSeated: true,
  },
  {
    seat: 5,
    name: 'Player 5',
    handsPlayed: 0,
    vpip: 0,
    pfr: 0,
    isSeated: true,
  },
  {
    seat: 6,
    name: 'Player 6',
    handsPlayed: 0,
    vpip: 0,
    pfr: 0,
    isSeated: true,
  },
  {
    seat: 7,
    name: 'Player 7',
    handsPlayed: 0,
    vpip: 0,
    pfr: 0,
    isSeated: true,
  },
  {
    seat: 8,
    name: 'Player 8',
    handsPlayed: 0,
    vpip: 0,
    pfr: 0,
    isSeated: true,
  },
  {
    seat: 9,
    name: 'Player 9',
    handsPlayed: 0,
    vpip: 0,
    pfr: 0,
    isSeated: true,
  },
  {
    seat: 10,
    name: 'Player 10',
    handsPlayed: 0,
    vpip: 0,
    pfr: 0,
    isSeated: false,
  },
]
