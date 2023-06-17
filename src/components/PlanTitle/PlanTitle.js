import React, {useEffect, useState} from "react"
import {TextField, Typography} from "@mui/material"

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
                    <TextField
                        required
                        value={title}
                        variant='standard'
                        inputProps={{
                            style: {
                                fontSize: '2rem',
                                fontWeight: 'bold'
                            }
                        }}
                        onBlur={handleTitleChange}
                        onChange={event => onChange(event.target.value)}
                        onKeyPress={event => {
                            if (event.key === "Enter") handleTitleChange()
                        }}
                        autoFocus
                    />

                </>
            ) : (
                <Typography variant='h4' fontWeight='bold' onClick={handleClick}>
                    {title}
                </Typography>
            )}
        </>
    )
}
