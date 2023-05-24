import { Card, CardContent, TextField } from "@mui/material"

export const Note = (props) => {
	const onChange = (event) => {
		props.onChange(event.target.value)
	}

	return (
		<Card>
			<CardContent>
				<TextField
					sx={{
						width: "100%"
					}}
					id="standard-multiline-flexible"
					label={props.label}
					multiline
					rows={4}
					onChange={onChange}
					placeholder={props.placeholder}
					value={props.value}
				/>
			</CardContent>
		</Card>
	)
}
