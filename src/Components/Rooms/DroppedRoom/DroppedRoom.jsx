/* eslint-disable import/no-cycle */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-shadow */
import { faPen, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import { DataContext, GlobalContext } from '../../../App';
import styles from './DroppedRoom.module.css';

const DroppedRoom = (props) => {
    const [info, setInfo] = useContext(DataContext);
    const [roomId, setRoomId] = useState(null);
    const {
        handleDelData,
        handleUpdateData,
        room,
        selected,
        specificDr,
        updateRoomList,
        rooms,
        handleSearchUpdate,
    } = props;
    const [globalData, updateGlobalData] = useContext(GlobalContext);

    const handelDel = () => {
        const newRoomList = rooms.filter((rm) => rm !== room);
        updateRoomList(newRoomList);
    };

    const handleUpdate = (room) => {
        handleSearchUpdate(room.id);
    };

    const clickHandler = (event) => {
        event.preventDefault();
        selected(room);
    };

    return (
        <Card style={{ overflow: 'hidden' }} className={styles.createRoom}>
            <Card.Header className={styles.roomCardTop}>
                <div>
                    <Button onClick={() => handelDel(room)} className={styles.topBtn}>
                        <FontAwesomeIcon className={styles.crossIcon} icon={faTimes} size="1x" />
                    </Button>
                </div>
                <div>
                    <Button disabled className={styles.topBtn} onClick={() => handleUpdate(room)}>
                        <FontAwesomeIcon className={styles.crossIcon} icon={faPen} size="1x" />
                    </Button>
                </div>
            </Card.Header>

            <Card.Body
                style={{
                    textAlign: 'center',
                    padding: '0',
                    margin: '0',
                    height: 'auto',
                    flex: 'none',
                }}
            >
                <Button onClick={(e) => clickHandler(e)} className={styles.roomNo}>
                    {room}
                </Button>
            </Card.Body>
            <span style={{ marginTop: '5px', color: 'var(--color4)', height: '25px' }}>
                {specificDr.name}
            </span>
        </Card>
    );
};

export default DroppedRoom;
