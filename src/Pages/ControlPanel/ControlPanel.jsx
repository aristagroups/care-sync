/* eslint-disable import/no-cycle */
import React from 'react';
import { Container } from 'react-bootstrap';
import MiniDrawer from './MiniDrawer';
import PermanentDrawerLeft from './PermanentDrawerLeft';
import PersistentDrawerLeft from './PersistentDrawerLeft';

const ControlPanel = () => {
    return (
        <Container fluid>
            <PermanentDrawerLeft />
            <MiniDrawer />
            <PersistentDrawerLeft />
        </Container>
    );
};

export default ControlPanel;
