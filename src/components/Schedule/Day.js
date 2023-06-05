import {Card, CardContent, List, ListItem, Box, Button, CardHeader, Input, TextField, Divider} from "@mui/material";
import {Stage} from "./Stage";
import {useState} from "react";
import {format} from "date-fns";

export const Day = (props) => {
    const [stages, setStages] = useState([
        {
            name: 'stage', note: ' ', location: {lat: 0, lng: 0}, time: 'fake_timestamp',
        }
    ])
    const formattedDate = format(props.date, "EEEE, MMMM do")

    function addStage() {
        const stage = {
            name: 'stage', note: ' ', location: {lat: 0, lng: 0}, time: 'fake_timestamp',
        }
        setStages([...stages, stage]);
    }

    return (<Card sx={{width: "100%"}}>
            <CardHeader
                title={formattedDate}
                titleTypographyProps={{
                    align: 'left',
                }}
                subheader={<Input
                    defaultValue={props.name}
                    inputProps={{'aria-label': 'description'}}
                    size="small"

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
                                    <Stage number={index} name={stage.name} markers={props.markers}/>
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