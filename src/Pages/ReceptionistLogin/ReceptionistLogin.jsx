/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Container } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import styles from './ReceptionistLogin.module.css';

const ReceptionistLogin = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const onSubmit = (data) => console.log(data);
    console.log(errors);

    return (
        <Container fluid className={styles.ReceptionistLoginContainer}>
            <div className={styles.ReceptionistLoginWrapper}>
                <h1>Receptionist Login</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input
                        type="text"
                        placeholder="Receptionist ID"
                        {...register('Receptionist ID', { required: true })}
                    />
                    <input
                        type="text"
                        placeholder="Password"
                        {...register('Password', { required: true })}
                    />

                    <input type="submit" />
                </form>
            </div>
        </Container>
    );
};

export default ReceptionistLogin;
