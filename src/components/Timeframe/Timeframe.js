import {DesktopDatePicker} from "@mui/x-date-pickers"
import {Button, Grid, TextField, Typography} from "@mui/material"
import dayjs from "dayjs"
import React, {useState} from "react";

export function Timeframe(props) {

    const [timeframe, setTimeframe] = useState(props.timeframe ?
        props.timeframe
        :
        {
            startDate: new Date(),
            endDate: new Date()
        }
    )
    const [isEditable, setIsEditable] = useState(!props.timeframe)

    function updateTimeframe() {
        if (props.days.length != 0) {
            if (!window.confirm(
                'Are you sure you want to change dates?' +
                ' You will lose all the data you have in each day.')) {
                return
            }
        }
        props.onChange({
            target: {
                name: 'timeframe',
                value: timeframe
            }
        })
        setIsEditable(false)
    }

    function stringifyTimeframe(timeframe) {

        const startDay = timeframe.startDate.getDate();
        const startMonth = timeframe.startDate.getMonth() + 1;
        const endDay = timeframe.endDate.getDate();
        const endMonth = timeframe.endDate.getMonth() + 1;

        return `${startDay}/${startMonth} - ${endDay}/${endMonth}`
    }

    return (
        <>
            {isEditable ? (
                    <Grid container spacing={4}>
                        <Grid item sm={6}>
                            <DesktopDatePicker
                                name='startDate'
                                label="Start Date"
                                format="DD-MM-YYYY"
                                value={dayjs(timeframe.startDate)}
                                onChange={(newStartDate) => {
                                    setTimeframe({...timeframe, startDate: newStartDate.toDate()})
                                }}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </Grid>
                        <Grid item sm={6}>
                            <DesktopDatePicker
                                name='endDate'
                                label="End Date"
                                format="DD-MM-YYYY"
                                value={dayjs(timeframe.endDate)}
                                onChange={(newEndDate) => {
                                    setTimeframe({...timeframe, endDate: newEndDate.toDate()})
                                }}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </Grid>
                        <Grid item sm={12}>
                            <Button variant="contained"
                                    onClick={() => {
                                        updateTimeframe()
                                    }}
                            >
                                Set dates
                            </Button>
                        </Grid>
                    </Grid>

                )
                :
                (
                    <Button>
                        <Typography variant={props.variant}
                                    onClick={() => setIsEditable(true)}
                        >
                            {stringifyTimeframe(timeframe)}
                        </Typography>
                    </Button>
                )}
        </>)
}
