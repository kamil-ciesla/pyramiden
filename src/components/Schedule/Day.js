import {Card, CardContent, List, ListItem, Box, Button, CardHeader, Input, TextField, Divider} from "@mui/material";
import {Stage} from "./Stage";
import {useState} from "react";
import {format} from "date-fns";
import {Place} from "../Place/Place";

export const Day = (props) => {
    const [day, setDay] = useState(props.day)
    const [stages, setStages] = useState([
        {
            name: 'stage', note: ' ', location: {lat: 0, lng: 0}, time: 'fake_timestamp',
        }
    ])

    const formattedDate = format(day.date, "EEEE, MMMM do")

    function addStage() {
        const stage = {
            name: 'stage', note: ' ', location: {lat: 0, lng: 0}, time: 'fake_timestamp',
        }
        setStages([...stages, stage]);
    }

    const handleChange = (e) => {
        setDay(day=>({...day, [e.target.name]: e.target.value}))
        props.onChange(day=>({...day, [e.target.name]: e.target.value}))
    }

    return (<Card sx={{width: "100%"}}>
            <CardHeader
                title={formattedDate}
                titleTypographyProps={{
                    align: 'left',
                }}
                subheader={
                    <Input
                        name='name'
                        value={day.name}
                        defaultValue={day.name}
                        inputProps={{'aria-label': 'description'}}
                        size="small"
                        onChange={handleChange}
                    />}
                subheaderTypographyProps={{
                    align: 'left', padding: '0', margin: '0'
                }}
            />
            <CardContent>
                <Box>
                    <List>
                        {stages.map((stage, index) => (
                            <>
                                <ListItem key={index}>
                                    <Place
                                        // number={index}
                                        // name={stage.name}
                                        markers={props.markers}
                                    />
                                </ListItem>
                                <Divider light/>
                            </>
                        ))}
                    </List>
                    <Button onClick={addStage}>Add stage</Button>
                </Box>
            </CardContent>
        </Card>

    )
}