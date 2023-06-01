import { createTheme } from '@mui/material'

const baseDataElementSx = {
  border: '1px solid white',
  width: '10em',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
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
  minWidth: '40em',
}

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
})

const PopperPlayerStyle = {
  background: 'gray',
}
const SeshStyle = {
  clickableSessionDataSx,
  containerSx,
  cursorPointer,
  darkTheme,
  dataSx: sessionDataSx,
  headerSx,
  PopperPlayerStyle,
  sessionDataSx,
}
export default SeshStyle
