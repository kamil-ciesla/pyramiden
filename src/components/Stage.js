import React from "react";
import '../styles/Stage.css';

function Stage(){
    const props = {
        id:1,
        orderNumber:1,
        name:'stageName',
        place: {name:'placeName', cost:0, time:0},
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
    
    props.orderNumber +=1;
    
    console.log('creating stage')
    const stagePlaceholderText = "Enter name of of this travel stage";
    return <div className="Stage">
        <p>{props.orderNumber}</p>
        <p>{props.name}</p>
        <p>{props.place.name}</p>
        <p>{props.transport.type}</p>
        <p>{props.events[0].name}</p>
        


        <input type="text" placeholder='stage description'/>
        </div>
}
export default Stage