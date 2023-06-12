import React, {useState, useEffect} from "react"
import {Card, CardContent, Typography, Input, Button} from "@mui/material"

export const PlanTitle = (props) => {
    const [title, setTitle] = useState(props.title)

    useEffect(() => {
        setTitle(props.title)
    }, [props.title])

    const [isEditable, setIsEditable] = useState(false)

    const handleClick = () => {
        setIsEditable(true)
    }

    const onChange = (title) => {
        setTitle(title)
    }

    function handleTitleChange() {
        if (isTitleNotBlank(title)) {
            setIsEditable(false)
            props.onChange({
                target: {
                    name: 'title',
                    value: title
                }
            })
        } else {
            alert('Title cannot be blank');
        }
    }

    function isTitleNotBlank(title) {
        return !!title || !(title.trim() === "")
    }

    return (
        <>
            {isEditable ? (
                <>
                    <Input
                        required
                        value={title}
                        onBlur={handleTitleChange}
                        onChange={event => onChange(event.target.value)}
                        onKeyPress={event => {
                            if (event.key === "Enter") handleTitleChange()
                        }}
                        autoFocus
                    />

                </>
            ) : (
                <Typography variant={props.variant} onClick={handleClick}>
                    {title}
                </Typography>
            )}
        </>
    )
}
