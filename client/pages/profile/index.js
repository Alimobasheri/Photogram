import Head from 'next/head'

import { Box, Avatar, Grid, makeStyles, Divider, Card, CardMedia, CardActionArea, CardContent, Button } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'

const useProfileStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        display: 'flex',
        flexFlow: 'column nowrap',
        justifyContent: 'flex-start',
        alignItems: 'center',
        height: '100%',
        minHeight: '100%',
        margin: 0
    },
    columnsWrapper: {
        flexGrow: 1,
        alignItems: 'stretch'
    },
    column: {
        flexGrow: 1,
        display: 'flex',
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: 'stretch',
        padding: `0 ${theme.spacing(2)}px`,
        '&:nth-child(1)': {
            padding: theme.spacing(3),
            overflow: 'hidden',
            maxHeight: '100vh',
        }
    },
    columnInnerWrapper: {
        flexGrow: 1,
        padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
        '& .MuiGrid-root.MuiGrid-item': {
            marginBottom: theme.spacing(1)
        },
        '& .MuiDivider-root': {
            height: '1px'
        }
    },
    profileAvatar: {
        position: "relative",
        width: theme.spacing(17),
        height: theme.spacing(17),
        border: `${theme.spacing(1)/4}px solid ${theme.palette.secondary.main}`,
        margin: 0,
        '& img': {
            width: theme.spacing(15),
            height: theme.spacing(15),
            borderRadius: '50%'
        }
    },
    userName: {
        marginLeft: theme.spacing(2)
    },
    userActionButtonsWrapper: {
        alignSelf: "stretch",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center"
    },
    userBio: {
        padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`
    },
    postsTitle:{
        padding: `${theme.spacing(3)}px 0`
    },
    postItem: {
        flexGrow: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "stretch"
    },
    postCard: {
        width: "100%",
        alignSelf: "stretch",
        '& .MuiCardActionArea-root': {
            flexGrow: 1,
            alignSelf: "stretch"
        }
    },
    postPhoto: {
        width: '100%',
        height: theme.spacing(30)
    }
}))

export default function Login() {
    const classes = useProfileStyles()
    const posts = ["p1.jpg", "p2.jpg", "p3.jpg", "p4.jpg"]
    return (
        <Box
        dir="rtl"
        component="main"
        className={classes.root}>
            <Head>
                <title>پروفایل شخصی - فوتوگرام</title>
            </Head>
            <Grid
            container
            className={classes.columnsWrapper}
            direction="row"
            justify="flex-start"
            alignItems="flex-start">
                <Grid
                item
                className={classes.column}
                xs={12}
                md={3}
                lg={2}>
                    <Grid
                    container
                    className={classes.columnInnerWrapper}
                    direction="column"
                    justify="stretch"
                    alignItems="center"
                    spacing={2}>
                        <Grid
                        item>
                            <Avatar className={classes.profileAvatar} alt="profile" src="./profiles/jaffar_hashemi.jpg" />
                        </Grid>
                        <Grid
                        item
                        className={classes.userName}>
                            <Typography variant="h6">
                                جعفر هاشمی
                            </Typography>
                        </Grid>
                        <Divider flexItem variant="fullWidth" orientation="horizontal" />
                        <Grid
                        item>
                            <Typography variant="body2">
                                @jaffar_hashemi
                            </Typography>
                        </Grid>
                        <Grid
                        item
                        className={classes.userActionButtonsWrapper}>
                            <Button
                            variant="contained"
                            color="primary">
                                دنبال کنید
                            </Button>
                            <Button
                            variant="outlined"
                            color="secondary">
                                پیام دهید
                            </Button>
                        </Grid>
                        <Grid
                        item
                        className={classes.userBio}>
                            <Typography variant="body1">
                                شیر همیشه سلطانه، چه تو بیشه چه تو قبرستون... هه!
                            </Typography>
                            <Typography variant="body1">
                                یه آذر ماهی مغرور. 85
                            </Typography>
                        </Grid>
                        <Divider flexItem variant="fullWidth" orientation="horizontal" />
                        <Grid
                        item>
                            <Grid
                            container
                            justify="flex-start"
                            alignItems="flex-start">
                                <Grid
                                item
                                xs={12}>
                                    <Typography variant="h5">4.7k</Typography>
                                    <Typography variant="caption">دنبال کننده</Typography>
                                </Grid>
                                <Divider />
                                <Grid
                                item
                                xs={12}>
                                    <Typography variant="h5">5</Typography>
                                    <Typography variant="caption">دنبال شونده</Typography>
                                </Grid>
                                <Divider />
                                <Grid
                                item
                                xs={12}>
                                    <Typography variant="h5">21</Typography>
                                    <Typography variant="caption">پست</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid
                item
                className={classes.column}
                xs={12}
                md={9}
                lg={10}>
                    <Typography
                    className={classes.postsTitle}
                    variant="h4">
                        آنچه جعفر به اشتراک گذاشته...
                    </Typography>
                    <Grid
                    container
                    justify="space-between"
                    alignItems="stretch"
                    spacing={4}>
                        {
                            posts.map((post, index) => {
                                return (
                                    <Grid
                                    item
                                    className={classes.postItem}
                                    key={index}
                                    xs={12}
                                    md={6}
                                    lg={4}>
                                        <Card
                                        className={classes.postCard}
                                        elevation={8}>
                                            <CardActionArea>
                                                <CardMedia
                                                className={classes.postPhoto}
                                                image={`/user_posts/jaffar_hashemi/${post}`} />
                                            </CardActionArea>
                                            <CardContent>
                                                <Typography
                                                variant="subtitle1">
                                                    {post}
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                )
                            })
                        }
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    )
}