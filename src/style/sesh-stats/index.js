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
  minWidth: '56em',
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
  notSwappingSx,
  sessionDataSx,
  subGridSx,
  swappingSx,
  widthLarge,
  widthMedium,
  widthSmall,
}
export default SeshStyle
