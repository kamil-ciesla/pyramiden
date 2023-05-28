import { Card, CardContent, Typography, TextField, Box } from "@mui/material"
import { Currency } from "../Currency/Currency"

export const Budget = (props) => {
	function onChange(event) {
		props.onChange(event.target.value)
	}
	return (
		<Card className="Budget">
			<CardContent
				sx={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center"
				}}
			>
				<Box
					sx={{
						display: "flex",
						flexDirection: "row"
					}}
				>
					<TextField
						label="Budget"
						placeholder={props.placeholder}
						value={props.budget}
						onChange={onChange}
					/>
					<Currency />
				</Box>
				<Typography>
					Calculated cost of your trip: {props.cost} {props.currency}
				</Typography>
			</CardContent>
		</Card>
	)
}
