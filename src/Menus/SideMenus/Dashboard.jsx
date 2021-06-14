/* eslint-disable no-shadow */
/* eslint-disable array-callback-return */
/* eslint-disable react/no-array-index-key */
/* eslint-disable import/no-cycle */
import React, { useContext, useEffect, useState } from 'react';
import { CardDeck, Col, Container, Row } from 'react-bootstrap';
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

    useEffect(() => {
        async function getData() {
            const drList = [];
            const res = await db.collection('dashboard').get();
            res.forEach((doc) => {
                const item = doc.data();
                const appObj = {
                    dr: item?.dr,
                    rooms: item?.rooms,
                    id: doc.id,
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

    return (
        <Container fluid id={styles.dashboard}>
            {data.map((doc, index) => (
                <Row key={index} className={styles.drDeck}>
                    <Col md={3} className={styles.drArea}>
                        <div className={styles.drAreaWrapper}>
                            <div className={styles.drAreaTop}>
                                <ResetBtn />
                            </div>
                            <div className={styles.drAreaTitle}>
                                <h1>{doc.id}</h1>
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
