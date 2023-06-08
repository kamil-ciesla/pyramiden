import "./App.css"

import {AppMenu} from "./components/AppMenu/AppMenu"
import {Plan} from "./components/Plan/Plan"
import {Map} from "./components/Map/Map"
import {useEffect, useState} from "react";
import * as firestore from "./components/Plan/firestorePlan";
import _ from "lodash";
import {useInterval} from "./useInterval";

import {LoginView} from './views/LoginView/LoginView'
import {RegisterView} from './views/RegisterView/RegisterView'
import {Box, Container} from "@mui/material";

function App() {
    const [user, setUser] = useState(null)
    const [markers, setMarkers] = useState([]);
    const [isPlanFetched, setIsPlanFetched] = useState(false)
    const TEST_PLAN_ID = "QRw3JkCK3ipyQ7PJ7ZIp"
    const [planId, setPlanId] = useState(TEST_PLAN_ID)
    const [plan, setPlan] = useState(null)
    const [DB_PLAN, setDB_PLAN] = useState(null)
    const DB_PLAN_UPDATE_INTERVAL = 1

    useEffect(() => {
        fetchPlan(planId)
    }, [])

    function handlePlanChange(plan) {
        // CHECK IF PLAN  HAS SAME PROPERTIES
        setPlan(plan)
    }

    async function fetchPlan(planId) {
        const plan = await firestore.getPlan(planId)
        setDB_PLAN(plan)
        setPlan(plan)
        setIsPlanFetched(true)
    }

    async function updatePlan() {
        if (planId && !_.isEqual(plan, DB_PLAN)) {
            console.log('Detected changes, sending updates to database...')
            const updatedSucceeded = firestore.updatePlan(planId, plan)
            if (updatedSucceeded) setDB_PLAN(plan)
        }
    }

    useInterval(updatePlan, DB_PLAN_UPDATE_INTERVAL)

    const handleMapClick = (markers) => {
        setMarkers(markers)
    }
    return (<div className="App">
            <Box className="left-container"
                 sx={{
                     display: 'flex',
                 }}
            >
                <div className="app-menu-container">
                    <AppMenu/>
                </div>
                <Box className="left-main-content"
                     sx={{
                         display: "flex",
                         flexDirection: 'column',
                         justifyContent: 'center',
                         alignItems: 'center',
                         flexGrow: '1',
                     }}
                >
                    {user ? // <PlanView/>
                        <Plan isPlanFetched={isPlanFetched} id={planId} plan={plan}
                              onPlanChange={(plan) => handlePlanChange(plan)} markers={markers}/>
                        :
                        <LoginView/>
                        // <RegisterView/>
                    }
                </Box>
            </Box>
            <Box className="right-container">
                <div className="map-container">
                    <Map markers={markers} onMapClick={handleMapClick}/>
                </div>
            </Box>
        </div>)
}

export default App
