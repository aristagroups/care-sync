/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-shadow */
/* eslint-disable react/button-has-type */
import { faPen, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import ConnectBtn from '../../Buttons/ConnectBtn/ConnectBtn';
import styles from './DrCard.module.css';

const DrCard = (props) => {
    const { key, id, name, email, phone, rooms } = props.data;
    const { index, handleUpdateData, handleDelData } = props;

    // console.log(key);

    const alerts = [
        { border: '#63BFF2', bg: '#63BFF2' },
        { border: '#939DFF', bg: '#939DFF' },
        { border: '#F2D775', bg: '#F2D775' },
        { border: '#74C386', bg: '#74C386' },
        { border: '#FC6666', bg: '#FC6666' },
        { border: '#DDDDDD', bg: '#FFFFFF' },
    ];

    const url = window.location.href;

    return (
        <div className={[styles.tableContainer].join(' ')}>
            <table>
                <tbody>
                    <tr className={[styles.tableRow].join(' ')} key={id}>
                        <td style={{ width: '40px' }} className={styles.tdNumber}>
                            <div>
                                <span>{index + 1}</span>
                            </div>
                        </td>
                        <td style={{ width: '20%', paddingLeft: '10px' }}>{id}</td>
                        <td style={{ width: '20%' }}>{email}</td>
                        <td style={{ width: '16%', paddingLeft: '10px' }}>{phone}</td>
                        <td
                            style={{
                                width: '15%',
                                height: '56px',
                            }}
                        >
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'flex-start',
                                    alignItems: 'center',
                                }}
                            >
                                {rooms.map((alert, index) => (
                                    <div
                                        key={index}
                                        style={{
                                            marginLeft: '5px',
                                            width: '13px',
                                            height: '13px',
                                            backgroundColor: `${alert.border}`,
                                            border: `0.2px solid ${alert.border}`,
                                            borderRadius: '50%',
                                        }}
                                    />
                                ))}
                            </div>
                        </td>
                        <td style={{ width: '20%' }}>
                            <span style={{ marginRight: '5px' }}>Rooms</span>{' '}
                            {rooms?.map((room) => ` ${room.name}, `)}
                        </td>

                        {url !== 'http://localhost:3000/assistant/doctors' && (
                            <td
                                style={{ width: '10%' }}
                                className={[styles.tdBtn, styles.iconBtn].join(' ')}
                            >
                                <button onClick={() => handleUpdateData(id)}>
                                    <FontAwesomeIcon icon={faPen} />
                                </button>{' '}
                                <button onClick={() => handleDelData(id)}>
                                    <FontAwesomeIcon icon={faTrashAlt} />
                                </button>
                            </td>
                        )}
                        <td
                            style={{ width: '10%' }}
                            className={[styles.tdBtn, styles.iconBtn].join(' ')}
                        >
                            {url === 'http://localhost:3000/assistant/doctors' && (
                                <ConnectBtn name="Connect" />
                            )}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default DrCard;
