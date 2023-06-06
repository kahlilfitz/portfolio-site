import { createTheme } from '@mui/material'

const baseDataElementSx = {
  border: '1px solid white',
  height: '3em',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}

const subGridSx = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}

const widthSmall = {
  width: '7em',
}

const widthMedium = {
  width: '10em',
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

const containerSx = {
  minWidth: '50em',
}

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
})

const SeshStyle = {
  clickableSessionDataSx,
  containerSx,
  cursorPointer,
  darkTheme,
  dataSx: sessionDataSx,
  headerSx,
  sessionDataSx,
  subGridSx,
  widthLarge,
  widthMedium,
  widthSmall,
}
export default SeshStyle
