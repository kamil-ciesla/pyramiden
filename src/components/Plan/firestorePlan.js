import { db } from "../../db/db"

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

function successLog(message) {
	console.log(`%c${message}`, "color: green;")
}

export async function createPlan() {
	const planReference = await addDoc(collection(db, "plans"), {})
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
	const planDoc = await getDoc(planRef)
	// const planDocData = planDoc.data()
	await updateDoc(planRef, newPlanData)
	successLog("Plan has been updated succesfully")
	return true
}
