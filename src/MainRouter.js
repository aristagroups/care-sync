/* eslint-disable import/no-cycle */
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AdminLogin from './Pages/AdminLogin/AdminLogin';
import AssistantRegistration from './Pages/AssistantRegistration/AssistantRegistration';
import ControlPanel from './Pages/ControlPanel/ControlPanel';
import DoctorRegistration from './Pages/DoctorRegistration/DoctorRegistration';
import Home from './Pages/Home/Home';
import ReceptionistLogin from './Pages/ReceptionistLogin/ReceptionistLogin';
import PrivateRoute from './PrivateRoute';

const MainRouter = () => (
    <Router>
        <Switch>
            <Route exact path="/">
                <Home />
            </Route>
            <Route exact path="/login">
                <AdminLogin />
            </Route>
            <Route exact path="/receptionist-login">
                <ReceptionistLogin />
            </Route>
            <Route exact path="/doctor-registration">
                <DoctorRegistration />
            </Route>
            <Route exact path="/assistant-registration">
                <AssistantRegistration />
            </Route>

            <PrivateRoute path="/admin">
                <ControlPanel />
            </PrivateRoute>
            <PrivateRoute path="/assistant">
                <ControlPanel />
            </PrivateRoute>
            <PrivateRoute path="/doctor">
                <ControlPanel />
            </PrivateRoute>
            <PrivateRoute path="/receptionist">
                <ControlPanel />
            </PrivateRoute>
        </Switch>
    </Router>
);

export default MainRouter;
