/* eslint-disable import/no-cycle */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/button-has-type */
import React, { useContext, useEffect, useState } from 'react';
import Modal from 'react-responsive-modal';
import { DataContext } from '../../../App';
import SaveBtn from '../../Buttons/SaveBtn/SaveBtn';
import styles from './AssistantsCard.module.css';

const Connect = (props) => {
    const [info, setInfo] = useContext(DataContext);
    const [data, setData] = useState({});
    const [open, setOpen] = useState(false);

    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);

    // async function deleteDocument(e) {
    //     e.preventDefault();
    //     const res = await db.collection(info.collection).doc(info.id).delete();
    //     setInfo({});
    //     onCloseModal();
    // }

    useEffect(() => {
        if (info.onOpenModal !== undefined && info.method === 'con') {
            info.onOpenModal = onOpenModal();
        }
    }, [info]);

    return (
        <div>
            <Modal open={open} onClose={onCloseModal} center>
                <h4 id="modHeader1">Connect To Doctor</h4>
                <br />
                <form id="addAsForm" style={{ padding: '10px 30px' }}>
                    <div style={{ textAlign: 'left' }}>
                        <label htmlFor="name" style={{ marginLeft: '5px' }}>
                            Choose a Doctor
                        </label>
                        <div className={styles.wrapper}>
                            <select name="drSelect" id="drSelect">
                                <option value="Test">Test</option>
                                <option value="Test">Test</option>
                            </select>
                        </div>
                    </div>
                    <SaveBtn style={{ margin: 'o auto', textAlign: 'center' }} name="Save" />
                </form>
                <br />
            </Modal>
        </div>
    );
};

export default Connect;
