/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Container } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import styles from './AssistantRegistration.module.css';

const AssistantRegistration = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const onSubmit = (data) => console.log(data);
    console.log(errors);

    return (
        <Container fluid className={styles.AssistantRegistrationContainer}>
            <div className={styles.AssistantRegistrationWrapper}>
                <h1>Assistant Registration</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input
                        type="text"
                        placeholder="Name"
                        {...register('Name', { required: true })}
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        {...register('Email', { required: true, pattern: /^\S+@\S+$/i })}
                    />
                    <input type="tel" placeholder="Phone Number" {...register} />

                    <input type="submit" />
                </form>
            </div>
        </Container>
    );
};

export default AssistantRegistration;
