import React, {useContext, useEffect, useState} from "react";
import * as firestore from "../../components/Plan/firestorePlan";
import _ from "lodash";
import {useInterval} from "../../useInterval";
import {Plan, getMarkersWithinDays} from "../../components/Plan/Plan";
import {AuthContext} from "../../auth/firebaseAuth";
import {useSearchParams} from 'react-router-dom';
import {MapContext} from "../../components/Map/Map";
import {routes} from '../../routes'
export function PlanView() {
    const {currentUser} = useContext(AuthContext);
    const {markers, updateMarkers} = useContext(MapContext)

    const [searchParams] = useSearchParams();
    const [planId, setPlanId] = useState(null)
    const [plan, setPlan] = useState(null)
    const [DB_PLAN, setDB_PLAN] = useState(null)
    const DB_PLAN_UPDATE_INTERVAL = 1000

    async function fetchPlan() {
        let planData
        let planId = searchParams.get('id')
        if (planId) {
            planData = await firestore.getPlanByPlanId(planId)
        } else if (await firestore.userHasAnyPlan(currentUser.uid)) {
            console.log('User already has plan, but id was not provided')
        } else {
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

    async function updateDbPlan() {
        let planToUpdate = {...plan}
        console.log('XD')
        console.log('routes base is' + routes.baseUrl)

        if (!_.isEqual(markers, getMarkersWithinDays(planToUpdate.days))) {
            planToUpdate = updatePlanMarkers(planToUpdate, markers)
            // updateMarkers(getMarkersWithinDays(planToUpdate))
            setPlan(planToUpdate)
        }
        if (planToUpdate && !_.isEqual(planToUpdate, DB_PLAN)) {
            console.log('Detected changes, sending updates to database...')
            const updatedSucceeded = firestore.updatePlan(planId, planToUpdate)
            if (updatedSucceeded) setDB_PLAN(planToUpdate)
        }
    }

    function updatePlan(newPlan) {
        setPlan(newPlan)
        updateMarkers(getMarkersWithinDays(newPlan.days))
    }

    function updatePlanMarkers(plan, newMarkers) {
        if (plan) {
            let updatedPlan = {...plan}
            if (newMarkers && newMarkers.length) {
                for (const marker of newMarkers) {
                    for (const [dayIndex, day] of updatedPlan.days.entries()) {
                        for (const [stageIndex, stage] of day.stages.entries()) {
                            if (stage.marker.id === marker.id) {
                                updatedPlan = {
                                    ...updatedPlan,
                                    days: [
                                        ...updatedPlan.days.slice(0, dayIndex),
                                        {
                                            ...day,
                                            stages: [
                                                ...day.stages.slice(0, stageIndex),
                                                {
                                                    ...stage,
                                                    marker: marker
                                                },
                                                ...day.stages.slice(stageIndex + 1)
                                            ]
                                        },
                                        ...updatedPlan.days.slice(dayIndex + 1)
                                    ]
                                }
                            }
                        }
                    }
                }
            }
            return updatedPlan
        }
    }


    useEffect(() => {
        if (currentUser) fetchPlan()

    }, [currentUser])

    useInterval(updateDbPlan, DB_PLAN_UPDATE_INTERVAL)

    return (plan &&
        <Plan
            id={planId} plan={plan}
            markers={markers}
            onPlanChange={(newPlan) => {
                updatePlan(newPlan)
            }}
        />
    )
}