/* eslint-disable import/no-cycle */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useContext } from 'react';
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import { db } from '../../API/firebase';
import { GlobalContext, ModalContext } from '../../App';
import './ModalBuiltIn.css';
import styles from './ModalComponent.module.css';

const ModalComponent = ({ open, setOpen, items, detail, setDetail }) => {
    const [globalData, updateGlobalData] = useContext(GlobalContext);
    const [mod, setMod] = useContext(ModalContext);
    const middleIndex = Math.ceil(items.length / 2);
    const leftSideItems = items.slice().splice(0, middleIndex);
    const rightSideItems = items.slice(middleIndex);

    const updater = () => {
        // First data of the desired document
        db.collection('dashboard')
            .doc(globalData.docId)
            .get()
            .then((doc) => {
                // Assign array to local javascript variable
                const objects = doc.data().data?.rooms;

                // Assign desired element of object to local javascript variable
                const objectToUpdate = objects[globalData?.arrIndex];

                // Update field of the element assigned to local javascript variable
                objectToUpdate.alert = detail.name;
                objectToUpdate.bg = detail.bg;
                objectToUpdate.border = detail.border;

                // reassign object to local array variable
                objects[globalData.arrIndex] = objectToUpdate;

                console.log(objectToUpdate);

                // Update complete array with update copy of element we have
                // created in local javascript variable.
                db.collection('dashboard')
                    .doc(globalData.docId)
                    .update(objects[globalData.arrIndex]);
            });
    };

    const onCloseModal = () => {
        setOpen(false);
        setMod({ ...mod, detail });

        updater();
    };

    return (
        <div>
            <Modal open={open} onClose={onCloseModal} center>
                <div className={styles.modalContainer}>
                    <div className={styles.leftSideItems}>
                        {leftSideItems.length > 0 &&
                            leftSideItems.map((item, index) => (
                                <div
                                    onChange={() => setDetail(item)}
                                    className={
                                        item.id === detail?.id
                                            ? [styles.items, styles.active].join(' ')
                                            : [styles.items].join(' ')
                                    }
                                    key={item.id}
                                >
                                    <div>
                                        <h1
                                            style={{
                                                border: `2.5px solid ${item.border}`,
                                                backgroundColor: `${item.bg}`,
                                                color: `${
                                                    item.name.toLowerCase().includes('required')
                                                        ? '#FC6666'
                                                        : item.border
                                                }`,
                                            }}
                                        >
                                            {item.name.slice(0, 1)}
                                        </h1>
                                        <p>{item.name}</p>
                                    </div>
                                </div>
                            ))}
                    </div>

                    <div className={styles.middleBorder} />

                    <div className={styles.rightSideItems}>
                        {rightSideItems.length > 0 &&
                            rightSideItems.map((item, index) => (
                                <div
                                    onClick={() => setDetail(item)}
                                    className={
                                        item.id === detail?.id
                                            ? [styles.items, styles.active].join(' ')
                                            : [styles.items].join(' ')
                                    }
                                    key={item.id}
                                >
                                    <div>
                                        <h1
                                            style={{
                                                border: `2.5px solid ${item.border}`,
                                                backgroundColor: `${item.bg}`,
                                                color: `${
                                                    item.name.toLowerCase().includes('required')
                                                        ? '#FC6666'
                                                        : item.border
                                                }`,
                                            }}
                                        >
                                            {item.name.slice(0, 1)}
                                        </h1>
                                        <p>{item.name}</p>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default ModalComponent;
