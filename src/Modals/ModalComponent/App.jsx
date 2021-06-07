/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/no-cycle */
/* eslint-disable react/button-has-type */
import { useContext, useEffect, useState } from 'react';
import { db } from '../../API/firebase';
import { ModalContext } from '../../App';
import ModalComponent from './ModalComponent';

function App() {
    const [mod, setMod] = useContext(ModalContext);
    const [open, setOpen] = useState(false);
    const [detail, setDetail] = useState(null);
    const onOpenModal = () => {
        setOpen(true);
    };

    const [items, setItems] = useState([]);

    const myArr = [
        {
            id: 1,
            name: 'Assistant In',
        },
        {
            id: 2,
            name: 'Assistant Required',
        },
        {
            id: 3,
            name: 'Doctor In',
        },
        {
            id: 4,
            name: 'Doctor Required',
        },
        {
            id: 5,
            name: 'Patient In',
        },
        {
            id: 6,
            name: 'Financial In',
        },
        {
            id: 7,
            name: 'Financial Required',
        },
        {
            id: 8,
            name: 'Emergency',
        },
        {
            id: 9,
            name: 'Empty',
        },
    ];

    useEffect(() => {
        async function getData() {
            const alertList = [];
            const snapshot = await db.collection('alerts').get();
            snapshot.forEach((doc) => {
                const appObj = {
                    id: doc.id,
                    name: doc.data().name,
                    bg: doc.data().bg,
                    border: doc.data().border,
                };
                alertList.push(appObj);
            });
            setItems(alertList);
        }
        getData();
    }, []);

    useEffect(() => {
        if (mod.onOpenModal !== undefined) {
            mod.onOpenModal = onOpenModal();
        }
    }, [mod]);

    return (
        <div style={{ textAlign: 'center' }}>
            <ModalComponent
                items={items}
                open={open}
                setOpen={setOpen}
                detail={detail}
                setDetail={setDetail}
            />
        </div>
    );
}

export default App;
