/* eslint-disable react/button-has-type */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-shadow */
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import styles from './Table.module.css';
import styles2 from './Table2.module.css';

const Table2 = ({ items, selectedAlert, handleUpdateData }) => {
    const handleUpdate = (item) => {
        handleUpdateData(item);
    };
    return (
        <div className={[styles.tableContainer].join(' ')}>
            <table>
                <tbody className={styles.tableBody}>
                    {items.map((item, index) => (
                        <tr className={[styles.tableRow].join(' ')} key={index}>
                            <td className={[styles.tdNumber]}>
                                <div>{index + 1}</div>
                            </td>
                            <td style={{ width: '65%' }}>{item?.name}</td>

                            <td className={styles.circle}>
                                <div
                                    style={{
                                        backgroundColor: `${item.bg}`,
                                        border: `2px solid ${item.border}`,
                                    }}
                                />
                            </td>

                            <td className={[styles.tdBtn, styles2.iconBtn].join(' ')}>
                                <button>
                                    <FontAwesomeIcon
                                        onClick={() => handleUpdate(item)}
                                        icon={faPen}
                                    />
                                </button>{' '}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Table2;
