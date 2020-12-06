import {createMuiTheme, ThemeProvider, StylesProvider, jssPreset} from '@material-ui/core/styles'
import {create} from 'jss'
import rtl from 'jss-rtl'
import { useEffect } from 'react'
import {NoSsr} from '@material-ui/core'

const jss = create({plugins: [...jssPreset().plugins, rtl()]})

const theme = createMuiTheme({
    direction: 'rtl',
    palette: {
        primary: {
            main: '#ff9100'
        },
        secondary: {
            main: '#b71c1c'
        }
    },
    typography: {
        fontFamily: ['Vazir', 'Roboto'].join(',')
    }
})

export default function Layout({children}) {
    useEffect(() => {
        document.body.setAttribute("dir", "rtl")
    })
    return (
        <StylesProvider jss={jss}>
            <ThemeProvider theme={theme}>
                <NoSsr>
                {children}
                </NoSsr>
            </ThemeProvider>
        </StylesProvider>
    )
}