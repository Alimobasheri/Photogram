import {useState} from 'react'

import Head from 'next/head'
import {useRouter} from 'next/router'

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
    Button,
    Snackbar,
    SnackbarContent,
    IconButton
} from '@material-ui/core'
import {fade} from '@material-ui/core/styles/colorManipulator'
import { PersonAdd } from '@material-ui/icons'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import EmailIcon from '@material-ui/icons/Email'
import LockIcon from '@material-ui/icons/Lock'
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd'
import CloseIcon from '@material-ui/icons/Close'

const useSignupStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        display: 'flex',
        flexFlow: 'column nowrap',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        minHeight: '100%',
        margin: 0,
        backgroundImage: `url('./wallpapers/street-jungle.jpg')`,
        backgroundPosition: 'top left',
        backgroundSize: 'cover'
    },
    formCard: {
        padding: theme.spacing(2),
        borderTop: `5px solid ${theme.palette.primary.dark}`,
        maxWidth: '640px',
        maxHeight: '800px',
        margin: '50px 0',
        backgroundColor: fade("#eceff1", 0.95),
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

const isValidName = (name, setNameValidity) => {
    if (name === "") {
        setNameValidity({
            valid: false,
            error: "وارد کردن نام ضروری می باشد."
        })
        return
    }

    setNameValidity({
        valid: true,
        error: ""
    })
}
const isValidEmail = (email, setEmailValidity) => {
    if (email === "" || !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)) {
        setEmailValidity({
            valid: false,
            error: "لطفا یک نشانی رایانامه ی معتبر وارد سازید."
        })
        return
    }
    
    setEmailValidity({
        valid: true,
        error: ""
    })
}

const isValidPassword = (password, setPasswordValidity) => {
    if (password.split("").length < 6) {
        setPasswordValidity({
            valid: false,
            error: "رمز عبور حداقل باید 6 کاراکتر باشد."
        })
        return
    }

    setPasswordValidity({
        valid: true,
        error: ""
    })
}

export default function Signup() {
    const classes = useSignupStyles()

    const router = useRouter()

    const [name, setName] = useState("")
    const [nameValidity, setNameValidity] = useState({valid: true, error: ""})
    const [email, setEmail] = useState("")
    const [emailValidity, setEmailValidity] = useState({valid: true, error: ""})
    const [password, setPassword] = useState("")
    const [passwordValidity, setPasswordValidity] = useState({valid: true, error: ""})

    const [snackbar, setSnackbar] = useState({open: false, type:"default", message:""})
    const PostData = () => {
        if (!nameValidity.valid || !emailValidity.valid || !passwordValidity.valid) {
            setSnackbar({
                open: true,
                type: "error",
                message: "لطفا ابتدا تمام اطلاعات خواسته شده را وارد نمایید!"
            })
            return
        }
        fetch("http://localhost:5000/signup", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                email,
                password
            })
        })
        .then(res => res.json())
        .then(data => {
            if(data.error) {
                setSnackbar({
                    open: true,
                    type: "error",
                    message: data.error
                })
            } else {
                setSnackbar({
                    open: true,
                    type: "success",
                    message: "حساب کاربری شما با موفقیت ثبت شد."
                })
                router.push('/login')
            }
        })
    }

    return (
        <Box
        dir="rtl"
        component="main"
        className={classes.root}>
            <Head>
                <title>ثبت نام - فوتوگرام</title>
            </Head>
            <Card
            className={classes.formCard}
            >
                <CardHeader
                color="secondary"
                avatar={<AssignmentIndIcon />}
                title="ثبت پروفایل شخصی">
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
                            label="نام"
                            error={!nameValidity.valid}
                            helperText={nameValidity.error}
                            name="name"
                            id="name"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            onBlur={() => isValidName(name, setNameValidity)}
                            required
                            fullWidth
                            placeholder="جعفر هاشمی"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <AccountCircleIcon />
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
                            label="نشانی رایانامه"
                            error={!emailValidity.valid}
                            helperText={emailValidity.error}
                            name="email"
                            id="email"
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            onBlur={() => isValidEmail(email, setEmailValidity)}
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
                            error={!passwordValidity.valid}
                            helperText={passwordValidity.error}
                            name="password"
                            id="password"
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            onBlur={e => isValidPassword(password, setPasswordValidity)}
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
                    <Button
                    color="primary"
                    type="submit"
                    onClick={e => {e.preventDefault();PostData();}}
                    startIcon={<PersonAdd />}>
                        ثبت نام
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