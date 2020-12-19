import {useState} from 'react'

import {Router, useRouter} from 'next/router'

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
    Button,
    Snackbar,
} from '@material-ui/core'
import {fade} from '@material-ui/core/styles/colorManipulator'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import EmailIcon from '@material-ui/icons/Email'
import LockIcon from '@material-ui/icons/Lock'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import FaceIcon from '@material-ui/icons/Face'
import CloseIcon from '@material-ui/icons/Close'
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
    },
    "snackbar--error": {
        '& .MuiPaper-root': {
            backgroundColor: theme.palette.error.dark,
            color: theme.palette.error.contrastText,
            '& .MuiSvgIcon-root': {
                color: theme.palette.error.contrastText
            }
        }
    },
    "snackbar--success": {
        "& .MuiPaper-root": {
            backgroundColor: theme.palette.success.main,
            color: theme.palette.success.contrastText,
            '& .MuiSvgIcon-root': {
                color: theme.palette.success.contrastText
            }
        }
    }
}))

export default function Login() {
    const classes = useLoginStyles()

    const router = useRouter()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [snackbar, setSnackbar] = useState({open: false, type:"default", message:""})

    const PostData = () => {
        if (email === "" || password === ""){
            return
        }
        fetch("http://localhost:5000/signin", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                password
            })
        })
        .then(res => res.json())
        .then(data => {
            if (data.error) {
                if(data.error == "Invalid email or password") {
                    setSnackbar({
                        open: true,
                        type: "error",
                        message: "نشانی رایانامه و یا رمز عبور وارد شده درست نمی باشد."
                    })
                }
            } else {
                setSnackbar({
                    open: true,
                    type: "success",
                    message: `${data.user.name} به فوتوگرام خوش آمدید.`
                })
                setTimeout(() => router.push("/"), 5000)
            }
        })
        .catch(error => {
            setSnackbar({
                open: true,
                type: "error",
                message: "خطا در ارتباط با سرور"
            })
        })
    }
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
                            value={email}
                            onChange={event => setEmail(event.target.value)}
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
                            value={password}
                            onChange={event => setPassword(event.target.value)}
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
                    onClick={e => PostData()}
                    startIcon={<ExitToAppIcon />}>
                        ورود
                    </Button>
                </CardActions>
            </Card>
            <Snackbar
            message={snackbar.message}
            action={
                <IconButton onClick={() => setSnackbar({...snackbar, open: false})}>
                    <CloseIcon />
                </IconButton>
            }
            open={snackbar.open}
            onClose={() => setSnackbar({...snackbar, open: false})}
            anchorOrigin={{vertical: "top", horizontal: "center"}}
            className={classes[`snackbar--${snackbar.type}`]}>
            </Snackbar>
        </Box>
    )
}