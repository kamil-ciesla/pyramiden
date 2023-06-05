import {useEffect, useState} from "react";
import {Card, CardContent, Typography, Stack, Item, Box} from "@mui/material";

import {Day} from './Day'

export const Schedule = (props) => {
    const [days, setDays] = useState([])
    function parseTimeframeToDays(timeframe) {
        const days = [];
        let date = new Date(timeframe.startDate)

        for(let i=0;i<=getNumberOfDays(timeframe);i++){
            days.push({
                name: `Day ${parseInt(days.length)+1}`, date: new Date(date)
            });
            date.setDate(date.getDate() + 1)
        }
        return days;
    }

    function getNumberOfDays(timeframe) {
        const oneDay = 1000 * 60 * 60 * 24;
        const diffInTime = timeframe.endDate.getTime() - timeframe.startDate.getTime();
        const diffInDays = Math.round(diffInTime / oneDay);
        return diffInDays;
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