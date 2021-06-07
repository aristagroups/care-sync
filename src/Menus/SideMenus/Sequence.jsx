/* eslint-disable no-alert */
/* eslint-disable object-shorthand */
/* eslint-disable jsx-a11y/no-onchange */
/* eslint-disable import/no-cycle */
/* eslint-disable no-shadow */
/* eslint-disable react/no-array-index-key */
import React, { useContext, useEffect, useState } from 'react';
import { Card, CardDeck, Col, Container, Row } from 'react-bootstrap';
import { updateDr } from '../../API/Api';
import { db } from '../../API/firebase';
import { DataContext, GlobalContext, ModalContext } from '../../App';
import AddAlertBtn from '../../Components/Buttons/AddAllertBtn/AddAlertBtn';
import SaveBtn from '../../Components/Buttons/SaveBtn/SaveBtn';
import RoomCard from '../../Components/Cards/RoomCard/RoomCard';
import DroppedRoom from '../../Components/Rooms/DroppedRoom/DroppedRoom';
import Add from '../../Modals/Add/Add';
import Del from '../../Modals/Del/Del';
import Update from '../../Modals/Update/Update';
import styles from './Sequence.module.css';

const Sequence = ({ drList }) => {
    const [globalData, updateGlobalData] = useContext(GlobalContext);
    const [mod, setMod] = useContext(ModalContext);

    const [info, setInfo] = useContext(DataContext);
    const [roomData, setRoomData] = useState([]);
    const [open, setOpen] = useState(null);
    const [specificDr, setSpecificDr] = useState({});
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        async function getData() {
            const roomList = [];
            const snapshot = await db.collection('rooms').get();
            snapshot.forEach((doc) => {
                const appObj = { id: doc.id, name: doc.data().name };
                roomList.push(appObj);
            });
            setRoomData(roomList);
        }
        getData();

        updateGlobalData({
            dr: {
                specificDr,
                rooms,
            },
        });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [roomData, specificDr]);

    const onOpenModal = () => {
        setOpen(true);
    };

    const handleAddData = () => {
        setInfo({
            method: 'add',
            type: 'room',
            collection: 'rooms',
            onOpenModal,
        });
    };

    const handleDelData = (id) => {
        setInfo({
            method: 'del',
            type: 'room',
            collection: 'rooms',
            id,
            onOpenModal,
        });
    };

    const handleSearchUpdate = (id) => {
        setInfo({
            method: 'update',
            type: 'room',
            collection: 'rooms',
            id,
            onOpenModal,
        });
    };

    const handleUpdateData = (id) => {
        setInfo({
            method: 'update',
            type: 'room',
            collection: 'rooms',
            id,
            onOpenModal,
        });
        console.log(id);
    };

    const updateData = () => {
        console.log(globalData);
        updateDr(globalData);
        setRooms([]);
        setSpecificDr({});
        updateGlobalData({});
    };

    const drApiCall = (e) => {
        e.preventDefault();

        updateData();
    };

    const drSelect = (e) => {
        const selectedDr = drList.find((dr) => dr.name === e.target.value);
        setSpecificDr(selectedDr);
    };

    const view = () => {
        console.log(rooms);
    };

    const selected = (room) => {
        rooms.push(room.name);
        view();
    };

    const updateRoomList = (roomList) => {
        setRooms(roomList);
    };

    return (
        <Container fluid className={styles.sequenceContainer}>
            <Row>
                <Col md={6}>
                    <label htmlFor="DrSelect">
                        Choose a Doctor
                        <div className={styles.wrapper}>
                            <select
                                name="DrSelect"
                                id="DrSelect"
                                onChange={(e) => drSelect(e)}
                                className={styles.DrSelect}
                            >
                                {drList.map((dr, index) => (
                                    <option key={index}>{dr.name}</option>
                                ))}
                            </select>
                        </div>
                    </label>
                </Col>
                <Col md={6} style={{ textAlign: 'right' }}>
                    <SaveBtn handleClick={drApiCall} name="Save" />
                </Col>
            </Row>

            <Row>
                <Col md={12} className={styles.dropBoxParent}>
                    <div id={styles.DropBox}>
                        {rooms.map((room, index) => {
                            return (
                                <DroppedRoom
                                    room={room}
                                    specificDr={specificDr}
                                    key={index}
                                    handleDelData={handleDelData}
                                    handleUpdateData={handleUpdateData}
                                    rooms={rooms}
                                    updateRoomList={updateRoomList}
                                    roomData={roomData}
                                    handleSearchUpdate={handleSearchUpdate}
                                />
                            );
                        })}
                    </div>
                </Col>
            </Row>

            <h2 style={{ marginBottom: '20px' }}>Select rooms to show in the box</h2>
            <CardDeck
                style={{
                    paddingLeft: '15px',
                    display: 'flex',
                    flexWrap: 'wrap',
                }}
            >
                <Card className={styles.createRoom}>
                    <AddAlertBtn handleClick={handleAddData} />
                    <span style={{ marginTop: '5px' }}>Add a room</span>
                </Card>
                {roomData.map((room, index) => (
                    <RoomCard
                        room={room}
                        key={index}
                        handleDelData={handleDelData}
                        handleUpdateData={handleUpdateData}
                        selected={selected}
                        specificDr={specificDr}
                        rooms={rooms}
                    />
                ))}
            </CardDeck>

            <Add />
            <Del />
            <Update />
        </Container>
    );
};

export default Sequence;
