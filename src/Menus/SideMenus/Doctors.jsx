/* eslint-disable import/no-cycle */
/* eslint-disable react/no-array-index-key */
import React, { useContext, useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { db } from '../../API/firebase';
import { DataContext } from '../../App';
import DrCard from '../../Components/Cards/DrCard/DrCard';
import Del from '../../Modals/Del/Del';
import Update from '../../Modals/Update/Update';

const Doctors = () => {
    const [info, setInfo] = useContext(DataContext);
    const [drData, setDrData] = useState([]);
    const [drId, setDrId] = useState(null);
    const [open, setOpen] = useState(null);

    const onOpenModal = () => {
        setOpen(true);
    };

    const handleDelData = (id) => {
        setInfo({
            method: 'del',
            type: 'doctor',
            collection: 'doctors',
            id,
            onOpenModal,
        });
    };

    const handleUpdateData = (id) => {
        setInfo({
            method: 'update',
            type: 'doctor',
            collection: 'doctors',
            id,
            onOpenModal,
        });
    };

    useEffect(() => {
        async function getData() {
            const drList = [];
            const res = await db.collection('doctors').get();
            res.forEach((doc) => {
                const appObj = {
                    id: doc.id,
                    name: doc.data().name,
                    email: doc.data().email,
                    phone: doc.data().phone,
                    rooms: doc.data().rooms,
                };
                drList.push(appObj);
            });
            setDrData(drList);
        }
        getData();
    }, [drData]);

    return (
        <Container fluid>
            {drData.map((data, index) => (
                <DrCard
                    key={data.id}
                    data={data}
                    index={index}
                    handleDelData={handleDelData}
                    handleUpdateData={handleUpdateData}
                />
            ))}
            <Del />
            <Update />
        </Container>
    );
};

export default Doctors;
