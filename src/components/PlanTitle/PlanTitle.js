import React, { useState, useRef, useEffect } from "react"
import { Card, CardContent, Typography, Input } from "@mui/material"

export const PlanTitle = (props) => {
	// const useFocus = () => {
	// 	const htmlElRef = useRef(null)
	// 	const setFocus = () => {
	// 		setIsEditable(true)
	// 		htmlElRef.current && htmlElRef.current.focus()
	// 	}

	// 	return [htmlElRef, setFocus]
	// }
	// const [inputRef, setInputFocus] = useFocus()

	const [title, setTitle] = useState(props.title)
	const [isEditable, setIsEditable] = useState(false)

	const handleClick = () => {
		setIsEditable(true)
	}

	const handleBlur = (event) => {
		props.onUpdate(event.target.value)
		setIsEditable(false)
	}
	const handleOnChange = (event) => {
		setTitle(event.target.value)
	}

	const handleUpdate = (event) => {
		if (event.key === "Enter") {
			setIsEditable(false)
			props.onUpdate(event.target.value)
		}
	}

	return (
		<Card>
			<CardContent>
				{isEditable ? (
					// <input ref={inputRef} />
					<Input
						value={title}
						onBlur={handleBlur}
						onChange={handleOnChange}
						focused={"true"}
					/>
				) : (
					<Typography variant="h4" onClick={handleClick}>
						{title}
					</Typography>
				)}
			</CardContent>
		</Card>
	)
}
