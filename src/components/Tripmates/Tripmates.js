import React, {useEffect, useState} from "react"
import {Input, Card, CardContent, Typography, IconButton} from "@mui/material"
import AddBoxIcon from "@mui/icons-material/AddBox"
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

    useEffect(()=>{
        props.onChange(
            {target:{
                    name:'tripmates',
                    value: tripmates
                }
            }
        )
    },[tripmates])

    return (
        <Card className="Tripmates">
            <CardContent sx={{display: "flex", flexDirection: "column"}}>
                <Typography>Tripmates</Typography>
                {props.tripmates.map((input, index) => (
                    <div className="tripmate-input-container" key={index}>
                        <Input
                            value={input}
                            onChange={(event) => handleChange(event, index)}
                        />
                        <IconButton
                            className="delete-tripmate-button"
                            aria-label="delete"
                            size="large"
                            onClick={() => {
                                handleDeleteTripmate(index)
                            }}
                        >
                            <ClearIcon/>
                        </IconButton>
                    </div>
                ))}
                <IconButton
                    aria-label="delete"
                    size="large"
                    onClick={handleAddTripmate}
                >
                    <AddBoxIcon color="primary"/>
                </IconButton>
            </CardContent>
        </Card>
    )
}
