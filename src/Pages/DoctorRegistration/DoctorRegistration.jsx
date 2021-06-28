/* eslint-disable no-alert */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Container } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useToasts } from 'react-toast-notifications';
import { db } from '../../API/firebase';
import styles from './DoctorRegistration.module.css';

const DoctorRegistration = () => {
    const { addToast } = useToasts();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const onSubmit = (data) => {
        async function queryData() {
            const ref = db.collection('dashboard');
            const queryRef = ref.where('email', '==', data.email);
            await queryRef.get().then((res) => {
                if (res.empty) {
                    addToast('Not registered', {
                        appearance: 'error',
                        autoDismiss: true,
                    });
                } else if (!res.empty) {
                    alert('Success');
                }
            });
        }

        queryData();
    };

    return (
        <Container fluid className={styles.ReceptionistLoginContainer}>
            <div className={styles.ReceptionistLoginWrapper}>
                <h1>Doctor Login</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input
                        type="text"
                        placeholder="Email"
                        {...register('email', { required: true })}
                    />

                    <input type="submit" />
                </form>
            </div>
        </Container>
    );
};

export default DoctorRegistration;
