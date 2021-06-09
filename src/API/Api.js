/* eslint-disable no-alert */
/* eslint-disable no-plusplus */

import { db } from './firebase';

// Database Add Function
export async function addData(info) {
    const aTuringRef = db.collection(`${info.collection}`);

    const res = await aTuringRef.add(info.data);

    console.log(res);
}

// Database Delete Function
export async function delData(info) {
    const aTuringRef = db.collection(`${info.collection}`);

    const res = await aTuringRef.del(info.data);

    console.log(res);
}

// Database Update Function
export async function updateData(info) {
    const aTuringRef = db.collection(`${info.collection}`);

    const res = await aTuringRef.update(info.data);

    console.log(res);
}

export function addDashData(data) {
    async function upload() {
        const aTuringRef = db.collection('dashboard');
        const res = await aTuringRef.add({ data });
        // eslint-disable-next-line no-alert
        // eslint-disable-next-line prettier/prettier
    alert("Success");
    }
    upload();
}

// Database Room Add Function
export async function addRoomData(info) {
    const aTuringRef = db.collection('rooms');

    const res = await aTuringRef.add(info.data);

    console.log(res);
}
