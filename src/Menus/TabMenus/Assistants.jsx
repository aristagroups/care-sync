/* eslint-disable import/no-cycle */
/* eslint-disable react/no-array-index-key */
import React, { useContext, useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { db } from '../../API/firebase';
import { DataContext } from '../../App';
import AssistantsCard from '../../Components/Cards/AssistantsCard/AssistantsCard';
import Del from '../../Modals/Del/Del';
import Update from '../../Modals/Update/Update';
import ConnectDr from '../SideMenus/Modals/Assistants/ConnectDr';

const Assistants = () => {
    const [info, setInfo] = useContext(DataContext);
    const [open, setOpen] = useState(null);
    const [drData, setDrData] = useState([]);
    const [drId, setDrId] = useState(null);

    const [connectState, setConnectState] = useState({ modal: false });

    const selectConnectDr = () => {
        setConnectState({ modal: !connectState.modal });
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

    return (
        <Container fluid>
            {drData.map((data, index) => (
                <AssistantsCard
                    key={data.id}
                    handleUpdateData={handleUpdateData}
                    handleDelData={handleDelData}
                    selectConnectDr={selectConnectDr}
                    data={data}
                    index={index}
                />
            ))}

            {
                <ConnectDr
                    displayModal={connectState.modal}
                    closeModal={selectConnectDr}
                    drId={drId}
                />
            }
            <Update />
            <Del />
        </Container>
    );
};

export default Assistants;
