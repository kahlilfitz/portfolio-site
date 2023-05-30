import { ClickAwayListener, Typography } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import React from 'react'
import SeshStyle from '../../style/sesh-stats'
import PopperPlayer from './popper-player'

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
  const [playerName, setPlayerName] = React.useState(name)
  const [playerMenuAnchorEl, setPlayerMenuAnchorEl] = React.useState(null)
  const [playerMenuOpen, setPlayerMenuOpen] = React.useState(false)
  const [playerNameStyle, setPlayerNameStyle] = React.useState({})
  const editingPlayer = React.useRef(false)
  const playerNameInputRef = React.useRef('')

  React.useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  const handleKeyDown = event => {
    const alphaNumericTestList = [
      code => code >= 'KeyA' && code <= 'KeyZ',
      code => code >= 'Digit0' && code <= 'Digit9',
      code => code === 'Space',
    ]


    const leaveKeyArray = ['Enter', 'Escape']
    
    if (!editingPlayer.current) return

    if (leaveKeyArray.includes(event.key)) {
      setPlayerNameStyle({ background: 'transparent' })
      editingPlayer.current = false
      return
    }

    if (event.key === 'Backspace') {
      playerNameInputRef.current = playerNameInputRef.current.slice(0, -1)
      setPlayerName(playerNameInputRef.current)
      return
    }

    // If the key is a letter number or space
    if (alphaNumericTestList.some(test => test(event.code))) {
      playerNameInputRef.current += event.key
      setPlayerName(playerNameInputRef.current)
      return
    }
  }

  const handlePlayerClicked = event => {
    setPlayerMenuAnchorEl(event.currentTarget)
    setPlayerMenuOpen(true)
  }

  const handlePlayerCloseClick = () => {
    setPlayerMenuOpen(false)
    setPlayerMenuAnchorEl(null)
    if (editingPlayer.current) {
      setPlayerNameStyle({ background: 'transparent' })
      editingPlayer.current = false
    }
  }

  const handlePlayerEdit = () => {
    if (editingPlayer.current) {
      setPlayerNameStyle({ background: 'transparent' })
    } else {
      setPlayerNameStyle({ background: 'gray' })
    }
    editingPlayer.current = !editingPlayer.current
  }

  return (
    <div>
      <PopperPlayer
        open={playerMenuOpen}
        handleCloseClick={handlePlayerCloseClick}
        anchorEl={playerMenuAnchorEl}
        handlePlayerEdit={handlePlayerEdit}
      />
      <Grid container spacing={2}>
        <Grid sx={SeshStyle.dataSx} onClick={handlePlayerClicked}>
          <Typography variant="h6" sx={playerNameStyle}>
            {playerName}
          </Typography>
        </Grid>
        <Grid sx={SeshStyle.dataSx}>
          <Typography variant="h6">{handsPlayed}</Typography>
        </Grid>
        <Grid sx={SeshStyle.dataSx}>
          <Typography variant="h6">{vpip}</Typography>
        </Grid>
        <Grid sx={SeshStyle.dataSx}>
          <Typography variant="h6">{pfr}</Typography>
        </Grid>
      </Grid>
    </div>
  )
}
export default SeshRow
