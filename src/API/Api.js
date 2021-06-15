/* eslint-disable no-alert */
/* eslint-disable array-callback-return */
/* eslint-disable no-param-reassign */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-undef */
/* eslint-disable import/no-cycle */
/* eslint-disable no-empty-function */
/* eslint-disable import/prefer-default-export */
import { db } from './firebase';

// Add Dashboard Data to database
export async function addDashData(data) {
    const ref = db.collection('dashboard').doc(data.dr.id);
    console.log(data);

    const res = await ref.set({
        dr: data.dr.id,
        email: data.dr.email,
        phone: data.dr.phone,
        rooms: data.rooms,
    });
    alert('success');
}

export async function doctorSimUpdate() {}

// Alert Add
export async function addAlert(data) {
    console.log(data);
    // First data of the desired document
    db.collection('dashboard')
        .doc(data.docId)
        .get()
        .then((doc) => {
            console.log(doc.data());
            // Assign array to local javascript variable
            const objects = doc.data().rooms;

            // Assing desired element of object to local javascript variable
            const objectToupdate = objects[data.arrIndex];

            // Update field of the element assigned to local javascript variable
            objectToupdate.alert = data.alert;
            objectToupdate.bg = data.bg;
            objectToupdate.border = data.border;

            // reassign object to local array variable
            objects[data.arrIndex] = objectToupdate;

            // Update complete array with update copy of element we have
            // created in local javascript variable.
            console.log(objects);
            db.collection('dashboard').doc(data.docId).update({ rooms: objects });
        });
}

// Reset All
export async function resetAll(data) {
    console.log(data);
    // First data of the desired document
    db.collection('dashboard')
        .doc(data.docId)
        .get()
        .then((doc) => {
            // Assign array to local javascript variable
            let objects = doc.data().rooms;

            // Assing desired element of object to local javascript variable
            console.log(objects);
            const objectToupdate = objects.map((room) => {
                room.alert = '';
                room.bg = '';
                room.border = '';
            });
            console.log(objectToupdate);

            // Update field of the element assigned to local javascript variable

            // reassign object to local array variable
            objects = objectToupdate;

            // Update complete array with update copy of element we have
            // created in local javascript variable.
            console.log(objects);
            db.collection('dashboard').doc(data.docId).update({ rooms: objects });
        });
}
