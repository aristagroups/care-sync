/* eslint-disable no-alert */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useEffect, useState } from 'react';
import { db } from '../../../../API/firebase';
import SaveBtn from '../../../../Components/Buttons/SaveBtn/SaveBtn';
import styles from './ConnectDr.module.css';

const ConnectDr = (props) => {
    const [dr, setDr] = useState({});
    const [drList, setDrList] = useState([]);
    const [state, setState] = useState({});

    const myFunction = () => {
        setState({
            name: 'Jhon',
            surname: 'Doe',
        });
    };

    const divStyle = {
        display: props.displayModal ? 'block' : 'none',
    };

    useEffect(() => {
        async function getDoctors() {
            const drArray = [];
            const snapshot = await db.collection('doctors').get();
            snapshot.forEach((doc) => {
                const appObj = { id: doc.id, name: doc.data().name };
                drArray.push(appObj);
            });
            setDrList(drArray);
        }

        getDoctors();
        myFunction();
        return () => {
            setState({}); // This worked for me
        };
    }, [drList]);

    function closeModal(e) {
        e.stopPropagation();
        props.closeModal();
    }

    const handleSubmit = (e) => {};

    return (
        <div id={styles.modal} className="modal" onClick={closeModal} style={divStyle}>
            <div
                className={styles.modalContent}
                id="modalContent"
                onClick={(e) => e.stopPropagation()}
            >
                <span className={styles.modalClose} onClick={closeModal}>
                    &times;
                </span>

                <h4 id="modHeader1">Connect To Doctor</h4>
                <br />
                <form id="addAsForm" onSubmit={handleSubmit} className={styles.addRoomForm}>
                    <label htmlFor="name">Choose a Doctor</label>
                    <div className={styles.wrapper}>
                        <select name="drSelect" id="drSelect">
                            {drList.map((doc) => {
                                return (
                                    <option key={doc.id} value={doc.name}>
                                        {doc.name}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                    <SaveBtn name="Save" />
                </form>
            </div>
        </div>
    );
};
export default ConnectDr;
