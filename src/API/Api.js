/* eslint-disable no-empty-function */
/* eslint-disable import/prefer-default-export */
import { db } from './firebase';

// Add Dashboard Data to database
export async function addDashData(data) {
    const ref = db.collection('dashboard').doc(data.dr);
    console.log(data);

    const res = await ref.set({ rooms: data.rooms });
    console.log(res, 'success');
}

export async function doctorSimUpdate() {}
