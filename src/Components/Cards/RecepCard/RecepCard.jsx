/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-shadow */
/* eslint-disable react/button-has-type */
import { faPen, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { db } from '../../../API/firebase';
import styles from './RecepCard.module.css';

const RecepCard = (props) => {
    const { id, name, email, phone } = props.data;
    const { index, handleUpdateData, handleDelData } = props;

    const handleClick = () => {
        props.selectEditDr();
        props.updateId(id);
    };

    async function deleteDocument(e) {
        const res = await db.collection('receptionists').doc(`${id}`).delete();
    }

    const item = {};

    return (
        <div className={[styles.tableContainer].join(' ')}>
            <table>
                <tbody>
                    <tr className={[styles.tableRow].join(' ')} key={id}>
                        <td className={[styles.tdNumber]}>
                            <div>
                                <span>{index + 1}</span>
                            </div>
                        </td>
                        <td style={{ width: '30%', paddingLeft: '10px' }}>{name}</td>
                        <td style={{ width: '35%' }}>{email}</td>
                        <td style={{ width: '25%', paddingLeft: '10px' }}>{phone}</td>

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
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default RecepCard;
