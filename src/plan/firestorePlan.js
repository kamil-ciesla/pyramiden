import { db } from '../db/db';

import { collection, query, where, addDoc, doc, deleteDoc, getDoc, getDocs, updateDoc } from 'firebase/firestore';

function successLog(message) {
    console.log(`%c${message}`, 'color: green;')
}

export async function createPlan() {
    const planReference = await addDoc(collection(db, 'plans'), {})
    successLog('Plan has been created succesfully with id: ' + planReference.id)
    return planReference.id
}
export async function updateTitle(planId, title) {
    console.log('given planId is ' + planId)
    const planRef = doc(db, 'plans', planId)
    const planDoc = await getDoc(planRef)
    const planDocData = planDoc.data()
    planDocData.title = title

    await updateDoc(planRef, planDocData)
    successLog('Plan title has been updated succesfully')
} 