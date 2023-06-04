import {useEffect, useState} from "react";

import React from 'react';
import {Card, CardContent, TextField, Button} from "@mui/material";
import {Note} from "../Note/Note";
import {Name} from "../Name/Name";

export const Stage = (props) => {
    const [location, setLocation] = useState(null)
    const [places, setPlaces] = React.useState([]);
    const [isListeningForMarker, setIsListeningForMarker] = useState(false)
    const handleAddPlace = (place) => {
        setPlaces([...places, place]);
    };

    const handleRemovePlace = (place) => {
        setPlaces(places.filter((p) => p !== place));
    };

    useEffect(()=>{
        if(props.markers && isListeningForMarker) {
            console.log('DETECTED new LOCATION')
            setLocation(props.markers.at(-1))
            setIsListeningForMarker(false)
        }

    },[props.markers])

    function locationString(location) {
        if (location) {
            location = formatLatLng(location)
            return `lat: ${location.lat}, lng: ${location.lng}`
        } else {
            return 'Not defined'
        }
    }

    function formatLatLng(location) {
        const lat = location.lat.toFixed(2);
        const lng = location.lng.toFixed(2);
        return {lat, lng};
    }

    function listenForMarker() {
        console.log('started listening')
        setLocation(null)
        setIsListeningForMarker(true)
    }

    return (
            <Card sx={{width:"100%"}}>
                <CardContent>
                    <Button variant="contained" color="primary">
                        <Name name={props.number}/>
                    </Button>
                    <Note label="Note"/>

                    <TextField label="Place name"/>
                    <TextField label="Coordinates"
                               value={locationString(location)}
                               disabled
                    />
                    <Button onClick={listenForMarker}>Choose place</Button>
                </CardContent>
            </Card>


    );
}
