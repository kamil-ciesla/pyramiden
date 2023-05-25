import { LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { TextField } from "@mui/material"
import { DesktopDatePicker } from "@mui/x-date-pickers"

import { useState } from "react"
import dayjs from "dayjs"

export function Time(props) {
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
