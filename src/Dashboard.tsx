import React             from 'react'                                        ;   
import PropTypes         from 'prop-types'                                   ;   
import classNames        from 'classnames'                                   ;   
import                   {    withStyles, StyleRulesCallback, createStyles, WithStyles } from '@material-ui/core/styles' ;
import                   {    mainListItems }            from './listItems'              ;
import CssBaseline       from '@material-ui/core/CssBaseline'                ;   
import Drawer            from '@material-ui/core/Drawer'                     ;   
import AppBar            from '@material-ui/core/AppBar'                     ;   
import Toolbar           from '@material-ui/core/Toolbar'                    ;   
import List              from '@material-ui/core/List'                       ;   
import Typography        from '@material-ui/core/Typography'                 ;   
import Divider           from '@material-ui/core/Divider'                    ;   
import IconButton        from '@material-ui/core/IconButton'                 ;   
import Badge             from '@material-ui/core/Badge'                      ;   
import MenuIcon          from '@material-ui/icons/Menu'                      ;   
import ChevronLeftIcon   from '@material-ui/icons/ChevronLeft'               ;   
import NotificationsIcon from '@material-ui/icons/Notifications'             ;   
import { Paper } from '@material-ui/core';
import Prism from './controls/Prism';
import Quote from "./controls/Quote";
import { GettingStarted } from './pages/GettingStarted';
import { Installation } from './pages/Installation';
import { Route } from 'react-router';
import { Dispatcher } from './pages/Dispatcher';
import { Action } from './pages/Action';
import { ContextApi } from './pages/ContextApi';
import { Debugger } from './pages/Debugger';
import { Store } from './pages/Store';
import { View } from './pages/View';

const drawerWidth = 240;

const sample: string = `export default class Test() {

}`.toString();

const styles = theme => createStyles({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display        : 'flex'     ,
    alignItems     : 'center'   ,
    justifyContent : 'flex-end' ,
    padding        : '0 8px'    ,
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing   : theme.transitions.easing.sharp           ,
      duration : theme.transitions.duration.leavingScreen ,
    }),
  },
  appBarShift: {
    marginLeft : drawerWidth                     ,
    width      : `calc(100% - ${drawerWidth}px)` ,
    transition: theme.transitions.create(['width', 'margin'], {
      easing   : theme.transitions.easing.sharp            ,
      duration : theme.transitions.duration.enteringScreen ,
    }),
  },
  menuButton: {
    marginLeft  : 12 ,
    marginRight : 36 ,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position   : 'relative'  ,
    whiteSpace : 'nowrap'    ,
    width      : drawerWidth ,
    transition: theme.transitions.create('width', {
      easing   : theme.transitions.easing.sharp            ,
      duration : theme.transitions.duration.enteringScreen ,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing   : theme.transitions.easing.sharp           ,
      duration : theme.transitions.duration.leavingScreen ,
    }),
    width: theme.spacing.unit * 0,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 0,
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow : 1                      ,
    padding  : theme.spacing.unit * 3 ,
    height   : '100vh'                ,
    overflow : 'auto'                 ,
  },
  chartContainer: {
    marginLeft: -22,
  },
  tableContainer: {
    height: 320,
  },
  h5: {
    marginBottom: theme.spacing.unit * 2,
  },
});

interface Props extends WithStyles<typeof styles> {

}

export default withStyles(styles)(class Dashboard extends React.Component<Props> {
  state = {
    open: true,
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <CssBaseline />
        <div className={classes.root}>
          <AppBar
            position="absolute"
            className={classNames(classes.appBar, this.state.open && classes.appBarShift)}
          >
            <Toolbar disableGutters={!this.state.open} className={classes.toolbar}>
              <IconButton
                color="inherit"
                aria-label="Open drawer"
                onClick={this.handleDrawerOpen}
                className={classNames(
                  classes.menuButton,
                  this.state.open && classes.menuButtonHidden,
                )}
              >
                <MenuIcon />
              </IconButton>
              <Typography
                component="h1"
                variant="h6"
                color="inherit"
                noWrap
                className={classes.title}
              >
                <em>Shadow-Flux</em>
              </Typography>
              <IconButton color="inherit">
                <Badge badgeContent={4} color="secondary">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
            </Toolbar>
          </AppBar>
          <Drawer
            variant="permanent"
            classes={{
              paper: classNames(classes.drawerPaper, !this.state.open && classes.drawerPaperClose),
            }}
            open={this.state.open}
          >
            <div className={classes.toolbarIcon}>
              <IconButton onClick={this.handleDrawerClose}>
                <ChevronLeftIcon />
              </IconButton>
            </div>
            <Divider />
            <List>{mainListItems}</List>
          </Drawer>
          <main className={classes.content}>
            <div className={classes.appBarSpacer} />
            <Route exact path="/" component={GettingStarted} />
            <Route exact path="/getting-started" component={GettingStarted} />
            <Route exact path="/installation" component={Installation} />
            <Route exact path="/dispatcher" component={Dispatcher} />
            <Route exact path="/action" component={Action} />
            <Route exact path="/context-api" component={ContextApi} />
            <Route exact path="/debugging" component={Debugger} />
            <Route exact path="/store" component={Store} />
            <Route exact path="/view" component={View} />
          </main>
        </div>
      </React.Fragment>
    );
  }
});