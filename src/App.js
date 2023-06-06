import "./App.css"

import {AppMenu} from "./components/AppMenu/AppMenu"
import {Plan} from "./components/Plan/Plan"
import {Map} from "./components/Map/Map"
import {useEffect, useState} from "react";
import * as firestore from "./components/Plan/firestorePlan";
import _ from "lodash";
import {useInterval} from "./useInterval";

function App() {
    const [markers, setMarkers] = useState([]);

    const TEST_PLAN_ID = "QRw3JkCK3ipyQ7PJ7ZIp"
    const [planId, setPlanId] =useState(TEST_PLAN_ID)
    const [plan, setPlan] =useState(null)
    const [DB_PLAN, setDB_PLAN] = useState(null)
    const DB_PLAN_UPDATE_INTERVAL = 1000

    useEffect(()=>{
        // console.log(plan?.timeframe)
    },[plan])

    useEffect(() => {
        fetchPlan(planId)
    }, [])

    function handlePlanChange(plan){
        // CHECK IF PLAN  HAS SAME PROPERTIES
        setPlan(plan)
    }
    async function fetchPlan(planId) {
        const plan = await firestore.getPlan(planId)
        setDB_PLAN(plan)
        setPlan(plan)
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
    return (
        <div className="App">
            <div className="left-container">
                <AppMenu/>
                    <Plan id={planId} plan={plan} onPlanChange={(plan)=>handlePlanChange(plan)} markers={markers}/>
            </div>
            <div className="right-container">
                <div className="map-container">
                    <Map markers={markers} onMapClick={handleMapClick}/>
                </div>
            </div>
        </div>
    )
}

export default App
