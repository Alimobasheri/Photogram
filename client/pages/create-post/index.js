import { Box, Button, Card, CardContent, Grid, IconButton, makeStyles, TextField, Typography } from "@material-ui/core"
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera'
import Head from "next/head"

const useCreatePostStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(5),
        display: "flex",
        justifyContent: 'center',
        alignItems: 'stretch',
        alignSelf: 'stretch'
    },
    createPostCard: {
        maxWidth: '500px',
        padding: theme.spacing(3),
        '& .MuiGrid-item': {
            margin: theme.spacing(2),
            '&:nth-child(4)': {
                alignSelf: 'stretch',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }
        }
    },
    descriptionInput: {
        width: '100%',
    },
    uploadInput: {
        display: 'none'
    }
}))

export default function CreatePost() {
    const classes = useCreatePostStyles()
    return (
        <Box
        className={classes.root}
        component="div">
            <Head>
                <title>ایجاد پست-فوتوگرام</title>
            </Head>
            <Card
            className={classes.createPostCard}>
                <CardContent>
                    <Grid
                    container>
                        <Grid
                        item
                        xs={12}>
                            <Typography
                            variant="h6">
                                تصویر جدیدی را به اشتراک بگذارید:
                            </Typography>
                        </Grid>
                        <Grid
                        item
                        xs={12}>
                            <TextField
                            className={classes.descriptionInput}
                            type="text-area"
                            label="توضیح"
                            placeholder="یک توضیج مفید..."
                            multiline />
                        </Grid>
                        <Grid
                        item>
                            <input 
                            className={classes.uploadInput}
                            type="file" 
                            accept="image/*"
                            id="fileUpload" />
                            <label
                            htmlFor="fileUpload">
                                <Button
                                variant="contained"
                                color="secondary"
                                component="span"
                                startIcon={<PhotoCameraIcon />}>
                                    آپلود تصویر
                                </Button>
                            </label>
                        </Grid>
                        <Grid
                        item
                        xs={12}>
                            <Button
                            type="submit"
                            variant="contained"
                            color="primary">
                                ثبت پست
                            </Button>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Box>
    )
}