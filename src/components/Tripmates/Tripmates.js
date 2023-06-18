import React, {useEffect, useState} from "react"
import {
    Box,
    Button,
    Card,
    CardContent,
    Collapse,
    IconButton,
    InputAdornment,
    ListItem,
    ListItemText,
    TextField,
    Typography
} from "@mui/material"
import ClearIcon from "@mui/icons-material/Clear"
import {ExpandLess, ExpandMore} from "@mui/icons-material";

export const Tripmates = (props) => {
    const [tripmates, setTripmates] = useState(props.tripmates)

    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen(!open);
    };
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
        <Card className="Tripmates"
              onMouseOver={(e) => {
                  if (document.querySelector('.add-tripmate-button')) {
                      document.querySelector('.add-tripmate-button').style.visibility = 'visible'
                  }
              }}
              onMouseOut={(e) => {
                  if (document.querySelector('.add-tripmate-button')) {
                      document.querySelector('.add-tripmate-button').style.visibility = 'hidden'
                  }
              }}
        >
            <CardContent>
                <ListItem onClick={handleClick}>
                    <ListItemText>
                        <Typography variant='h6' textAlign='left'>Tripmates</Typography>
                    </ListItemText>
                    {open ? <ExpandLess/> : <ExpandMore/>}
                </ListItem>
                <Box sx={{display: "flex", flexDirection: "column", alignItems: 'center', justifyContent: 'center'}}>
                    <Collapse in={open} timeout="auto" unmountOnExit>

                        {props.tripmates.map((input, index) => (
                            <div className="tripmate-input-container" key={index}>
                                <TextField
                                    value={input}
                                    variant='standard'
                                    onChange={(event) => handleChange(event, index)}
                                    onMouseOver={(e) => {
                                        e.currentTarget.querySelector('.delete-tripmate-button').style.visibility = 'visible'
                                    }}
                                    onMouseOut={(e) => {
                                        e.currentTarget.querySelector('.delete-tripmate-button').style.visibility = 'hidden';
                                    }}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    className="delete-tripmate-button"
                                                    aria-label="delete"
                                                    size="small"
                                                    style={{visibility: 'hidden'}}
                                                    onClick={() => {
                                                        handleDeleteTripmate(index)
                                                    }}
                                                >
                                                    <ClearIcon/>
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }}
                                />

                            </div>
                        ))}
                        <Button
                            className='add-tripmate-button'
                            onClick={handleAddTripmate}
                            variant='outlined'
                            size='small'
                            sx={{
                                width: '70%',
                                marginTop: 2,
                                visibility: tripmates.length > 0 ? 'hidden' : 'visible'
                            }}
                        >
                            Add tripmate
                        </Button>
                    </Collapse>
                </Box>
            </CardContent>
        </Card>
    )
}
