import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from '@mui/material'
import React from 'react'

/**
 * Component is a mui5 Dialog that allows you to change the player name
 */

const DialogChangePlayerName = props => {
  const { onCancel, onSave, open, seat } = props
  const [name, setName] = React.useState('')

  const handleChange = event => {
    console.log('handleChange::event.target.value', typeof event.target.value)
    setName(event.target.value.length < 13 ? event.target.value : event.target.value.subString(0, 12))
  }

  const handleSave = () => {
    onSave(name)
  }

  return (
    <Dialog open={open}>
      <DialogTitle>Change Player Name</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Change the player name at seat {seat} to:
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          value={name}
          label="Player Name"
          type="text"
          onChange={handleChange}
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>Cancel</Button>
        <Button onClick={handleSave}>Save</Button>
      </DialogActions>
    </Dialog>
  )
}

export default DialogChangePlayerName
