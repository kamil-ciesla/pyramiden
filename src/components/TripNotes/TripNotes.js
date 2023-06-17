import {Card, CardContent, Collapse, ListItem, ListItemText, TextField} from "@mui/material"
import Typography from "@mui/material/Typography";
import React, {useState} from "react";
import {ExpandLess, ExpandMore} from "@mui/icons-material";

export const TripNotes = (props) => {
    const [open, setOpen] = useState(true);

    const handleClick = () => {
        setOpen(!open);
    };
    return (
        <Card>
            <CardContent>
                <ListItem onClick={handleClick}>
                    <ListItemText>
                        <Typography variant='h5' textAlign='left'>Notes</Typography>
                    </ListItemText>
                    {open ? <ExpandLess/> : <ExpandMore/>}
                </ListItem>
                <Collapse in={open} timeout="auto" unmountOnExit>

                    <TextField
                        sx={{
                            width: "100%",
                        }}
                        name={'tripNotes'}
                        value={props.tripNotes}
                        onChange={props.handleChange}
                        id="standard-multiline-flexible"
                        multiline={true}
                        rows={4}
                        placeholder={"Put here some useful notes e.g. what to take for the trip"}
                        textMinHeight={'30vh'}
                    />
                </Collapse>
            </CardContent>
        </Card>
    )
}
