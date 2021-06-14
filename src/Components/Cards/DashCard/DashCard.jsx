/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable import/no-cycle */
/* eslint-disable react/no-array-index-key */
import React, { useContext } from 'react';
import { Card } from 'react-bootstrap';
import { addAlert } from '../../../API/Api';
import { GlobalContext, ModalContext } from '../../../App';
import RBtn from '../../Buttons/RBtn/RBtn';
import styles from './DashCard.module.css';
import MyStopwatch from './MyStopWatch';

const DashCard = (props) => {
    // eslint-disable-next-line prettier/prettier

    const { data, room, alertSelector, openAlertModal, selectedAlert, docId, handler, idx } = props;
    const [globalData, updateGlobalData] = useContext(GlobalContext);
    const [mod, setMod] = useContext(ModalContext);

    const apiCall = () => {
        addAlert({
            docId,
            arrIndex: idx,
            alert: '',
            bg: '',
            border: '',
        });
    };

    const resetDashCard = () => {
        handler();
        apiCall();
    };

    return (
        <div onClick={handler}>
            <Card className={styles.dashCard}>
                <Card.Header className={styles.roomCardTop}>
                    <div className={styles.topLeft}>
                        <span>{room.name}</span>
                        <RBtn handleClick={resetDashCard} />
                    </div>
                    <div className={styles.timer}>
                        <span>
                            <MyStopwatch />
                        </span>
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
