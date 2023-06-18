import React, {useEffect, useState} from "react";
import {Box, Card, CardContent, CardHeader, Collapse, ListItem, ListItemText, Stack} from "@mui/material";

import {Day} from './Day'
import {ExpandLess, ExpandMore} from "@mui/icons-material";

export const Schedule = (props) => {
    const [days, setDays] = useState(props.days)
    const [open, setOpen] = useState(true);

    const handleClick = () => {
        setOpen(!open);
    };

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
            stages: [],
            isOpened: true
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
            <ListItem button onClick={handleClick}>
                <ListItemText>
                    <CardHeader
                        title={"Trip schedule"}
                        titleTypographyProps={{
                            align: 'left',
                            variant: 'h4'
                        }}
                    />
                </ListItemText>
                {open ? <ExpandLess/> : <ExpandMore/>}
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
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
            </Collapse>
        </CardContent>
    </Card>)
}