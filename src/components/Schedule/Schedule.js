import {useEffect, useState} from "react";
import {Card, CardContent, Typography, Stack, Box, CardHeader} from "@mui/material";

import {Day} from './Day'

export const Schedule = (props) => {
    const [days, setDays] = useState(parseTimeframeToDays(props.timeframe))

    function handleDayChange(day, index) {
        const newDays = [...days]
        newDays[index] = day
        setDays(newDays)
        console.log('CHANGING DAY')
        props.onChange({
            target: {
                name: 'days',
                value: newDays
            }
        })
    }


    useEffect(() => {
        const days = parseTimeframeToDays(props.timeframe)
        setDays(days)
        console.log('DAYS')

    }, [props.timeframe])

    function parseTimeframeToDays(timeframe) {
        const days = [];
        let dayDate = new Date(timeframe.startDate)

        for (let i = 0; i <= getNumberOfDays(timeframe); i++) {
            const dayName = `Day ${parseInt(days.length) + 1}`
            const day = createDay(dayName, dayDate)
            days.push(day);

            dayDate.setDate(dayDate.getDate() + 1)
        }
        return days;
    }

    function createDay(name, date){
        return{
            name: name,
            date: new Date(date),
            stages: []
        }
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
                        return (<Day
                            key={day.date}
                            markers={props.markers}
                            day={day}
                            onChange={(day) => handleDayChange(day, index)}
                        />)
                    })}
                </Stack>
            </Box>

        </CardContent>
    </Card>)
}