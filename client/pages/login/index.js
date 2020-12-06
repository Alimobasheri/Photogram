import {
    Box,
    Card,
    CardContent,
    Grid,
    Typography,
    makeStyles,
    CardHeader,
    TextField,
    InputAdornment,
    CardActions,
    IconButton,
    Button
} from '@material-ui/core'
import {fade} from '@material-ui/core/styles/colorManipulator'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import EmailIcon from '@material-ui/icons/Email'
import LockIcon from '@material-ui/icons/Lock'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import FaceIcon from '@material-ui/icons/Face'
import Link from 'next/link'
import Head from 'next/head'

const useLoginStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        display: 'flex',
        flexFlow: 'column nowrap',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        minHeight: '100%',
        margin: 0,
        backgroundImage: `url('./wallpapers/drone-orange-tree.jpg')`,
        backgroundPosition: 'top left',
        backgroundSize: 'cover',
    },
    formCard: {
        padding: theme.spacing(2),
        borderTop: `5px solid ${theme.palette.primary.dark}`,
        maxWidth: '640px',
        maxHeight: '800px',
        margin: '100px 0',
        backgroundColor: fade('#eceff1', 0.9),
        [theme.breakpoints.down('sm')]: {
            maxWidth: '100%',
            maxHeight: 'auto',
            margin: '10px',
        }
    },
    formWrapper: {
        padding: theme.spacing(2),
        width: '100%',
        '& .MuiGrid-item': {
            width: '100%',
            margin: `${theme.spacing(2)}px 0`
        }
    },
    formActions: {
        display: 'flex',
        flexFlow: "row nowrap",
        justifyContent: "flex-end",
        alignItems: "center",
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
            justifyContent: 'center',
        }
    }
}))

export default function Login() {
    const classes = useLoginStyles()
    return (
        <Box
        dir="rtl"
        component="main"
        className={classes.root}>
            <Head>
                <title>ورود-فوتوگرام</title>
            </Head>
            <Card
            className={classes.formCard}
            >
                <CardHeader
                color="secondary"
                avatar={<FaceIcon />}
                title="ورود به حساب شخصی">
                </CardHeader>
                <CardContent>
                    <Grid
                    container
                    spacing={2}
                    className={classes.formWrapper}>
                        <Grid
                        item
                        xs={12}>
                            <TextField
                            dir="rtl"
                            variant="outlined"
                            label="نشانی رایانامه"
                            name="email"
                            id="email"
                            type="email"
                            required
                            fullWidth
                            placeholder="jaffar@example.com"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <EmailIcon />
                                    </InputAdornment>
                                )
                            }}/>
                        </Grid>
                        <Grid
                        item
                        xs={12}>
                            <TextField
                            dir="rtl"
                            variant="outlined"
                            label="کلمه ی عبور"
                            name="password"
                            id="password"
                            type="password"
                            required
                            fullWidth
                            placeholder="******"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <LockIcon />
                                    </InputAdornment>
                                )
                            }}/>
                        </Grid>
                    </Grid>
                </CardContent>
                <CardActions
                className={classes.formActions}>
                    <Link
                    href="/signup">
                        <Button
                        color="secondary">
                            حسابی ندارید؟ عضو شوید!
                        </Button>
                    </Link>
                    <Button
                    variant="outlined"
                    color="primary"
                    startIcon={<ExitToAppIcon />}>
                        ورود
                    </Button>
                </CardActions>
            </Card>
        </Box>
    )
}