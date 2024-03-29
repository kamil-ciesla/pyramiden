import React, {useContext, useEffect, useState} from "react";
import * as firestore from "../../components/Plan/firestorePlan";
import _ from "lodash";
import {useInterval} from "../../useInterval";
import {getMarkersWithinDays, Plan} from "../../components/Plan/Plan";
import {AuthContext} from "../../auth/firebaseAuth";
import {useSearchParams} from 'react-router-dom';
import {MapContext} from "../../components/Map/Map";

export function PlanView() {
    const {currentUser} = useContext(AuthContext);
    const {markers, updateMarkers, currentCenter, setCenter} = useContext(MapContext)

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
        updatePlan(planData)
        let mapCenter = null
        try {
            mapCenter = {
                lat: planData.days[0].stages[0].marker.lat,
                lng: planData.days[0].stages[0].marker.lng,
            }
        } catch (error) {
            mapCenter = {lat: 51.13, lng: 21.42}
        }
        setCenter(mapCenter)
    }


    async function updateDbPlan() {
        if (plan) {
            let planToUpdate = {...plan}
            if (!_.isEqual(markers, getMarkersWithinDays(planToUpdate.days))) {
                planToUpdate = updatePlanMarkers(planToUpdate, markers)
                setPlan(planToUpdate)
            }
            if (planToUpdate && !_.isEqual(planToUpdate, DB_PLAN)) {
                console.log('Detected changes, sending updates to database...')
                if (planToUpdate) {
                    if (currentUser) {
                        const updatedSucceeded = firestore.updatePlan(planId, planToUpdate)
                        if (updatedSucceeded) setDB_PLAN(planToUpdate)
                    }
                }
            }
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
        if (currentUser) {
            fetchPlan()
        } else {
            setPlan(null)
        }
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