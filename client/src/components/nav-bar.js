import Link from 'next/link'

import Grid from '@material-ui/core/Grid'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Hidden from '@material-ui/core/Hidden'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import {makeStyles} from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
    root: {
        padding: `${theme.spacing(1)} 0`,
        minHeight: '80px',
        minWidth: "100%",
        maxWidth: "100%",
        backgroundColor: theme.palette.background.default
    },
    menuIcon: {
        margin: `0 ${theme.spacing(1)}`
    },
    navBrand: {
        flexGrow: 1,
        marginRight: theme.spacing(2)
    }
}))

export default function NavBar() {
    const classes = useStyles()
    return (
        <AppBar
        className={classes.root}
        position="sticky">
            <Toolbar>
                <Grid
                container
                justify="flex-start"
                alignItems="center"
                spacing={2}>
                    <Hidden
                    smUp>
                        <Grid
                        item
                        xs={2}>
                            <IconButton
                            className={classes.menuIcon} 
                            edge="start">
                                <MenuIcon />
                            </IconButton>
                        </Grid>
                    </Hidden>
                    <Grid
                    item
                    xs={10}
                    md={4}>
                    <Link
                    href="/">
                        <Button>
                        <Typography
                        className={classes.navBrand} 
                        variant="h6"
                        color="primary">
                            فوتوگرام
                        </Typography>
                        </Button>
                    </Link>
                    </Grid>
                    <Hidden
                    smDown>
                        <Grid
                        item
                        xs={false}
                        md={8}>
                            <Grid
                            container
                            justify="flex-end">
                                <Link
                                href="/login">
                                    <Button
                                    color="primary">
                                        ورود
                                    </Button>
                                </Link>
                                <Link
                                href="/signup">
                                    <Button
                                    color="primary">
                                        ثبت نام
                                    </Button>
                                </Link>
                                <Link
                                href="/profile">
                                    <Button
                                    color="primary">
                                        پروفایل
                                    </Button>
                                </Link>
                                <Link
                                href="/create-post">
                                    <Button
                                    color="primary">
                                        ایجاد پست
                                    </Button>
                                </Link>
                            </Grid>
                        </Grid>
                    </Hidden>
                </Grid>
            </Toolbar>
        </AppBar>
    )
}