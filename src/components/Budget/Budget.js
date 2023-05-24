import { Card, CardContent, Typography, Input } from "@mui/material"

export const Budget = (props) => {
	function onChange(event) {
		props.onChange(event.target.value)
	}
	return (
		<Card className="Budget">
			<CardContent>
				Budget:
				<Input
					placeholder={props.placeholder}
					value={props.budget}
					onChange={onChange}
				/>
				<Typography>
					Calculated cost of your trip: {props.cost} {props.currency}
				</Typography>
			</CardContent>
		</Card>
	)
}
