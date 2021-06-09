/* eslint-disable array-callback-return */
/* eslint-disable react/no-array-index-key */
/* eslint-disable import/no-cycle */
import React, { useContext, useEffect, useState } from 'react';
import { CardDeck, Col, Container, Row } from 'react-bootstrap';
import { ErrorBoundary } from 'react-error-boundary';
import { db } from '../../API/firebase';
import { ModalContext } from '../../App';
import ResetBtn from '../../Components/Buttons/ResetBtn/ResetBtn';
import StopBtn from '../../Components/Buttons/StopBtn/StopBtn';
import DashCard from '../../Components/Cards/DashCard/DashCard';
import ErrorFallback from '../../ErrorFallback';
import App from '../../Modals/ModalComponent/App';
import styles from './Dashboard.module.css';

const Dashboard = () => {
    const [mod, setMod] = useContext(ModalContext);
    const [open, setOpen] = useState(false);
    const [data, setData] = useState([]);

    useEffect(() => {
        async function getData() {
            const drList = [];
            const res = await db.collection('dashboard').get();
            res.forEach((doc) => {
                const item = doc.data().data;
                const appObj = {
                    dr: item.dr,
                    rooms: item.rooms,
                };
                drList.push(appObj);
            });
            setData(drList);
        }
        getData();
    }, [mod.detail]);

    // console.log(data);

    const onOpenModal = () => {
        setOpen(true);
    };

    const openAlertModal = () => {
        setMod({
            onOpenModal,
        });
    };

    // console.log(data[0]);

    return (
        <ErrorBoundary
            FallbackComponent={ErrorFallback}
            onReset={() => {
                document.location.reload(true);
            }}
        >
            <Container fluid id={styles.dashboard}>
                {data.map((doc) => (
                    <Row key={doc.dr.id} className={styles.drDeck}>
                        <Col md={3} className={styles.drArea}>
                            <div className={styles.drAreaWrapper}>
                                <div className={styles.drAreaTop}>
                                    <ResetBtn />
                                </div>
                                <div className={styles.drAreaTitle}>
                                    <h1>{doc.dr.name}</h1>
                                    <p>Therapist</p>
                                </div>
                                <div className={styles.drAreaBottom}>
                                    <p>
                                        <strong>- 5 +</strong>
                                    </p>
                                    <p>
                                        <span>in line</span>
                                    </p>
                                    <StopBtn />
                                </div>
                            </div>
                        </Col>
                        <Col md={9} className={styles.dropBoxParent}>
                            <CardDeck id={styles.DropBox}>
                                {doc.rooms.map((room) => (
                                    <DashCard
                                        key={room.id}
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
        </ErrorBoundary>
    );
};

export default Dashboard;
