/* eslint-disable import/no-cycle */
/* eslint-disable import/no-named-default */
/* eslint-disable import/no-extraneous-dependencies */
import { faBell, faColumns, faStethoscope, faWaveSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
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
import styles from './PersistentDrawerLeft.module.css';

const drawerWidth = '100%';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
            backgroundColor: 'var(--color3)',
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: theme.spacing(0),
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
        backgroundColor: 'var(--color4)',
        display: 'flex',
        msFlexDirection: 'column',
        alignItems: 'center',
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 0),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(0),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
}));

export default function PersistentDrawerLeft() {
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
        <div className={classes.root} id={styles.mobDr}>
            <CssBaseline />
            <AppBar
                style={{ backgroundColor: 'var(--color4)' }}
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >
                <Toolbar>
                    <Typography variant="h6" noWrap>
                        Logo
                    </Typography>
                    <IconButton
                        style={{ marginLeft: 'auto' }}
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="end"
                        className={clsx(classes.menuButton, open && classes.hide)}
                    >
                        <MenuIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={open}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerHeader}>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </div>
                <Divider />
                <List>
                    <Link className={styles.links} to={`${url}/dashboard`}>
                        <ListItem button>
                            <ListItemIcon className={styles.icons}>
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
                    <Link className={styles.links} to={`${url}/stuff/doctors`}>
                        <ListItem button>
                            <ListItemIcon className={styles.icons}>
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
                    <Link className={styles.links} to={`${url}/alerts`}>
                        <ListItem button>
                            <ListItemIcon className={styles.icons}>
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
                    <Link className={styles.links} to={`${url}/sequence`}>
                        <ListItem button>
                            <ListItemIcon className={styles.icons}>
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
