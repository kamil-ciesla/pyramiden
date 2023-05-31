import {db} from "../../db/db"
import {app} from "../../db/db"

import {collection, addDoc, doc, getDoc, updateDoc} from "firebase/firestore"

import {getStorage, ref, uploadBytes} from "firebase/storage"

const storage = getStorage(app)

function errorLog(message) {
    console.log(`%c [ERROR] ${message}`, "color: red;")
}

export async function createPlan(emptyPlanData) {
    await addDoc(collection(db, "plans"), emptyPlanData)
}

export async function getPlan(planId) {
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
        return true
    } else return false
}

async function addFileName(planId, fileName) {
    const planData = await getPlan(planId)
    const filePaths = planData.filePaths
    try {
        if (!planData.filePaths.includes(fileName)) {
            filePaths.push(fileName)
            planData.filePaths = filePaths
            await updatePlan(planId, planData)
            return true
        } else {
            throw new Error('File with this name has been already uploaded')
        }
    } catch (error) {
        errorLog(error.message)
        return false
    }
}

// async function removeFilePath(){

// }
