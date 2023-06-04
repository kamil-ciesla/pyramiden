// Import react functions
import {useState, useEffect} from "react"

// Import custom hooks
import {useInterval} from "../../useInterval"

// Import MUI components
import {Card, Grid, CardContent, Typography} from "@mui/material"

// Import app components
import {PlanTitle} from "./PlanTitle/PlanTitle"
import {Note} from "../Note/Note"
import {Timeframe} from "../Time/Time"
import {Tripmates} from "../Tripmates/Tripmates"
import {Budget} from "../Budget/Budget"
import {Documents} from "../Documents/Documents"

// Import API functions
import * as firestore from "./firestorePlan"
import {db} from "../../db/db"
// Import images
import planBgImage from "../../plan-bg.jpg"

// Import othe libraries
import _ from "lodash"
import {Schedule} from "../Schedule/Schedule";

// END of imports
// --------------

const planBgImageStyle = {
    backgroundImage: `url(${planBgImage})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover"
}

export const Plan = (props) => {
    const [dbPlanData, setDbPlanData] = useState(null)
    // ---------------
    // Plan properties
    const TEST_PLAN_ID = "Flup0DKYEI3XHd5MLj8q"
    const [planId, setPlanId] = useState(TEST_PLAN_ID)
    const [title, setTitle] = useState(null)
    const [description, setDescription] = useState("")
    const [budget, setBudget] = useState(0)
    const [currency, setCurrency] = useState(null)
    const [tripNotes, setTripNotes] = useState("")
    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState(new Date())
    const [tripmates, setTripmates] = useState([""])
    const [files, setFiles] = useState([])
    const [days, setDays] = useState([])
    // END of plan properties
    // ----------------------

    const [cost, setCost] = useState(0)
    const DB_UPDATE_INTERVAL = 4000

    useEffect(() => {
        fetchPlan()
    }, [])

    async function fetchPlan() {
        const planData = await firestore.getPlan(planId)
        updateLocalPlan(planData)
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

        if (planId && !_.isEqual(planData, dbPlanData)) {
            console.log('Detected changes, sending updates to database...')
            const updatedSucceeded = firestore.updatePlan(planId, planData)
            if (updatedSucceeded) setDbPlanData(planData)
        }
    }

    function updateLocalPlan(planData) {
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
        setTripNotes(planData.tripNotes)
        setFiles(planData.filePaths)
    }

    useInterval(updateDbPlan, DB_UPDATE_INTERVAL)

    return (
        <Card
            className="plan-card"
            sx={{
                width: "100%",
                minHeight: "95vh"
            }}
        >
            <CardContent>
                <Grid className="plan-grid" container spacing={2}>
                    <Grid item sm={12}>
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
                    <Grid item sm={12}>
                        <Timeframe
                            startDate={startDate}
                            endDate={endDate}
                            updateStartDate={(value) => setStartDate(value)}
                            updateEndDate={(value) => setEndDate(value)}
                        />
                    </Grid>

                    <Grid item sm={12}>
                        <Schedule markers={props.markers}/>
                    </Grid>
                    <Grid item sm={6}>
                        <Tripmates
                            tripmates={tripmates}
                            onChange={(value) => setTripmates(value)}
                        />
                    </Grid>
                    <Grid item sm={6}>
                        <Budget
                            placeholder={"set up a budget for your trip"}
                            budget={budget}
                            cost={cost}
                            currency={currency}
                            onBudgetChange={(value) => setBudget(value)}
                            onCurrencyChange={(value) => setCurrency(value)}
                        />
                    </Grid>
                    <Grid item sm={12}>
                        <Note
                            label={"Trip notes"}
                            value={tripNotes}
                            onChange={(value) => setTripNotes(value)}
                            multiline={true}
                            placeholder={
                                "Put here some useful notes e.g. what to take for the trip"
                            }
                            textMinHeight={'30vh'}
                        />
                    </Grid>

                    {/*<Grid item sm={12}>*/}
                    {/*    <Card className="reservations">*/}
                    {/*        <CardContent>*/}
                    {/*            <Typography variant="h5">Reservations</Typography>*/}
                    {/*        </CardContent>*/}
                    {/*    </Card>*/}
                    {/*</Grid>*/}
                    <Grid item sm={12}>
                        <Card className="documents">
                            <CardContent>
                                <Typography variant="h5">
                                    <Documents
                                        planId={planId}
                                        files={files}
                                    />
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}

function addDay(){

}

function addDayStage(){

}
