/* eslint-disable no-alert */
/* eslint-disable consistent-return */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Container } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { db } from '../../API/firebase';
import styles from './AdminLogin.module.css';

const AdminLogin = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const onSubmit = (data) => {
        async function getData() {
            await db
                .collection('admin')
                .doc('bxqkMytRqnJYKkv1I0zC')
                .get()
                .then((doc) => {
                    if (doc.data().email === data.email) {
                        if (doc.data().password === data.password) {
                            alert('Success');
                        }
                    } else {
                        alert('Try again');
                    }
                });
        }
        getData();
    };

    return (
        <Container fluid className={styles.AdminLoginContainer}>
            <div className={styles.AdminLoginWrapper}>
                <h1>Admin Login</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input
                        type="text"
                        placeholder="Admin Email"
                        {...register('email', { required: true })}
                    />
                    <input
                        type="text"
                        placeholder="Password"
                        {...register('password', { required: true })}
                    />

                    <input type="submit" />
                </form>
            </div>
        </Container>
    );
};

export default AdminLogin;
