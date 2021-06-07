import React from 'react';
import styles from './ConnectBtn.module.css';

const ConnectBtn = (props) => {
    const { handleClick } = props;
    return (
        <button type="button" id={styles.ConnectBtn} onClick={handleClick}>
            Connect to
        </button>
    );
};

export default ConnectBtn;
