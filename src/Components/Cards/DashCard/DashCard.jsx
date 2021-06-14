/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable import/no-cycle */
/* eslint-disable react/no-array-index-key */
import React, { useContext } from 'react';
import { Card } from 'react-bootstrap';
import { GlobalContext } from '../../../App';
import RBtn from '../../Buttons/RBtn/RBtn';
import styles from './DashCard.module.css';

const DashCard = (props) => {
    // eslint-disable-next-line prettier/prettier

    const { data, room, alertSelector, openAlertModal, selectedAlert, docId, handler } = props;
    const [globalData, updateGlobalData] = useContext(GlobalContext);

    return (
        <div onClick={handler}>
            <Card className={styles.dashCard}>
                <Card.Header className={styles.roomCardTop}>
                    <div className={styles.topLeft}>
                        <span>{room.name}</span>
                        <RBtn />
                    </div>
                    <div className={styles.timer}>
                        <span>10:56</span>
                    </div>
                </Card.Header>
                <Card.Body className={styles.roomCardMid}>
                    <div
                        style={{ backgroundColor: `${room.bg}`, borderColor: `${room.border}` }}
                        className={styles.alert}
                    >
                        <span style={{ color: `${room.border}` }}>1</span>
                    </div>
                    <div>
                        <button
                            onClick={() => openAlertModal()}
                            type="button"
                            className={styles.wrapper}
                        >
                            {room.alert || 'Dropdown Items'}
                        </button>
                    </div>
                </Card.Body>
            </Card>
        </div>
    );
};

export default DashCard;
