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
	console.log(`%c [SUCCESS] ${message}`, "color: green;")
}

function infoLog(message) {
	console.log(`%c [INFO] ${message}`, "color: cyan;")
}

function errorLog(message) {
	console.log(`%c [ERROR] ${message}`, "color: red;")
}

function dbProcessLog(message) {
	console.log(`%c [DB PROCESS] ${message}`, "color: violet;")
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
		tripNotes: "tripNotes",
		filePaths: []
	}
	const planReference = await addDoc(collection(db, "plans"), emptyPlan)
	successLog("Plan has been created succesfully with id: " + planReference.id)
	return planReference
}

export async function getPlan(planId) {
	const planRef = doc(db, "plans", planId)
	const planDoc = await getDoc(planRef)
	successLog(`Fetched plan with Id: ${planDoc.id}`)
	return planDoc.data()
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
export async function uploadFile(planId, file) {
	if (planId == undefined) {
		errorLog("PlanId is undefined")
		return false
	}
	const filePath = planId + "/" + file.name
	const fileRef = ref(storage, filePath)
	dbProcessLog("Uploading file to storage...")
	if (addFilePath(planId, filePath)) {
		await uploadBytes(fileRef, file).then((snapshot) => {
			successLog("Uploaded file: " + file.name)
		})
	} else {
		errorLog("Uploading file failed.")
	}
}

async function addFilePath(planId, filePath) {
	const planData = await getPlan(planId)
	const filePaths = planData.filePaths

	if (filePath in filePaths == false) {
		try{
			filePaths.push(filePath)
			planData.filePaths = filePaths
			dbProcessLog("Adding file path to plan document.")
			await updatePlan(planId, planData)
			return true
		}
		catch(error){
			errorLog(error.message)
			return false
		}
	} else {
		errorLog("File path already exists in plan document.")
		return false
	}
}

// async function removeFilePath(){

// }
