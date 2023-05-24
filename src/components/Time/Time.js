import { LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
// import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';

// export const Time = () => {
//     return (
//         <LocalizationProvider dateAdapter={AdapterDayjs}>
//             <DateRangePicker localeText={{ start: 'Start', end: 'End' }} />
//         </LocalizationProvider>
//     );
// }

import { TextField } from "@mui/material"

import React, { useState } from "react"
import { DesktopDatePicker } from "@mui/x-date-pickers"

export function Time() {
	const [startDate, setStartDate] = useState(null)
	const [endDate, setEndDate] = useState(null)

	return (
		<LocalizationProvider dateAdapter={AdapterDayjs}>
			<DesktopDatePicker
				label="Start Date"
				inputFormat="MM/dd/yyyy"
				value={startDate}
				onChange={(newValue) => {
					setStartDate(newValue)
				}}
				renderInput={(params) => <TextField {...params} />}
			/>
			<DesktopDatePicker
				label="End Date"
				inputFormat="MM/dd/yyyy"
				value={endDate}
				onChange={(newValue) => {
					setEndDate(newValue)
				}}
				renderInput={(params) => <TextField {...params} />}
			/>
		</LocalizationProvider>
	)
}
