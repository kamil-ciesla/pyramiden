import React from "react";
import '../styles/Stage.css';

function Stage(){
    const props = {
        id:1,
        stageNumber:1,
        name:'stageName',
        place: {name:'Akureyri', cost:0, time:0},
        transport: {type:'transportType', name:'transportName', cost:0, time:0},
        events:[
            {
                id:1,
                name:'eventName',
                time:0,
                cost:0
            }
        ]
    }
    
    props.stageNumber +=1;
    
    console.log('creating stage')
    const stagePlaceholderText = "Enter name of of this travel stage";
    
    return <div className="Stage">
        <div className="header">
        <div className="stage-number">{props.stageNumber}</div>
        <div className="stage-name">{props.place.name}</div>
        <div>{sumCost(props)}</div>
        <div>{sumTime(props)}</div>
        </div>
        <div className="stage-events">
            <div className="event">
                <div className="event-name">
                    Swimming
                </div>
                <div className="event-cost">
                    100PLN
                </div>
                <div className="event-time">
                    2 hrs
                </div>
            </div>
            <div className="event">
                <div className="event-name">
                    Electric bikes
                </div>
                <div className="event-cost">
                    200PLN
                </div>
                <div className="event-time">
                    1 hrs
                </div>
            </div>
            <div className="event">
                <div className="event-name">
                Castle sightseeing
                </div>
                <div className="event-cost">
                    400PLN
                </div>
                <div className="event-time">
                    3 hrs
                </div>
            </div>
        </div>
        </div>
}
export default Stage

function sumCost(props){
    return '500PLN'
}
function sumTime(props){
    return '8 hrs'
}