import { createTheme } from '@mui/material'

const baseDataElementSx = {
  border: '1px solid white',
  width: '10em',
}

const headerSx = {
  ...baseDataElementSx,
}

const dataSx = {
  ...baseDataElementSx,
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
  headerSx,
  dataSx,
  darkTheme,
  containerSx,
  PopperPlayerStyle,
}
export default SeshStyle
