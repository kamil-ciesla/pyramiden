import {LocalizationProvider} from "@mui/x-date-pickers"
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs"
import {TextField} from "@mui/material"
import {DesktopDatePicker} from "@mui/x-date-pickers"
import {Typography} from "@mui/material";
import dayjs from "dayjs"
import {format} from 'date-fns';

export function Timeframe(props) {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopDatePicker
                label="Start Date"
                format="DD-MM-YYYY"
                value={dayjs(props.startDate)}
                onChange={(newValue) => {
                    props.updateStartDate(newValue.toDate())
                }}
                renderInput={(params) => <TextField {...params} />}
            />
            <DesktopDatePicker
                label="End Date"
                format="DD-MM-YYYY"
                value={dayjs(props.endDate)}
                onChange={(newValue) => {
                    props.updateEndDate(newValue.toDate())
                }}
                renderInput={(params) => <TextField {...params} />}
            />
        </LocalizationProvider>
    )
}

export function Date(props) {
    const formattedDate = format(props.date, "EEEE, MMMM do");

    return (
        <Typography variant={props.variant}>
            {formattedDate}
        </Typography>
    )
}