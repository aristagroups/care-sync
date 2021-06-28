import React from 'react';
import { useToasts } from 'react-toast-notifications';
import styles from './InputEmail.module.css';

const InputEmail = (props) => {
    const { addToast } = useToasts();
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
        addToast('You have entered an invalid email address!', {
            appearance: 'error',
            autoDismiss: true,
        });
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
