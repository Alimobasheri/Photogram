import Head from 'next/head'

import { Avatar, Box, Card, CardContent, CardHeader, CardMedia, Grid, makeStyles, Typography, fade, Button, IconButton } from '@material-ui/core'
import FavoriteIcon from '@material-ui/icons/Favorite'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import CommentOutlinedIcon from '@material-ui/icons/CommentOutlined'
import ShareIcon from '@material-ui/icons/Share'
import styles from '../styles/Home.module.css'

const feedPosts = [
  {
    media: "p2.jpg",
    postedBy: {
      name: "جعفر هاشمی",
      user_name: "jaffar_hashemi"
    },
    location: "تهرانپارس، تهران",
    text: "یه روز خوب! #kos",
    likesCount: 45
  },
  {
    media: "p3.jpg",
    postedBy: {
      name: "جعفر هاشمی",
      user_name: "jaffar_hashemi"
    },
    location: "سهروردی، تهران",
    text: "دریاب که از روح جدا خواهی رفت / در پرده ی اسرار فنا خواهی رفت. می نوش ندانی ز کجا آمده ای / خوش باش ندانی به کجا خواهی",
    likesCount: 820
  },
  {
    media: "p4.jpg",
    postedBy: {
      name: "جعفر هاشمی",
      user_name: "jaffar_hashemi"
    },
    location: "لاهیجان، گیلان",
    text: "نیومدی و رفتیم...",
    likesCount: 360
  }
]

const useHomeStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "stretch"
  },
  postsWrapper: {
    padding: `${theme.spacing(1)}px ${theme.spacing(5)}px`,
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(1)
    }
  },
  postCard: {
    margin: theme.spacing(3),
    backgroundColor: fade(theme.palette.primary.contrastText, 0.07),
    borderRadius: theme.spacing(2)
  },
  postPhoto: {
    width: '100%',
    height: theme.spacing(40),
    boxShadow: theme.shadows[8],
    borderRadius: theme.spacing(2)
  },
  postTextWrapper: {
    marginTop: theme.spacing(2)
  }
}))

export default function Home() {
  const classes = useHomeStyles()
  return (
    <Box
    className={classes.root}
    component="main">
      <Head>
        <title>خانه - فوتوگرام</title>
      </Head>
      <Grid
      container
      className={classes.postsWrapper}
      justify="center"
      alignItems="flex-end"
      wrap="wrap">
        {
          [].concat(feedPosts, feedPosts, feedPosts).map(post => {
            return (
              <Grid
              item
              xs={12}
              md={4}
              lg={3}>
                <Card
                className={classes.postCard}
                elevation={0}>
                  <CardHeader
                  title={post.postedBy.name}
                  subheader={post.location}
                  avatar={<Avatar src={`/profiles/${post.postedBy.user_name}.jpg`} />} />
                  <CardContent>
                    <CardMedia
                    className={classes.postPhoto}
                    image={`/user_posts/${post.postedBy.user_name}/${post.media}`}/>
                    <Grid
                    container
                    className={classes.postTextWrapper}
                    direction="column"
                    justify="space-evenly"
                    alignItems="flex-start">
                      <Grid
                      item
                      xs={12}>
                        <Typography
                        variant="body1">
                          {post.likesCount} نفر پسندیده اند
                        </Typography>
                      </Grid>
                      <Grid
                      item
                      className={classes.postActionsWrapper}>
                        <IconButton
                        color="secondary">
                          <FavoriteBorderIcon />
                        </IconButton>
                        <IconButton>
                          <CommentOutlinedIcon />
                        </IconButton>
                        <IconButton
                        color="primary">
                          <ShareIcon />
                        </IconButton>
                      </Grid>
                      <Grid
                      item>
                        <Typography variant="body1">{post.postedBy.name}</Typography>
                        <Typography variant="body2">{post.text}</Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            )
          })
        }
      </Grid>
    </Box>
  )
}
