// Import react functions
import { useState, useEffect } from "react"

// Import custom hooks
import { useInterval } from "../../useInterval"

// Import MUI components
import { Card, Grid, CardContent, Typography } from "@mui/material"

// Import app components
import { PlanTitle } from "./PlanTitle/PlanTitle"
import { Note } from "../Note/Note"
import { Time } from "../Time/Time"
import { Tripmates } from "../Tripmates/Tripmates"
import { Budget } from "../Budget/Budget"

// Import css
import "./Plan.css"

// Import API functions
import * as firestore from "./firestorePlan"
import { db } from "../../db/db"
// Import images
import planBgImage from "../../plan-bg.jpg"

// Import othe libraries
import _ from "lodash"

// END of imports
// --------------

const planBgImageStyle = {
	backgroundImage: `url(${planBgImage})`,
	backgroundRepeat: "no-repeat",
	backgroundSize: "cover"
}

export const Plan = () => {
	const [dbPlanData, setDbPlanData] = useState(null)
	// ---------------
	// Plan properties
	const [planId, setPlanId] = useState(null)
	const [title, setTitle] = useState("Enter title for your trip")
	const [description, setDescription] = useState("")
	const [budget, setBudget] = useState(0)
	const [currency, setCurrency] = useState(null)
	const [tripNotes, setTripNotes] = useState("")
	const [startDate, setStartDate] = useState(new Date())
	const [endDate, setEndDate] = useState(new Date())
	const [tripmates, setTripmates] = useState([""])

	// END of plan properties
	// ----------------------

	const [cost, setCost] = useState(0)

	const DB_UPDATE_INTERVAL = 4000

	useEffect(() => {
		fetchPlan()
	}, [])

	async function fetchPlan() {
		const testPlanId = "02INHxSf6L7auxCyVShB"
		const plan = await firestore.getPlan(testPlanId)
		updateLocalPlan(plan)
	}
	function updateLocalPlan(plan) {
		setPlanId(plan.id)
		const planData = plan.data()
		setDbPlanData(planData)

		setTitle(planData.title)
		setDescription(planData.description)
		setBudget(planData.budget)
		setCurrency(planData.currency)
		if (planData.startDate) {
			setStartDate(planData.startDate.toDate())
		}
		if (planData.endDate) {
			setEndDate(planData.endDate.toDate())
		}
		if (planData.tripmates) {
			setTripmates(planData.tripmates)
		}
	}

	async function updateDbPlan() {
		const planData = {
			title: title,
			description: description,
			budget: budget,
			currency: currency,
			startDate: startDate,
			endDate: endDate,
			tripmates: tripmates,
			tripNotes: tripNotes
		}

		if (planId) {
			if (_.isEqual(planData, dbPlanData)) {
				console.log(
					"There were no changes to plan, No updates send to database"
				)
			} else {
				console.log("Detected changes: updating plan in database...")
				const updatedSucceeded = firestore.updatePlan(planId, planData)
				if (updatedSucceeded) {
					setDbPlanData(planData)
				}
			}
		} else {
			console.log("Plan Id is null, cannot update the plan!")
		}
	}

	useInterval(updateDbPlan, DB_UPDATE_INTERVAL)

	return (
		<div className="Plan">
			<Card
				className="plan-card"
				sx={{
					minHeight: "95vh"
				}}
			>
				<CardContent>
					<Grid className="plan-grid" container spacing={2}>
						<Grid item lg={12}>
							<div style={planBgImageStyle}>
								<div
									className="plan-title-container"
									style={{
										height: "10rem",
										display: "flex",
										flexDirection: "column",
										justifyContent: "center",
										alignItems: "center"
									}}
								>
									<PlanTitle
										variant="h4"
										title={title}
										onChange={(value) => setTitle(value)}
									/>
								</div>
							</div>
						</Grid>
						<Grid item lg={12}>
							<Note
								label={"Trip description"}
								value={description}
								placeholder={"Briefly explain the goal of your trip"}
								onChange={(value) => setDescription(value)}
							/>
						</Grid>
						<Grid item lg={12}>
							<Time
								startDate={startDate}
								endDate={endDate}
								updateStartDate={(value) => setStartDate(value)}
								updateEndDate={(value) => setEndDate(value)}
							/>
						</Grid>
						<Grid item lg={12}>
							<Tripmates
								tripmates={tripmates}
								onChange={(value) => setTripmates(value)}
							/>
						</Grid>
						<Grid item lg={12}>
							<Budget
								placeholder={"set up a budget for your trip"}
								budget={budget}
								cost={cost}
								currency={currency}
								onBudgetChange={(value) => setBudget(value)}
								onCurrencyChange={(value) => setCurrency(value)}
							/>
						</Grid>
						<Grid item lg={12}>
							<Note
								label={"Trip notes"}
								value={tripNotes}
								onChange={(value) => setTripNotes(value)}
								placeholder={
									"Put here some useful notes e.g. what to take for the trip"
								}
							/>
						</Grid>
						<Grid item lg={12}>
							<Card className="reservations">
								<CardContent>
									<Typography variant="h5">Reservations</Typography>
								</CardContent>
							</Card>
						</Grid>
						<Grid item lg={12}>
							<Card className="documents">
								<CardContent>
									<Typography variant="h5">Documents</Typography>
								</CardContent>
							</Card>
						</Grid>
						<Grid item lg={12}>
							<Card className="Trip schedule">
								<CardContent>
									<Typography variant="h5">Trip schedule</Typography>
								</CardContent>
							</Card>
						</Grid>
					</Grid>
				</CardContent>
			</Card>
		</div>
	)
}
