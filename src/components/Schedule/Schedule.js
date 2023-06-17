import {useEffect, useState} from "react";
import {Box, Card, CardContent, CardHeader, Stack} from "@mui/material";

import {Day} from './Day'

export const Schedule = (props) => {
    const [days, setDays] = useState(props.days)

    function handleDayChange(day, index) {
        const newDays = [...days]
        newDays[index] = day
        setDays(newDays)
        props.onChange({
            target: {
                name: 'days',
                value: newDays
            }
        })
    }

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

    function createDay(name, date) {
        return {
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


    useEffect(() => {
        const newDays = parseTimeframeToDays(props.timeframe)
        if (newDays.length != props.days.length) {
            setDays(newDays)
        }
    }, [props.timeframe])

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
                            day={day}
                            onChange={(updatedDay) => {
                                handleDayChange(updatedDay, index)
                            }}
                        />)
                    })}
                </Stack>
            </Box>

        </CardContent>
    </Card>)
}