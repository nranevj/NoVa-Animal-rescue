import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {Feed} from './Feed';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    width: "100%",
    marginLeft: drawerWidth
  },
  appBarHeader: {
      fontWeight: "400",
      marginTop: "1%",
      width: "100%"
  },
  appSubHeader: {
    marginTop: "1%",
    marginBottom: "1%",
    fontStyle: "italic"
  },
  toolBar:{
        display: "block"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
}));

export function Feed1() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute" className={classes.appBar}>
        <Toolbar className={classes.toolBar}>
          <Typography variant="h3" align="center" className={classes.appBarHeader}>
            Animal Rescue Stories
          </Typography>
          <Typography variant="body1" align="center" className={classes.appSubHeader}>
            Read heartfelt stories of rescue, and share your rescued animal stories with others.
          </Typography>
          
        </Toolbar>
      </AppBar>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Feed />
      </main>
    </div>
  );
}
