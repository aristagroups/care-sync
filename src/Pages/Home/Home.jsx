import React from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styles from './Home.module.css';

const Home = () => (
    <Container fluid className={styles.homeContainer}>
        <div className={styles.homeWrapper}>
            <h1>Care SYNC Web</h1>
            <Link to="/admin-login">
                <button to="/admin-login" type="button" className={styles.homeButtons}>
                    Admin Login
                </button>
            </Link>
            <br />
            <Link to="/receptionist-login">
                <button type="button" className={styles.homeButtons}>
                    Receptionist Login
                </button>
            </Link>
            <br />
            <Link to="/doctor-registration">
                <button type="button" className={styles.homeButtons}>
                    Continue as a Doctor
                </button>
            </Link>
            <br />
            <Link to="/assistant-registration">
                <button type="button" className={styles.homeButtons}>
                    Continue as a Assistant
                </button>
            </Link>
        </div>
    </Container>
);

export default Home;
