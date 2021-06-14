/* eslint-disable import/no-cycle */
/* eslint-disable react/no-array-index-key */
import React, { Fragment, useContext, useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { db } from '../../API/firebase';
import { DataContext } from '../../App';
import DrCard from '../../Components/Cards/DrCard/DrCard';
import Del from '../../Modals/Del/Del';
import Update from '../../Modals/Update/Update';

const Doctors = () => {
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
            const snapshot = await db.collection('doctors').get();
            snapshot.forEach((doc) => {
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

    // console.log(drData.rooms);

    return (
        <Container fluid>
            {drData.map((data, index) => (
                <Fragment key={Math.random().toString(36).substr(2, 9)}>
                    <DrCard
                        data={data}
                        index={index}
                        handleDelData={handleDelData}
                        handleUpdateData={handleUpdateData}
                    />
                </Fragment>
            ))}
            <Del />
            <Update />
        </Container>
    );
};

export default Doctors;
