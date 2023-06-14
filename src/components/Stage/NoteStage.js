import {useContext, useEffect, useState} from "react";

import React from 'react';
import {Box, IconButton, InputAdornment, TextField} from "@mui/material";
import NoteIcon from '@mui/icons-material/Note';
import ClearIcon from "@mui/icons-material/Clear";

export const NoteStage = (props) => {
    const [stage, setStage] = useState(props.stage)

    function handleNoteChange(note) {
        const updatedStage = {...stage, note: note}
        setStage(updatedStage)
        props.onChange(updatedStage)
    }

    return (
        <Box
            sx={{
                width: "100%"
            }}
        >
            <TextField
                fullWidth
                placeholder={'Add a note'}
                value={stage.note}
                onChange={(e) => handleNoteChange(e.target.value)}
                onMouseOver={(e) => {
                    e.currentTarget.querySelector('.delete-stage-button').style.visibility = 'visible';
                }}
                onMouseOut={(e) => {
                    e.currentTarget.querySelector('.delete-stage-button').style.visibility = 'hidden';
                }}
                InputProps={{
                    startAdornment: (<InputAdornment position="start">
                        <NoteIcon/>
                    </InputAdornment>),
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton
                                className='delete-stage-button'
                                aria-label="delete"
                                size="large"
                                onClick={props.handleDeleteStage}
                                style={{visibility: 'hidden'}}
                            >
                                <ClearIcon/>
                            </IconButton>
                        </InputAdornment>
                    )
                }}
            />
        </Box>);
}
