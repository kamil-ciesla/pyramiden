// Import react functions
import {useState, useEffect} from "react"

// Import custom hooks
import {useInterval} from "../../useInterval"

// Import MUI components
import {Card, Grid, Box, CardContent, Typography, CardMedia, TextField} from "@mui/material"

// Import app components
import {PlanTitle} from "../PlanTitle/PlanTitle"
import {Timeframe} from "../Timeframe/Timeframe"
import {Tripmates} from "../Tripmates/Tripmates"
import {Documents} from "../Documents/Documents"

// Import API functions
import * as firestore from "./firestorePlan"
import {db} from "../../db/db"
// Import images
import planBgImage from "../../plan-bg.jpg"

// Import othe libraries
import {Schedule} from "../Schedule/Schedule";
import {Currency} from "../Currency/Currency";
import _ from "lodash";

// END of imports
// --------------

export const Plan = (props) => {
    const [plan, setPlan] = useState(props.plan)

    const handleChange = (e) => {
        // console.log('TIMEFRAME BEFORE')
        // console.log(plan.timeframe.startDate.toDate())
        // console.log('TIMEFRAME AFTER')
        // console.log(e.target.value.startDate)

        setPlan(plan=>({...plan, [e.target.name]: e.target.value}))
        // props.onPlanChange(plan => ({...plan, [e.target.name]: e.target.value}))
    }

    function convertedTimeframe(timeframe) {
        return isDate(plan.timeframe.startDate) ?
            timeframe :
            convertTimeframeToDate(timeframe)
    }

    function convertTimeframeToDate(timeframe) {
        return {
            startDate: timeframe.startDate.toDate(),
            endDate: timeframe.endDate.toDate()
        }
    }

    function isDate(obj) {
        return obj instanceof Date && !isNaN(obj.valueOf());
    }

    useEffect(() => {
        setPlan(props.plan)
        console.log('xd')
    }, [props.isPlanFetched])

    return plan && (<Box sx={{
        width: "100%", minHeight: "95vh",
    }}>
        <Grid className="plan-grid" container spacing={2}>
            <Grid item sm={12}>
                <div
                    style={{
                        backgroundImage: `url(${planBgImage})`,
                        backgroundSize: "cover",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        padding: "2rem"
                    }}
                >
                    <Card sx={{
                        width: "50%",
                    }}>
                        <CardContent>
                            <Grid container>
                                <Grid item sm={12}>
                                    <PlanTitle
                                        variant="h4"
                                        title={plan.title}
                                        onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item sm={12}>
                                    <Timeframe
                                        timeframe={convertedTimeframe(plan.timeframe)}
                                        onChange={handleChange}
                                    />
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </div>
            </Grid>
            <Grid item sm={12}>
                <TextField
                    sx={{
                        width: "100%",
                    }}
                    name={'tripNotes'}
                    value={plan.tripNotes}
                    onChange={handleChange}
                    id="standard-multiline-flexible"
                    label={"Trip notes"}
                    multiline={true}
                    rows={4}
                    placeholder={"Put here some useful notes e.g. what to take for the trip"}
                    textMinHeight={'30vh'}
                />
            </Grid>
            <Grid item sm={12}>
                <Schedule
                    days={plan.days}
                    markers={props.markers}
                    _timeframe={plan.timeframe}
                    timeframe={convertedTimeframe(plan.timeframe)}
                    onChange={handleChange}
                />
            </Grid>
            <Grid item sm={6}>
                <Tripmates
                    tripmates={plan.tripmates}
                    onChange={handleChange}
                />
            </Grid>
            <Grid item sm={6}>
                <Card>
                    <CardContent
                        sx={{
                            display: "flex", flexDirection: "column", alignItems: "center"
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex", flexDirection: "row"
                            }}
                        >
                            <TextField
                                name='budget'
                                label="Budget"
                                placeholder={"set up a budget for your trip"}
                                value={plan.budget}
                                onChange={handleChange}
                            />
                            <Currency
                                currency={plan.currency}
                                onChange={handleChange}
                            />
                        </Box>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item sm={12}>
                <Card className="documents">
                    <CardContent>
                        <Typography variant="h5">
                            <Documents
                                planId={props.id}
                            />
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
            {/*<Grid item sm={12}>*/}
            {/*    <Card className="reservations">*/}
            {/*        <CardContent>*/}
            {/*            <Typography variant="h5">Reservations</Typography>*/}
            {/*        </CardContent>*/}
            {/*    </Card>*/}
            {/*</Grid>*/}
        </Grid>
    </Box>)
}
