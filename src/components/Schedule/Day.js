import {Card, CardContent, List, ListItem, Box, Button} from "@mui/material";
import {Date} from "../Time/Time";
import {Name} from "../Name/Name"
import {Stage} from "./Stage";
import {useState} from "react";

export const Day = (props) => {
    const [stages, setStages] = useState([])

    function addStage() {
        const stage = {
            name: 'stage', note: ' ', location: {lat: 0, lng: 0}, time: 'fake_timestamp',
        }
        setStages([...stages, stage]);
    }

    return (
        <Card sx={{width: "100%"}}>
            <CardContent>
                <Date date={props.date} variant="h6"/>
                <Name name={props.name} variant={"subtitle2"}/>
                <Box>
                    <List>
                        {stages.map((stage, index) => (<ListItem key={index}>
                            <Stage number={index} name={stage.name} markers={props.markers}/>
                        </ListItem>))}
                    </List>
                    <Button onClick={addStage}>Add stage</Button>
                </Box>
            </CardContent>
        </Card>

    )
}