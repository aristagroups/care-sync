/* eslint-disable no-shadow */
/* eslint-disable array-callback-return */
/* eslint-disable react/no-array-index-key */
/* eslint-disable import/no-cycle */
import React, { useContext, useEffect, useState } from 'react';
import { CardDeck, Col, Container, Row } from 'react-bootstrap';
import { addDashData } from '../../API/Api';
import { db } from '../../API/firebase';
import { GlobalContext, ModalContext } from '../../App';
import ResetBtn from '../../Components/Buttons/ResetBtn/ResetBtn';
import StopBtn from '../../Components/Buttons/StopBtn/StopBtn';
import DashCard from '../../Components/Cards/DashCard/DashCard';
import App from '../../Modals/ModalComponent/App';
import styles from './Dashboard.module.css';

const Dashboard = () => {
    const [mod, setMod] = useContext(ModalContext);
    const [globalData, updateGlobalData] = useContext(GlobalContext);
    const [open, setOpen] = useState(false);
    const [data, setData] = useState([]);
    const [state, setState] = useState({});

    const myFunction = () => {
        setState({
            name: 'Jhon',
            surname: 'Doe',
        });
    };

    useEffect(() => {
        async function getData() {
            const drList = [];
            const citiesRef = db.collection('dashboard');
            const snapshot = await citiesRef.get();
            snapshot.forEach((doc) => {
                const item = doc.data();
                const appObj = {
                    dr: item?.dr,
                    email: item?.email,
                    phone: item?.phone,
                    rooms: item?.rooms,
                    id: doc.id,
                };
                drList.push(appObj);
            });
            setData(drList);
        }
        getData();
        myFunction();
        return () => {
            setState({}); // This worked for me
        };
    }, [data, mod.detail, updateGlobalData]);

    // console.log(data);

    const onOpenModal = () => {
        setOpen(true);
    };

    const openAlertModal = () => {
        setMod({
            onOpenModal,
        });
    };

    const reset = (doc) => {
        console.log(doc);
        const emptyRooms = [];
        const newRooms = doc.rooms.map((room) => {
            const rObj = {
                alert: '',
                bg: '',
                border: '',
                id: room.id,
                name: room.id,
            };
            emptyRooms.push(rObj);
        });
        addDashData({
            dr: {
                dr: doc.dr,
                email: doc.email,
                phone: doc.phone,
                id: doc.id,
            },
            rooms: emptyRooms,
        });
    };

    return (
        <Container fluid id={styles.dashboard}>
            {data.map((doc, index) => (
                <Row key={index} className={styles.drDeck}>
                    <Col md={3} className={styles.drArea}>
                        <div className={styles.drAreaWrapper}>
                            <div className={styles.drAreaTop}>
                                <ResetBtn handleClick={() => reset(doc)} />
                            </div>
                            <div className={styles.drAreaTitle}>
                                <h1>{doc.id}</h1>
                                <p>Therapist</p>
                            </div>
                            <div className={styles.drAreaBottom}>
                                <p>
                                    <strong>
                                        {' '}
                                        -{' '}
                                        <span style={{ color: '#FC7E55' }}>
                                            {doc.rooms.length}
                                        </span>{' '}
                                        +{' '}
                                    </strong>
                                </p>
                                <p>
                                    <span
                                        style={{
                                            color: '#969696',
                                            fontWeight: '500',
                                            fontSize: '15px',
                                        }}
                                    >
                                        in line
                                    </span>
                                </p>
                                <StopBtn />
                            </div>
                        </div>
                    </Col>
                    <Col md={9} sm={8} className={styles.dropBoxParent}>
                        <CardDeck id={styles.DropBox}>
                            {doc.rooms?.map((room, index) => (
                                <DashCard
                                    handler={() =>
                                        updateGlobalData({
                                            ...globalData,
                                            arrIndex: index,
                                            docId: doc.id,
                                        })
                                    }
                                    docId={doc.id}
                                    key={room.id}
                                    idx={index}
                                    room={room}
                                    data={doc}
                                    openAlertModal={openAlertModal}
                                />
                            ))}
                        </CardDeck>
                    </Col>
                </Row>
            ))}
            <App />
        </Container>
    );
};

export default Dashboard;
