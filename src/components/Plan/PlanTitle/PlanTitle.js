import React, {useState, useEffect} from "react"
import {Card, CardContent, Typography, Input} from "@mui/material"

export const PlanTitle = (props) => {
    const [localTitle, setLocalTitle] = useState(props.title)

    useEffect(() => {
        setLocalTitle(props.title)
    }, [props.title])

    const [isEditable, setIsEditable] = useState(false)

    const handleClick = () => {
        setIsEditable(true)
    }

    const onChange = (title) => {
        setLocalTitle(title)
    }

    function handleTitleChange() {
        if (isTitleNotBlank(localTitle)) {
            setIsEditable(false)
            props.onChange(localTitle)
        } else {
            alert('Title cannot be blank');
        }
    }

    function isTitleNotBlank(title) {
        return !!title || !(title.trim() === "")
    }

    return (
        <Card>
            <CardContent>
                {isEditable ? (
                    <Input
                        required
                        value={localTitle}
                        onBlur={handleTitleChange}
                        onChange={event => onChange(event.target.value)}
                        onKeyPress={event => {
                            if (event.key === "Enter") handleTitleChange()
                        }}
                        autoFocus
                    />
                ) : (
                    <Typography variant={props.variant} onClick={handleClick}>
                        {localTitle}
                    </Typography>
                )}
            </CardContent>
        </Card>
    )
}
