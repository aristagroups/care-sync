/* eslint-disable consistent-return */
/* eslint-disable prettier/prettier */
/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-unused-expressions */
/* eslint-disable import/no-cycle */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import { db } from '../../API/firebase';
import { DataContext } from '../../App';
import SaveBtn from '../../Components/Buttons/SaveBtn/SaveBtn';
import styles from '../Styles/Modal.Module.css';
import ValidateEmail from '../Validator/Validator';


const Add = () => {
    const [info, setInfo] = useContext(DataContext);
    const [data, setData] = useState({});
    const [open, setOpen] = useState(false);
    const [colorName, setColorName] = useState(null);

    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);

    const colors = [
        { border: '#F2D775', bg: '#FDF8E5' },
        { border: '#62BFF2', bg: '#E1F3FD' },
        { border: '#939DFF', bg: '#DFE2FF' },
        { border: '#74C387', bg: '#E5F4E8' },
        { border: '#FC6666', bg: '#FED1D1' },
        { border: '#DDDDDD', bg: '#FFFFFF' },
        { border: '#487D36', bg: '#DCE6D9' },
        { border: '#1F7E74', bg: '#D4E6E5' },
        { border: '#3842AB', bg: '#DADBF0' },
        { border: '#F8FB66', bg: '#FEFEE2' },
        { border: '#78F275', bg: '#E5FEE5' },
        { border: '#EE5997', bg: '#FCDFEB' },
        { border: '#FA710D', bg: '#FEE4D2' },
        { border: '#E485F3', bg: '#FAE8FD' },
        { border: '#86E8EF', bg: '#E8FBFC' },
        { border: '#C4E6E9', bg: '#F4FAFB' },
    ];

    const colorSetter = (color) => {
        setData({ ...data, bg: color.bg, border: color.border });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        async function storeData() {
            if(info.collection === null){
                return false;
            // eslint-disable-next-line no-else-return
            } else {
                const aTuringRef = db.collection(info.collection).doc(data.name);

                await aTuringRef.set(data);
    
                toast.success(`${info.type} created successfully`);
    
                setInfo({});
            }
            
            
            

            
        }

        storeData();
        onCloseModal();
    };

    const handleChange = (e) => {
        e.preventDefault();
        if(info.type === 'doctor') {
            setData({ ...data, [e.target.name]: e.target.value,count: 0, rooms: []});
        } else if(info.type === 'assistant') {
            setData({ ...data, [e.target.name]: e.target.value, dr: ''});
        } else if(info.type === 'room') {
            setData({ ...data, blink : false, [e.target.name]: e.target.value, alert: {
                name: '',
                bg: '',
                border: '',
            }});
        } else {
            setData({ ...data, [e.target.name]: e.target.value});
        }
    };

    const emailValidation = (e) => {
        e.preventDefault();
        const res = ValidateEmail(e.target.value);
        setData({ ...data, email: res });
    };

    useEffect(() => {
        if (info.onOpenModal !== undefined && info.method === 'add') {
            info.onOpenModal = onOpenModal();
        }
    }, [info]);

    return (
        <div>
            <Modal className={styles.modal} open={open} onClose={onCloseModal} center>
                <h4>
                    Add <span>{info.type}</span>
                </h4>
                <br />
                <form id="addRoomForm" onSubmit={handleSubmit} className={styles.addRoomForm}>
                    <label htmlFor="name">Name</label>
                    <input
                        required
                        onChange={(e) => handleChange(e)}
                        type="text"
                        name="name"
                        id="name"
                    />
                    {(info.type === 'doctor' ||
                        info.type === 'assistant' ||
                        info.type === 'receptionist' ) && (
                            <>
                                <label htmlFor="email">Email</label>
                                <input
                                    required
                                    onBlur={(e) => emailValidation(e)}
                                    type="text"
                                    name="email"
                                    id="email"
                                />
                            </>
                        )}
                    {(info.type === 'doctor' ||
                        info.type === 'assistant' ||
                        info.type === 'receptionist') && (
                            <>
                                <label htmlFor="phone">Phone Number</label>
                                <input
                                    required
                                    onChange={(e) => handleChange(e)}
                                    type="number"
                                    name="phone"
                                    id="phone"
                                />
                            </>
                        )}
                    {info.type === 'alert' && (
                        <>
                            <label htmlFor="color">Color</label>
                            <div className={styles.ccWrapper}>
                                <div className={styles.ccContainer}>
                                    {colors.map((color, index) => (
                                        <div
                                            key={index}
                                            value={colorName}
                                            className={[styles.colorContainer]}
                                            onClick={() => colorSetter(color)}
                                            style={{
                                                border: `2px solid${color.border}`,
                                                borderRadius: '50%',
                                                backgroundColor: `${color.bg}`,
                                            }}
                                        >
                                            <input type="radio" name="cc" id="cc" />
                                            <div />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </>
                    )}

                    <SaveBtn name="Save" />
                </form>
            </Modal>
        </div>
    );
};

export default Add;
