import React, {useEffect, useState} from "react"
import {Button, Card, CardContent, IconButton, Input, Typography} from "@mui/material"
import ClearIcon from "@mui/icons-material/Clear"

import "./tripmates.css"

export const Tripmates = (props) => {
    const [tripmates, setTripmates] = useState(props.tripmates)
    const handleAddTripmate = () => {
        const newTripmate = ""
        setTripmates([...tripmates, newTripmate])
    }

    const handleDeleteTripmate = (index) => {
        const newTripmates = [...props.tripmates]
        newTripmates.splice(index, 1)
        setTripmates(newTripmates)
    }

    const handleChange = (event, index) => {
        const newTripmates = [...props.tripmates]
        newTripmates[index] = event.target.value
        setTripmates(newTripmates)
    }

    useEffect(() => {
        props.onChange({
            target: {
                name: 'tripmates',
                value: tripmates
            }
        })
    }, [tripmates])

    return (
        <Card className="Tripmates">
            <CardContent sx={{display: "flex", flexDirection: "column"}}>
                <Typography variant='h6'>Tripmates</Typography>
                {props.tripmates.map((input, index) => (
                    <div className="tripmate-input-container" key={index}>
                        <Input
                            value={input}
                            onChange={(event) => handleChange(event, index)}
                        />
                        <IconButton
                            className="delete-tripmate-button"
                            aria-label="delete"
                            size="small"
                            onClick={() => {
                                handleDeleteTripmate(index)
                            }}
                        >
                            <ClearIcon/>
                        </IconButton>
                    </div>
                ))}
                <Button
                    onClick={handleAddTripmate}
                >
                    Add tripmate
                </Button>

            </CardContent>
        </Card>
    )
}
