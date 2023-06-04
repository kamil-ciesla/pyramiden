import {useEffect, useState} from "react";
import {Card, CardContent, Typography, Stack, Item, Box} from "@mui/material";

import {Day} from './Day'

export const Schedule = (props) => {
    const [days, setDays] = useState([])

    function parseTimeframeToDays(timeframe) {
        const days = [];
        for (let date = new Date(timeframe.startDate); date <= timeframe.endDate; date.setDate(date.getDate() + 1)) {
            days.push({
                name: `Day ${parseInt(days.length)+1}`, date: new Date(date)
            });
        }
        return days;
    }

    useEffect(() => {
        setDays(parseTimeframeToDays(props.timeframe))
    }, [props.timeframe])

    return (<Card>
        <CardContent>
            <Typography variant={'h5'}>
                Trip schedule
            </Typography>
            <Box>
                <Stack>
                    {days.map((day, index) => (
                        <Day
                            markers={props.markers}
                            date={day.date}
                            name={day.name}
                        />
                    ))}
                </Stack>
            </Box>

        </CardContent>
    </Card>)
}