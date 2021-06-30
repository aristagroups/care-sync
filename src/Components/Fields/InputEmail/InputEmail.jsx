import React from 'react';
import styles from './InputEmail.module.css';

const InputEmail = (props) => {
    const { value } = props;
    function ValidateEmail(e) {
        if (
            /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
                e.target.value
            ) ||
            e.target.value === ''
        ) {
            return true;
        }
        alert('You have entered an invalid email address!');
        return false;
    }
    return (
        <>
            <label className={styles.labelField} htmlFor="InputEmailField">
                {value}
            </label>
            <input
                onBlur={(e) => ValidateEmail(e)}
                className={styles.InputEmailField}
                type="text"
                name="InputEmail"
                id="InputEmailField"
                placeholder={value}
            />
        </>
    );
};

export default InputEmail;
