import React, { useState } from "react"
import { Card, CardContent, Typography, Input } from "@mui/material"

export const PlanTitle = (props) => {
	const [title, setTitle] = useState(props.title)
	const [isEditable, setIsEditable] = useState(false)

	const handleClick = () => {
		setIsEditable(true)
	}

	const handleBlur = (event) => {
		props.onChange(event.target.value)
		setIsEditable(false)
	}
	const onChange = (event) => {
		setTitle(event.target.value)
	}

	const onKeyPress = (event) => {
		if (event.key === "Enter") {
			setIsEditable(false)
			props.onChange(event.target.value)
		}
	}

	return (
		<Card>
			<CardContent>
				{isEditable ? (
					<Input
						value={title}
						onBlur={handleBlur}
						onChange={onChange}
						onKeyPress={onKeyPress}
						autoFocus
					/>
				) : (
					<Typography variant={props.variant} onClick={handleClick}>
						{title}
					</Typography>
				)}
			</CardContent>
		</Card>
	)
}
