/* eslint-disable import/no-named-default */
/* eslint-disable import/no-cycle */
/* eslint-disable import/no-extraneous-dependencies */
import { faBell, faColumns, faStethoscope, faWaveSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import MenuIcon from '@material-ui/icons/Menu';
import clsx from 'clsx';
import { default as React, useEffect, useState } from 'react';
import { Link, Route, Switch, useRouteMatch } from 'react-router-dom';
import { db } from '../../API/firebase';
import Alerts from '../../Menus/SideMenus/Alerts';
import Dashboard from '../../Menus/SideMenus/Dashboard';
import Doctors from '../../Menus/SideMenus/Doctors';
import Sequence from '../../Menus/SideMenus/Sequence';
import Stuff from '../../Menus/SideMenus/Stuff';
import styles from './MiniDrawer.module.css';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        marginLeft: theme.spacing(6) + 1,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9) + 1,
        },
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(8, 0, 1, 4),
    },
}));

export default function MiniDrawer() {
    const { path, url } = useRouteMatch();
    const [drList, setDrList] = useState([]);

    useEffect(() => {
        async function getDoctors() {
            const drArray = [];
            const snapshot = await db.collection('dashboard').get();
            snapshot.forEach((doc) => {
                const appObj = {
                    id: doc.id,
                    name: doc.id,
                    email: doc.data().email,
                    phone: doc.data().phone,
                    rooms: doc.data().rooms,
                };
                drArray.push(appObj);
            });
            setDrList(drArray);
        }

        getDoctors();
    }, [drList]);
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <div className={classes.root} id={styles.miniDr}>
            <CssBaseline />
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, {
                            [classes.hide]: open,
                        })}
                    >
                        <MenuIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Drawer
                style={{ backgroundColor: 'var(--color4)' }}
                id={styles.sideBar}
                variant="permanent"
                className={clsx(classes.drawer, {
                    [classes.drawerOpen]: open,
                    [classes.drawerClose]: !open,
                })}
                classes={{
                    paper: clsx({
                        [classes.drawerOpen]: open,
                        [classes.drawerClose]: !open,
                    }),
                }}
            >
                <div className={classes.toolbar}>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </div>
                <div className={styles.logo}>
                    <h1>Logo</h1>
                </div>
                <List>
                    <Link to={`${url}/dashboard`}>
                        <ListItem button>
                            <ListItemIcon>
                                <FontAwesomeIcon
                                    style={{ marginLeft: '5px' }}
                                    className={styles.plusIcon}
                                    icon={faColumns}
                                    size="2x"
                                />
                            </ListItemIcon>
                            <ListItemText>Dashboard</ListItemText>
                        </ListItem>
                    </Link>
                    <Link to={`${url}/stuff/doctors`}>
                        <ListItem button>
                            <ListItemIcon>
                                <FontAwesomeIcon
                                    style={{ marginLeft: '5px' }}
                                    className={styles.plusIcon}
                                    icon={faStethoscope}
                                    size="2x"
                                />
                            </ListItemIcon>
                            <ListItemText>Stuff</ListItemText>
                        </ListItem>
                    </Link>
                    <Link to={`${url}/alerts`}>
                        <ListItem button>
                            <ListItemIcon>
                                <FontAwesomeIcon
                                    style={{ marginLeft: '5px' }}
                                    className={styles.plusIcon}
                                    icon={faBell}
                                    size="2x"
                                />
                            </ListItemIcon>
                            <ListItemText>Alerts</ListItemText>
                        </ListItem>
                    </Link>
                    <Link to={`${url}/sequence`}>
                        <ListItem button>
                            <ListItemIcon>
                                <FontAwesomeIcon
                                    style={{ marginLeft: '5px' }}
                                    className={styles.plusIcon}
                                    icon={faWaveSquare}
                                    size="2x"
                                />
                            </ListItemIcon>
                            <ListItemText>Sequence</ListItemText>
                        </ListItem>
                    </Link>
                </List>
            </Drawer>
            <main className={classes.content}>
                <div className={styles.main}>
                    <Switch>
                        <Route path={`${path}/dashboard`}>
                            <Dashboard />
                        </Route>
                    </Switch>
                    <Switch>
                        <Route path={`${path}/stuff`}>
                            <Stuff />
                        </Route>
                    </Switch>
                    <Switch>
                        <Route path={`${path}/alerts`}>
                            <Alerts />
                        </Route>
                    </Switch>
                    <Switch>
                        <Route path={`${path}/sequence`}>
                            <Sequence drList={drList} />
                        </Route>
                    </Switch>
                    <Switch>
                        <Route path={`${path}/doctors`}>
                            <Doctors />
                        </Route>
                    </Switch>
                    <Switch>
                        <Route path={`${path}/self-sequence`}>{/* <DrSequence /> */}</Route>
                    </Switch>
                </div>
            </main>
        </div>
    );
}
