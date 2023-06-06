import {useEffect, useState} from "react";
import {Card, CardContent, Typography, Stack, Box, CardHeader} from "@mui/material";

import {Day} from './Day'

export const Schedule = (props) => {
    const [days, setDays] = useState(parseTimeframeToDays(props.timeframe))

    function handleDayChange(day, index) {
        console.log(day)
        const newDays = [...days]
        newDays[index] = day
        setDays(newDays)

        props.onChange({
            target: {
                name: 'days',
                value: days
            }
        })
    }

    useEffect(() => {
        const days = parseTimeframeToDays(props.timeframe)
        console.log(props.timeframe.startDate)
        console.log(days[0].date)
        setDays(days)
        // props.onChange({
        //     target: {
        //         name: 'days',
        //         value: days
        //     }
        // })
    }, [props.timeframe])

    function parseTimeframeToDays(timeframe) {
        const days = [];
        let dayDate = new Date(timeframe.startDate)

        for (let i = 0; i <= getNumberOfDays(timeframe); i++) {
            days.push({
                name: `Day ${parseInt(days.length) + 1}`,
                date: new Date(dayDate)
            });
            dayDate.setDate(dayDate.getDate() + 1)
        }
        return days;
    }

    function getNumberOfDays(timeframe) {
        const oneDay = 1000 * 60 * 60 * 24;
        const diffInTime = timeframe.endDate.getTime() - timeframe.startDate.getTime();
        const diffInDays = Math.round(diffInTime / oneDay);
        return diffInDays;
    }

    return (<Card>
        <CardContent>
            <CardHeader
                title={"Trip schedule"}
                titleTypographyProps={{
                    align: 'left',
                    variant: 'h4'
                }}
            />
            <Box>
                <Stack spacing={2}>
                    {days.map((day, index) => {
                        console.log(day.date)
                        return (<Day
                            key={day.date}
                            markers={props.markers}
                            day={day}
                            _date={day.date}
                            onChange={(day) => handleDayChange(day, index)}
                        />)
                    })}
                </Stack>
            </Box>

        </CardContent>
    </Card>)
}