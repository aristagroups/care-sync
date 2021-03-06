/* eslint-disable prettier/prettier */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable import/no-cycle */
/* eslint-disable react/no-array-index-key */
import React, { useContext } from 'react';
import { Card } from 'react-bootstrap';
import ReactTooltip from 'react-tooltip';
import { addAlert, toggleEmergency } from '../../../API/Api';
import { GlobalContext, ModalContext } from '../../../App';
import RBtn from '../../Buttons/RBtn/RBtn';
import './blinker.css';
import styles from './DashCard.module.css';
import MyStopwatch from './MyStopWatch';


const DashCard = (props) => {

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
            blink: false,
        });
    };

    

    const resetDashCard = () => {
        handler();
        apiCall();
    };

    

    const addEmergency = () => {
        if(room.blink === false) {
            toggleEmergency({
                docId,
                idx,
                blink: true,
            });
        } else if(room.blink === true) {
            toggleEmergency({
                docId,
                idx,
                blink: false,
            });
        }
    }

    return (
        <div>
            {
                        room.blink ? (<div   onClick={handler}>
                            <Card id="alarming" className={styles.dashCard}>
                                <Card.Header className={styles.roomCardTop}>
                                    <div className={styles.topLeft}>
                                        <span>{room.name}</span>
                                        <RBtn handleClick={resetDashCard} />
                                        
                                    </div>
                                    <button data-tip="emergency" onClick={()=>addEmergency(docId,idx,room)} id="emergencyBtn" type="button" >
                                    <i className="fa fa-bell" />
                                    </button>
                                    <ReactTooltip >
                                        <small>                        Emergency Button
                </small>
                                    </ReactTooltip>
                                    <div className={styles.timer}>
                                        <span>{room.alert ? <MyStopwatch /> : '00:00'}</span>
                                    </div>
                                </Card.Header>
                                <Card.Body className={styles.roomCardMid}>
                                    <div onClick={() => openAlertModal()}
                                        style={{ backgroundColor: `${room.bg}`, borderColor: `${room.border}`, cursor: 'pointer' }}
                                        className={styles.alert}
                                    >
                                        {(room.alert === '' || room.alert === 'Empty' ) ? (
                                            <span style={{ color: 'white' }}>{room.count}</span>
                                        ) : (
                                            <span style={{ color: `${room.border}` }}>{room.count}</span>
                                        )}
                                    </div>
                                    <div>
                                        <div
                                            
                                            className={styles.wrapper}
                                        >
                                            {room.alert || 'Empty'}
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>
                        </div>) : (<div  onClick={handler}>
            <Card className={styles.dashCard}>
                <Card.Header className={styles.roomCardTop}>
                    <div className={styles.topLeft}>
                        <span>{room.name}</span>
                        <RBtn handleClick={resetDashCard} />
                        
                    </div>
                    <button data-tip="emergency" onClick={()=>addEmergency(docId,idx,room)} id="emergencyBtn" type="button" >
                    <i className="fa fa-bell" />
                    </button>
                    <ReactTooltip >
                        <small>                        Emergency Button
</small>
                    </ReactTooltip>
                    <div className={styles.timer}>
                        <span>{room.alert ? <MyStopwatch /> : '00:00'}</span>
                    </div>
                </Card.Header>
                <Card.Body className={styles.roomCardMid}>
                    <div onClick={() => openAlertModal()}
                        style={{ backgroundColor: `${room.bg}`, borderColor: `${room.border}`, cursor: 'pointer' }}
                        className={styles.alert}
                    >
                        {(room.alert === '' || room.alert === 'Empty' ) ? (
                            <span style={{ color: 'white' }}>{room.count}</span>
                        ) : (
                            <span style={{ color: `${room.border}` }}>{room.count}</span>
                        )}
                    </div>
                    <div>
                        <div
                            
                            className={styles.wrapper}
                        >
                            {room.alert || 'Empty'}
                        </div>
                    </div>
                </Card.Body>
            </Card>
        </div>)
                    }
        </div>
        
    );
};

export default DashCard;
