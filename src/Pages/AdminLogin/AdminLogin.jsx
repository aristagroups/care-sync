/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Container } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import styles from './AdminLogin.module.css';

const AdminLogin = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const onSubmit = (data) => console.log(data);
    console.log(errors);

    return (
        <Container fluid className={styles.AdminLoginContainer}>
            <div className={styles.AdminLoginWrapper}>
                <h1>Admin Login</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input
                        type="text"
                        placeholder="Admin ID"
                        {...register('Admin ID', { required: true })}
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

export default AdminLogin;
