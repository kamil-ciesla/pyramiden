import { db } from "../../db/db"
import { app } from "../../db/db"

import {
	collection,
	query,
	where,
	addDoc,
	doc,
	deleteDoc,
	getDoc,
	getDocs,
	updateDoc
} from "firebase/firestore"

import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage"

const storage = getStorage(app)

function successLog(message) {
	console.log(`%c${message}`, "color: green;")
}

export async function createPlan() {
	const emptyPlan = {
		title: "",
		description: "",
		budget: 0,
		currency: "EUR",
		startDate: null,
		endDate: null,
		tripmates: [],
		tripNotes: "tripNotes"
	}
	const planReference = await addDoc(collection(db, "plans"), emptyPlan)
	successLog("Plan has been created succesfully with id: " + planReference.id)
	return planReference
}

export async function getPlan(planId) {
	const planRef = doc(db, "plans", planId)
	const planDoc = await getDoc(planRef)
	successLog(`Fetched plan with Id: ${planDoc.id}`)
	return planDoc
}

export async function updatePlan(planId, newPlanData) {
	console.log("given planId is " + planId)
	const planRef = doc(db, "plans", planId)
	// const planDoc = await getDoc(planRef)
	// const planDocData = planDoc.data()
	await updateDoc(planRef, newPlanData)
	successLog("Plan has been updated succesfully")
	return true
}

// 'file' comes from the Blob or File API
export async function uploadFile(file, fileName, planId) {
	const filePath = planId + "/" + fileName
	const fileRef = ref(storage, filePath)
	await uploadBytes(fileRef, file).then((snapshot) => {
		successLog("Uploaded file: " + fileName)
	})
}
