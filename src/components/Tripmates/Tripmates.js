import React, { useState } from "react"
import { Input, Card, CardContent, Typography, IconButton } from "@mui/material"
import AddBoxIcon from "@mui/icons-material/AddBox"
import ClearIcon from "@mui/icons-material/Clear"

import "./tripmates.css"

export const Tripmates = () => {
	const [inputs, setInputs] = useState(["Name Surname"])

	const handleAddInput = () => {
		const newInput = ""
		setInputs([...inputs, newInput])
	}

	const handleDeleteInput = (index) => {
		const newInputs = [...inputs]
		newInputs.splice(index, 1)
		setInputs(newInputs)
	}

	const handleChange = (event, index) => {
		const newInputs = [...inputs]
		newInputs[index] = event.target.value
		console.log(newInputs)
		setInputs(newInputs)
	}

	return (
		<Card className="Tripmates">
			<CardContent sx={{ display: "flex", flexDirection: "column" }}>
				<Typography>Tripmates</Typography>
				{inputs.map((input, index) => (
					<div className="tripmate-input-container">
						<Input
							key={index}
							value={input}
							onChange={(event) => handleChange(event, index)}
						/>
						<IconButton
							className="delete-tripmate-button"
							aria-label="delete"
							size="large"
							onClick={() => {
								handleDeleteInput(index)
							}}
						>
							<ClearIcon />
						</IconButton>
					</div>
				))}
				<IconButton aria-label="delete" size="large" onClick={handleAddInput}>
					<AddBoxIcon color="primary" />
				</IconButton>
			</CardContent>
		</Card>
	)
}
