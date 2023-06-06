import {DesktopDatePicker, LocalizationProvider} from "@mui/x-date-pickers"
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs"
import {Button, Grid, TextField, Typography} from "@mui/material"
import dayjs from "dayjs"
import React, {useEffect, useState} from "react";

export function Timeframe(props) {

    const [timeframe, setTimeframe] = useState(props.timeframe)

    const [isEditable, setIsEditable] = useState(false)

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
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
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
                                            props.onChange(
                                                {
                                                    target: {
                                                        name: 'timeframe',
                                                        value: timeframe
                                                    }
                                                }
                                            )
                                            setIsEditable(false)
                                        }}
                                >
                                    Confirm dates
                                </Button>
                            </Grid>
                        </Grid>
                    </LocalizationProvider>

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
