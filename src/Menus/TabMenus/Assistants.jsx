/* eslint-disable import/no-cycle */
/* eslint-disable react/no-array-index-key */
import React, { useContext, useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { db } from '../../API/firebase';
import { DataContext } from '../../App';
import AssistantsCard from '../../Components/Cards/AssistantsCard/AssistantsCard';
import Connect from '../../Components/Cards/AssistantsCard/Connect';
import Del from '../../Modals/Del/Del';
import Update from '../../Modals/Update/Update';

const Assistants = () => {
    const [info, setInfo] = useContext(DataContext);
    const [open, setOpen] = useState(null);
    const [drData, setDrData] = useState([]);
    const [drId, setDrId] = useState(null);
    const [state, setState] = useState({});

    const myFunction = () => {
        setState({
            name: 'Jhon',
            surname: 'Doe',
        });
    };

    useEffect(() => {
        async function getData() {
            const drList = [];
            const snapshot = await db.collection('assistants').get();
            snapshot.forEach((doc) => {
                const appObj = {
                    id: doc.id,
                    name: doc.data().name,
                    email: doc.data().email,
                    phone: doc.data().phone,
                };
                drList.push(appObj);
            });
            setDrData(drList);
        }
        getData();
        myFunction();
        return () => {
            setState({}); // This worked for me
        };
    }, [drData]);

    const onOpenModal = () => {
        setOpen(true);
    };

    const handleDelData = (id) => {
        setInfo({
            method: 'del',
            type: 'assistant',
            collection: 'assistants',
            id,
            onOpenModal,
        });
    };

    const handleUpdateData = (id) => {
        setInfo({
            method: 'update',
            type: 'assistant',
            collection: 'assistants',
            id,
            onOpenModal,
        });
    };

    const handleConnectDr = (id) => {
        setInfo({
            method: 'con',
            type: 'assistant',
            collection: 'assistants',
            id,
            onOpenModal,
        });
    };

    return (
        <Container fluid>
            {drData.map((data, index) => (
                <AssistantsCard
                    key={data.id}
                    handleUpdateData={handleUpdateData}
                    handleDelData={handleDelData}
                    handleConnectDr={handleConnectDr}
                    data={data}
                    index={index}
                />
            ))}
            <Update />
            <Del />
            <Connect />
        </Container>
    );
};

export default Assistants;
