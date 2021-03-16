import { createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#aaeaff',
            main: '#00e5ff',
            dark: '#00a0b2',
            contrastText: '#222',
        },
        secondary: {
            light: '#7c88cc',
            main: '#5c6bc0',
            dark: '#404a86',
            contrastText: '#eee',
        }
    }
})

export default theme 