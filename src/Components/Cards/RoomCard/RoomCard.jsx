/* eslint-disable react/button-has-type */
/* eslint-disable import/no-cycle */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-shadow */
import { faPen, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import { DataContext, GlobalContext } from '../../../App';
import styles from './RoomCard.module.css';

const RoomCard = (props) => {
    const [globalData, updateGlobalData] = useContext(GlobalContext);
    const [info, setInfo] = useContext(DataContext);
    const [roomId, setRoomId] = useState(null);
    const { handleDelData, handleUpdateData, room, selected, specificDr, rooms } = props;
    const [onCard, setOnCard] = useState([]);

    const handelDel = () => {
        handleDelData(room.id);
    };

    const handleUpdate = () => {
        handleUpdateData(room.id);
    };
    const roomList = [];
    const checkToAdd = () => {
        return roomList.includes(room);
    };
    const clickHandler = (event) => {
        event.preventDefault();
        selected(room);
        roomList.push(room);
        checkToAdd();
    };

    return (
        <Card className={styles.createRoom}>
            <Card.Header className={styles.roomCardTop}>
                <div>
                    <Button onClick={() => handelDel()} className={styles.topBtn}>
                        <FontAwesomeIcon className={styles.crossIcon} icon={faTimes} size="1x" />
                    </Button>
                </div>
                <div>
                    <Button className={styles.topBtn} onClick={() => handleUpdate()}>
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
                <button
                    onClick={(e) => clickHandler(e)}
                    className={[styles.effect, styles.effect4].join(' ')}
                >
                    {room.name}
                </button>
            </Card.Body>
            <div style={{ minHeight: '25px' }}>
                <span
                    style={{
                        color: 'var(--color4)',
                        minHeight: '25px !important',
                    }}
                >
                    {rooms.includes(room.name) ? globalData.dr.specificDr.name : false}
                </span>
            </div>
        </Card>
    );
};

export default RoomCard;
