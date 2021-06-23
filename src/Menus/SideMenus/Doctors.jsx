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
    const [open, setOpen] = useState(null);
    const [drData, setDrData] = useState([]);
    const [drId, setDrId] = useState(null);
    const [data, setData] = useState([]);
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
            const citiesRef = db.collection('dashboard');
            const snapshot = await citiesRef.get();
            snapshot.forEach((doc) => {
                const item = doc.data();
                const appObj = {
                    id: doc.id,
                    dr: doc.id,
                    email: item?.email,
                    phone: item?.phone,
                    rooms: item?.rooms,
                };
                drList.push(appObj);
            });
            setData(drList);
        }
        getData();
        myFunction();
        return () => {
            setState({}); // This worked for me
        };
    }, [data]);

    const onOpenModal = () => {
        setOpen(true);
    };

    const handleDelData = (id) => {
        setInfo({
            method: 'del',
            type: 'doctor',
            collection: 'dashboard',
            id,
            onOpenModal,
        });
    };

    const handleUpdateData = (id) => {
        setInfo({
            method: 'update',
            type: 'doctor',
            collection: 'dashboard',
            id,
            onOpenModal,
        });
    };

    // console.log(drData.rooms);

    return (
        <Container fluid>
            {data.map((pass, index) => (
                <DrCard
                    data={pass}
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
