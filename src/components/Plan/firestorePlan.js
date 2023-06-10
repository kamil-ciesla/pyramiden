import {db} from "../../db/db"
import {app} from "../../db/db"

import {collection, where, deleteDoc, query,addDoc, doc, getDoc, getDocs, updateDoc} from "firebase/firestore"

import {getStorage, ref, uploadBytes} from "firebase/storage"

const storage = getStorage(app)

function errorLog(message) {
    console.log(`%c [ERROR] ${message}`, "color: red;")
}

const defaultPlanData = {
    coverPhotoPath: "",
    title: "Trip plan",
    description: " ",
    tripNotes: " ",
    budget: 0,
    currency: "EUR",
    timeframe:{
        startDate: new Date(),
        endDate: new Date()
    },
    days:[],
    tripmates: [],
    filePaths: [],
}

export async function getAllUserPlans(userId){
    const plansRef = collection(db, "plans");
    const q = query(plansRef, where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    let plans = []
    querySnapshot.forEach((doc) => {
        plans.push({planId: doc.id, data: doc?.data()})
    });
    return plans
}

export async function userHasAnyPlan(userId){
    const plansRef = collection(db, "plans");
    const q = query(plansRef, where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        return true
    });
    return false
}

// DEVELOPMENT FUNCTION
// export async function getPlanByUserId(userId) {
//     const plansRef = collection(db, "plans");
//     const q = query(plansRef, where("userId", "==", userId));
//     const querySnapshot = await getDocs(q);
//     let result = null;
//     querySnapshot.forEach((doc) => {
//         result = {planId: doc.id, data: doc?.data()}
//     });
//     return result
// }

export async function createPlan(userId, title=null) {
    const planData = {...defaultPlanData, userId: userId, title: title || defaultPlanData.title}
    const docRef = await addDoc(collection(db, "plans"), planData)
    return docRef.id
}

export async function deletePlan(userId, planId) {
    const planRef = doc(db, "plans", planId)
    const planDoc = await getDoc(planRef)
    if(planDoc.data().userId === userId){
        deleteDoc(planRef)
    }else{
        console.log('CANNOT DELETE: USER ID MISMATCH')
    }

    // const collectionRef = collection(db, "plans");
    // const q = query(collectionRef, where("userId", "==", userId), where(firebase.firestore.FieldPath.documentId(), "==", planId));
    //
    // getDocs(q).then((querySnapshot) => {
    //     querySnapshot.forEach((doc) => {
    //         doc.ref.delete();
    //     });
    // });
}

export async function getPlanByPlanId(planId) {
    const planRef = doc(db, "plans", planId)
    const planDoc = await getDoc(planRef)
    return planDoc.data()
}

export async function updatePlan(planId, newPlanData) {
    const planRef = doc(db, "plans", planId)
    await updateDoc(planRef, newPlanData)
}

export async function uploadFile(planId, file) {
    if (planId === undefined) return false

    const filePath = planId + "/" + file.name
    const fileRef = ref(storage, filePath)
    const isFilePathAdded = await addFileName(planId, file.name)
    if (isFilePathAdded) {
        await uploadBytes(fileRef, file)
        console.log('FILE UPLOADED')
        return true
    } else return false
}

async function addFileName(planId, fileName) {
    const planData = await getPlanByPlanId(planId)
    const filePaths = planData.filePaths
    try {
        if (planData.filePaths.includes(fileName)) {
            throw new Error('File with this name has been already uploaded')
        } else {
            filePaths.push(fileName)
            planData.filePaths = filePaths
            await updatePlan(planId, planData)
            return true
        }
    } catch (error) {
        errorLog(error.message)
        return false
    }
}

// async function removeFilePath(){

// }

