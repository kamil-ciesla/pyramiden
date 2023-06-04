import {useState} from "react";
import {Card, CardContent, Typography, List, ListItem, Box, Button} from "@mui/material";

import {Day} from './Day'
import {Stage} from "./Stage";

export const Schedule = (props) => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const [days, setDays] = useState([{name: 'Day one', date: today}, {name: 'Day two', date: tomorrow}])

    return (<Card>
        <CardContent>
            <Typography variant={'h5'}>
                Trip schedule
            </Typography>
            <Box>
                <List>
                    {days.map((day, index) => (<ListItem key={index}>
                        <Day
                            markers={props.markers}
                            date={day.date} name={day.name}
                        />
                    </ListItem>))}
                </List>
            </Box>

        </CardContent>
    </Card>)
}