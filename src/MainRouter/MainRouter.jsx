/* eslint-disable import/no-cycle */
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AdminLogin from '../Pages/AdminLogin/AdminLogin';
import AssistantRegistration from '../Pages/AssistantRegistration/AssistantRegistration';
import ControlPanel from '../Pages/ControlPanel/ControlPanel';
import DoctorRegistration from '../Pages/DoctorRegistration/DoctorRegistration';
import Home from '../Pages/Home/Home';
import ReceptionistLogin from '../Pages/ReceptionistLogin/ReceptionistLogin';

const MainRouter = () => (
    <Router>
        <Switch>
            <Route exact path="/">
                <Home />
            </Route>
            <Route exact path="/admin-login">
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

            <Route path="/admin">
                <ControlPanel />
            </Route>
            <Route path="/assistant">
                <ControlPanel />
            </Route>
            <Route path="/doctor">
                <ControlPanel />
            </Route>
            <Route path="/receptionist">
                <ControlPanel />
            </Route>
        </Switch>
    </Router>
);

export default MainRouter;
