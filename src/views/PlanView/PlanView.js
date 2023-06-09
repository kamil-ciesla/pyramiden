import React, {useContext, useEffect, useState} from "react";
import * as firestore from "../../components/Plan/firestorePlan";
import _ from "lodash";
import {useInterval} from "../../useInterval";
import {Plan} from "../../components/Plan/Plan";
import {AuthContext} from "../../auth/firebaseAuth";

export function PlanView() {
    const {currentUser} = useContext(AuthContext);

    const [planId, setPlanId] = useState(null)
    const [plan, setPlan] = useState(null)
    const [DB_PLAN, setDB_PLAN] = useState(null)
    const DB_PLAN_UPDATE_INTERVAL = 3000

    useEffect(() => {
        if(currentUser) fetchPlan()
    }, [currentUser])

    async function fetchPlan(){
        firestore.getPlanByUserId(currentUser.uid).then(async result => {
            let planId, plan
            if (!result) {
                console.log('no plans found, creating new plan!')
                planId = await firestore.createPlan(currentUser.uid)
                plan = await firestore.getPlanByPlanId(planId)
            } else {
                planId = result.planId
                plan = result.data
            }
            setPlanId(planId)
            setDB_PLAN(plan)
            setPlan(plan)
            console.log(plan)
        })
    }
    function handlePlanChange(plan) {
        // CHECK IF PLAN  HAS SAME PROPERTIES
        setPlan(plan)
    }

    async function updatePlan() {
        if (plan && !_.isEqual(plan, DB_PLAN)) {
            console.log('Detected changes, sending updates to database...')
            const updatedSucceeded = firestore.updatePlan(planId, plan)
            if (updatedSucceeded) setDB_PLAN(plan)
        }
    }

    useInterval(updatePlan, DB_PLAN_UPDATE_INTERVAL)

    return (
        plan &&
        <Plan
            id={planId} plan={plan}
                  onPlanChange={(plan) => handlePlanChange(plan)}
            // markers={markers}
        />)
}