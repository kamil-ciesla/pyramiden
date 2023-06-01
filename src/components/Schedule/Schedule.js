import {useState} from "react";
import {Card, CardContent, Typography} from "@mui/material";
import {Day} from './Day'
export const Schedule = (props) => {
    const [days, setDays] = useState([])
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    return (
        <Card>
            <CardContent>
                <Typography variant={'h5'}>
                    Trip schedule
                </Typography>
                <Day markers={props.markers} date={Date.now()} name={'Arrival'}/>
                <Day date={tomorrow} name={'sightseeing'}/>

            </CardContent>
        </Card>
    )
}