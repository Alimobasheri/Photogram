import Head from 'next/head'

import { Grid, makeStyles } from '@material-ui/core'

import Layout from '../src/components/layout'
import NavBar from '../src/components/nav-bar'

const useAppStyles = makeStyles(theme => ({
  root: {
    minHeight: '100vh',
    width: '100vw',
    maxWidth: '100vw',
  },
  bodyGridWrapper: {
    flexGrow: 1,
    display: 'flex',
    flexFlow: 'column nowrap',
    justifyContent: "stretch",
    alignItems: "stretch"
  }
}))

import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  const classes = useAppStyles()
  return (
    <Layout>
      <Head>
        <title>فوتوگرام</title>
      </Head>
      <Grid
      container
      direction="column"
      spacing={false}
      className={classes.root}>
        <Grid
        itemxs={12}>
          <NavBar />
        </Grid>
        <Grid
        item
        className={classes.bodyGridWrapper}
        xs={12}>
          <Component {...pageProps} />
        </Grid>
      </Grid>
    </Layout>
  )
}

export default MyApp
