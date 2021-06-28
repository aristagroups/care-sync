import { useToasts } from 'react-toast-notifications';

/* eslint-disable no-alert */
function ValidateEmail(value) {
    const { addToast } = useToasts();
    if (value === '') {
        return true;
    }
    if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(value)) {
        return value;
    }
    addToast('You have entered an invalid email address!', {
        appearance: 'error',
        autoDismiss: true,
    });
    return false;
}

export default ValidateEmail;
