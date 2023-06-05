import {DesktopDatePicker, LocalizationProvider} from "@mui/x-date-pickers"
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs"
import {Button, Grid, TextField, Typography} from "@mui/material"
import dayjs from "dayjs"
import {format} from 'date-fns';
import React, {useState} from "react";

export function Timeframe(props) {
    const [localStartDate, setLocalStartDate] = useState(props.timeframe.startDate)
    const [localEndDate, setLocalEndDate] = useState(props.timeframe.endDate)

    const [isEditable, setIsEditable] = useState(false)
    function stringifyTimeframe(timeframe){
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
                                label="Start Date"
                                format="DD-MM-YYYY"
                                value={dayjs(props.timeframe.startDate)}
                                onChange={(newStartDate) => {
                                    setLocalStartDate(newStartDate.toDate())
                                }}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </Grid>
                        <Grid item sm={6}>
                            <DesktopDatePicker
                                label="End Date"
                                format="DD-MM-YYYY"
                                value={dayjs(props.timeframe.endDate)}
                                onChange={(newEndDate) => {
                                    setLocalEndDate(newEndDate.toDate())
                                }}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </Grid>
                        <Grid item sm={12}>
                            <Button variant="contained"
                                    onClick={()=>{
                                        props.updateStartDate(localStartDate)
                                        props.updateEndDate(localEndDate)
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
                                onClick={()=>setIsEditable(true)}
                    >
                        {stringifyTimeframe(props.timeframe)}
                    </Typography>
                </Button>
            )}
    </>)
}

export function Date(props) {
    const formattedDate = format(props.date, "EEEE, MMMM do");

    return (<Typography variant={props.variant}>
        {formattedDate}
    </Typography>)
}