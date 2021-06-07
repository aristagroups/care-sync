import React from 'react';
import styles from './StopBtn.module.css';

const StopBtn = (props) => {
    const { handleClick } = props;
    return (
        <button type="button" id={styles.StopBtn} onClick={handleClick}>
            Stop the line
        </button>
    );
};

export default StopBtn;
