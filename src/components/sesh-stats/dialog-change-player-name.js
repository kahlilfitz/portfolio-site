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
    setName(event.target.value)
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
