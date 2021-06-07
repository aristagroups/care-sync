/* eslint-disable react/no-array-index-key */
import React from 'react';
import { Card } from 'react-bootstrap';
import RBtn from '../../Buttons/RBtn/RBtn';
import styles from './DashCard.module.css';

const DashCard = (props) => {
    // eslint-disable-next-line prettier/prettier

    const { data, room, alertSelector, openAlertModal, selectedAlert } = props;

    return (
        <Card className={styles.dashCard}>
            <Card.Header className={styles.roomCardTop}>
                <div className={styles.topLeft}>
                    <span>{room}</span>
                    <RBtn />
                </div>
                <div className={styles.timer}>
                    <span>10:56</span>
                </div>
            </Card.Header>
            <Card.Body className={styles.roomCardMid}>
                <div className={styles.alert}>
                    <span>1</span>
                </div>
                <div>
                    <button
                        onClick={() => openAlertModal()}
                        type="button"
                        className={styles.wrapper}
                    >
                        Dropdown Items
                    </button>
                </div>
            </Card.Body>
        </Card>
    );
};

export default DashCard;
