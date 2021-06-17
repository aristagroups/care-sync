/* eslint-disable import/no-cycle */
import {
    faBell,
    faColumns,
    faStethoscope,
    faUserMd,
    // eslint-disable-next-line prettier/prettier
    faWaveSquare
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import { makeStyles } from '@material-ui/core/styles';
import React, { useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router';
import { Link, Route, Switch } from 'react-router-dom';
import { db } from '../../API/firebase';
import SignOutBtn from '../../Components/Buttons/SignOutBtn/SignOutBtn';
import Alerts from '../../Menus/SideMenus/Alerts';
import Dashboard from '../../Menus/SideMenus/Dashboard';
import Doctors from '../../Menus/SideMenus/Doctors';
import Sequence from '../../Menus/SideMenus/Sequence';
import Stuff from '../../Menus/SideMenus/Stuff';
import styles from './ControlPanel.module.css';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        marginLeft: drawerWidth,
    },
    appBar: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
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
        padding: theme.spacing(0),
    },
}));

export default function PermanentDrawerLeft() {
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

    return (
        <div className={classes.root} id={styles.fixedDr}>
            <CssBaseline />
            <Drawer
                className={classes.drawer}
                variant="permanent"
                classes={{
                    paper: classes.drawerPaper,
                }}
                anchor="left"
            >
                <div className={classes.toolbar} />
                <List>
                    <div style={{ width: drawerWidth }} className={styles.sideBar}>
                        <div className={styles.logo}>
                            <h1>Logo</h1>
                        </div>
                        <div className={styles.nav}>
                            <ul className={styles.navList}>
                                {(url.includes('admin') ||
                                    url.includes('receptionist') ||
                                    url.includes('assistant')) && (
                                    <li>
                                        <Link to={`${url}/dashboard`}>
                                            <span>
                                                <FontAwesomeIcon
                                                    className={styles.plusIcon}
                                                    icon={faColumns}
                                                    size="2x"
                                                />
                                            </span>{' '}
                                            Dashboard
                                        </Link>
                                    </li>
                                )}
                                {(url.includes('admin') || url.includes('receptionist')) && (
                                    <li>
                                        <Link to={`${url}/stuff/doctors`}>
                                            <span>
                                                <FontAwesomeIcon
                                                    className={styles.plusIcon}
                                                    icon={faStethoscope}
                                                    size="2x"
                                                />
                                            </span>{' '}
                                            Stuff
                                        </Link>
                                    </li>
                                )}
                                {url.includes('admin') && (
                                    <li>
                                        <Link to={`${url}/alerts`}>
                                            <span>
                                                <FontAwesomeIcon
                                                    className={styles.plusIcon}
                                                    icon={faBell}
                                                    size="2x"
                                                />
                                            </span>{' '}
                                            Alerts
                                        </Link>
                                    </li>
                                )}
                                {url.includes('admin') && (
                                    <li>
                                        <Link to={`${url}/sequence`}>
                                            <span>
                                                <FontAwesomeIcon
                                                    className={styles.plusIcon}
                                                    icon={faWaveSquare}
                                                    size="2x"
                                                />
                                            </span>{' '}
                                            Sequence
                                        </Link>
                                    </li>
                                )}
                                {url.includes('assistant') && (
                                    <li>
                                        <Link to={`${url}/doctors`}>
                                            <span>
                                                <FontAwesomeIcon
                                                    className={styles.plusIcon}
                                                    icon={faUserMd}
                                                    size="2x"
                                                />
                                            </span>{' '}
                                            Doctors
                                        </Link>
                                    </li>
                                )}
                                {url.includes('doctor') && (
                                    <li>
                                        <Link to={`${url}/self-sequence`}>
                                            <span>
                                                <FontAwesomeIcon
                                                    className={styles.plusIcon}
                                                    icon={faWaveSquare}
                                                    size="2x"
                                                />
                                            </span>{' '}
                                            Sequence
                                        </Link>
                                    </li>
                                )}
                            </ul>
                        </div>
                        <div className={styles.signOutBtn}>
                            <SignOutBtn />
                        </div>
                    </div>
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
