// Import react functions
import React, {useContext, useEffect, useState} from "react"

// Import MUI components
import {Box, Card, CardContent, Grid} from "@mui/material"

// Import app components
import {PlanTitle} from "../PlanTitle/PlanTitle"
import {Timeframe} from "../Timeframe/Timeframe"
import {Tripmates} from "../Tripmates/Tripmates"
import {Schedule} from "../Schedule/Schedule";

// Import images
import planBgImage from "../../plan-bg.jpg"
import {MapContext} from "../Map/Map";
import {TripNotes} from "../TripNotes/TripNotes";
import {Documents} from "../Documents/Documents";
import {Budget} from "../Budget/Budget";

export function getMarkersWithinDays(days) {
    const markers = [];
    days.forEach(day => {
        day.stages.forEach(stage => {
            if (Object.keys(stage.marker).length) markers.push(stage.marker);
        });
    });
    return markers;
}

export const Plan = (props) => {
    const [plan, setPlan] = useState(props.plan)
    const {updateMarkers} = useContext(MapContext)


    const handleChange = (e) => {
        setPlan({...plan, [e.target.name]: e.target.value})
        props.onPlanChange({...plan, [e.target.name]: e.target.value})
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
        updateMarkers(getMarkersWithinDays(props.plan.days))
    }, [props.plan])

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
                        width: "fit-content",

                    }}>
                        <CardContent>
                            <Grid container>
                                <Grid item sm={12}>
                                    <PlanTitle
                                        title={plan.title}
                                        onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item sm={12}>
                                    <Timeframe
                                        timeframe={plan.timeframe ? convertedTimeframe(plan.timeframe) : null}
                                        onChange={handleChange}
                                        days={plan.days}
                                    />
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </div>
            </Grid>
            <Grid item sm={12}>
                <TripNotes
                    tripNotes={plan.tripNotes}
                    onChange={handleChange}
                />
            </Grid>
            <Grid item sm={12} md={6}>
                <Tripmates
                    tripmates={plan.tripmates}
                    onChange={handleChange}
                />
            </Grid>
            <Grid item sm={12} md={6}>
                <Documents
                    planId={props.id}
                    filePaths={plan.filePaths}
                    onChange={handleChange}
                />
            </Grid>
            {
                plan.timeframe && (
                    <Grid item sm={12}>
                        <Schedule
                            days={plan.days}
                            timeframe={convertedTimeframe(plan.timeframe)}
                            onChange={handleChange}
                        />
                    </Grid>
                )
            }

            <Grid item sm={12}>
                <Budget
                    budget={plan.budget}
                    currency={plan.currency}
                    onChange={handleChange}
                />
            </Grid>
        </Grid>
    </Box>)
}

// const [open, setOpen] = useState(false);
//
// const handleClick = () => {
//     setOpen(!open);
// };

// <div>
//     <ListItem button onClick={handleClick}>
//         <ListItemText primary="My List"/>
//         {open ? <ExpandLess/> : <ExpandMore/>}
//     </ListItem>
//     <Collapse in={open} timeout="auto" unmountOnExit>
//         <List component="div" disablePadding>
//             <ListItem button>
//                 <ListItemText primary="Item 1"/>
//             </ListItem>
//             <ListItem button>
//                 <ListItemText primary="Item 2"/>
//             </ListItem>
//             <ListItem button>
//                 <ListItemText primary="Item 3"/>
//             </ListItem>
//         </List>
//     </Collapse>
// // </div>
