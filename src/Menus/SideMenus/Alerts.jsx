/* eslint-disable import/no-cycle */
import React, { useContext, useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { db } from '../../API/firebase';
import { ApiContext, DataContext } from '../../App';
import SaveBtn from '../../Components/Buttons/SaveBtn/SaveBtn';
import Table2 from '../../Components/Tables/Table2/Table2';
import Add from '../../Modals/Add/Add';
import Update from '../../Modals/Update/Update';
import styles from './Alerts.module.css';

const Alerts = () => {
    const [header, setHeader] = useContext(ApiContext);
    const [info, setInfo] = useContext(DataContext);
    const [open, setOpen] = useState(null);
    const [addState, setAddState] = useState({ modal: false });
    const [editState, setEditState] = useState({ modal: false });
    const [allAlerts, setAllAlerts] = useState([]);
    const [alertId, setAlertId] = useState();
    const [state, setState] = useState({});

    const myFunction = () => {
        setState({
            name: 'Jhon',
            surname: 'Doe',
        });
    };

    const selectModalAdd = () => {
        setAddState({ modal: !addState.modal });
    };

    const selectModalEdit = () => {
        setEditState({ modal: !editState.modal });
    };

    useEffect(() => {
        const citiesRef = db.collection('alerts');
        citiesRef.onSnapshot((querySnapshot) => {
            const alertList = [];
            querySnapshot.forEach((doc) => {
                const item = doc.data();
                const appObj = {
                    name: doc.data().name,
                    bg: doc.data().bg,
                    border: doc.data().border,
                    id: doc.id,
                };
                alertList.push(appObj);
            });
            const sortedList = alertList.sort((a, b) => a.name.localeCompare(b.name));
            setAllAlerts(sortedList);
        });
    }, []);

    const onOpenModal = () => {
        setOpen(true);
    };

    // CRUD
    const handleAddData = () => {
        setInfo({
            method: 'add',
            type: 'alert',
            collection: 'alerts',
            onOpenModal,
        });
    };

    const handleUpdateData = (list) => {
        const { id } = list;
        setInfo({
            method: 'update',
            type: 'alert',
            collection: 'alerts',
            id,
            onOpenModal,
        });
    };

    return (
        <Container id={styles.alertsContainer} fluid>
            <Row>
                <Col
                    className={styles.tableRow}
                    md={12}
                    style={{ display: 'flex', justifyContent: 'flex-end' }}
                >
                    <SaveBtn handleClick={handleAddData} name="Add new" />
                </Col>
            </Row>
            <Row
                style={{
                    display: 'flex',
                    height: 'auto',
                    minHeight: '85vh',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Col
                    md={12}
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100%',
                        padding: '0px ',
                    }}
                >
                    <div className={styles.alertContainer}>
                        <Table2 items={allAlerts} handleUpdateData={handleUpdateData} />
                    </div>
                </Col>
            </Row>
            <Add />

            <Update />
        </Container>
    );
};

export default Alerts;
