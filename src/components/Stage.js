import React from "react";
import '../styles/Stage.css';
var stageId = 0

function Stage(){
    stageId+=1;
    console.log('creating stage')
    const stagePlaceholderText = "Enter name of of this travel stage";
    return <div className="Stage">
        Stage {stageId}
        <input type="text" placeholder={stagePlaceholderText}/>
        </div>
}
export default Stage