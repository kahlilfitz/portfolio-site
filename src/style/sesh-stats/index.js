import { createTheme } from '@mui/material'

const baseDataElementSx = {
  border: '1px solid white',
  height: '3em',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}

const swappingSx = {
  color: 'green',
}

const notSwappingSx = {
  color: 'white',
}

const seatedSx = {
  color: 'white',
}

const notSeatedSx = {
  color: 'grey',
}

const subGridSx = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}

const widthSmall = {
  width: '8em',
}

const widthMedium = {
  width: '11em',
}

const widthLarge = {
  width: '15em',
}

const cursorPointer = {
  cursor: 'pointer',
}

const headerSx = {
  ...baseDataElementSx,
}

const sessionDataSx = {
  ...baseDataElementSx,
}

const clickableSessionDataSx = {
  ...baseDataElementSx,
  ...cursorPointer,
}

const gridContainerSx = {
  minWidth: '59em',
}

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
})

const SeshStyle = {
  clickableSessionDataSx,
  containerSx: gridContainerSx,
  cursorPointer,
  darkTheme,
  dataSx: sessionDataSx,
  headerSx,
  notSeatedSx,
  notSwappingSx,
  seatedSx,
  sessionDataSx,
  subGridSx,
  swappingSx,
  widthLarge,
  widthMedium,
  widthSmall,
}
export default SeshStyle
