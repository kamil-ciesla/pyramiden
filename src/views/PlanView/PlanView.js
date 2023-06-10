import React, {useContext, useEffect, useState} from "react";
import * as firestore from "../../components/Plan/firestorePlan";
import _ from "lodash";
import {useInterval} from "../../useInterval";
import {Plan} from "../../components/Plan/Plan";
import {AuthContext} from "../../auth/firebaseAuth";
import {useSearchParams} from 'react-router-dom';
import {userHasAnyPlan} from "../../components/Plan/firestorePlan";

export function PlanView() {
    const {currentUser} = useContext(AuthContext);

    const [searchParams] = useSearchParams();
    const [planId, setPlanId] = useState(null)
    const [plan, setPlan] = useState(null)
    const [DB_PLAN, setDB_PLAN] = useState(null)
    const DB_PLAN_UPDATE_INTERVAL = 3000

    useEffect(() => {
        if (currentUser) fetchPlan()
    }, [currentUser])

    async function fetchPlan() {
        let planData
        let planId = searchParams.get('id')
        if (planId) {
            planData = await firestore.getPlanByPlanId(planId)
        } else if(await firestore.userHasAnyPlan(currentUser.uid)){
            console.log('user plan ALREADY CREATED')
        }else{
            planId = await firestore.createPlan(currentUser.uid)
            planData = await firestore.getPlanByPlanId(planId)
        }
        handlePlanData(planId, planData)
    }

    function handlePlanData(planId, planData) {
        setPlanId(planId)
        setDB_PLAN(planData)
        setPlan(planData)
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

    return (plan && <Plan
        id={planId} plan={plan}
        onPlanChange={(plan) => handlePlanChange(plan)}
        // markers={markers}
    />)
}