import {DateTitle} from "../Time/Time";
import {Card, CardContent} from "@mui/material";
import {Name} from "../Name/Name"
import {Cost} from "../Cost/Cost"
import {Place} from "../Place/Place";
export const Day = (props) => {

    return (
        <Card>
            <CardContent>
                <DateTitle date={props.date}/>
                <Name name={props.name}/>
                <Cost/>
                <div className="cost">Cost</div>
                <div className="cost">Note</div>
                <div className="cost">Events</div>
                <Place markers={props.markers}/>
                <div className="cost">Reservations</div>
            </CardContent>
        </Card>

    )
}