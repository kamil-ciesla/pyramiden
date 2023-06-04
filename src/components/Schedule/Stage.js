import {useEffect, useState} from "react";

import React from 'react';
import {Autocomplete, ListItem, TextField, Typography, Button} from "@mui/material";
import {Note} from "../Note/Note";
import {Cost} from "../Cost/Cost";

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
        <>
            <TextField label="Place name"/>
            <TextField label="Coordinates"
                       value={locationString(location)}
                       disabled
            />
            <Note label="Note"/>
            <Button onClick={listenForMarker}>Choose place</Button>
        </>

        // <Autocomplete
        //     multiple
        //     id="tags-outlined"
        //     options={['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix']}
        //     getOptionLabel={(option) => option}
        //     filterSelectedOptions
        //     renderInput={(params) => (
        //         <TextField
        //             {...params}
        //             variant="outlined"
        //             label="Places"
        //             placeholder="Add a place"
        //         />
        //     )}
        //     onChange={(event, value) => {
        //         if (value.length > places.length) {
        //             handleAddPlace(value[value.length - 1]);
        //         } else {
        //             handleRemovePlace(places.find((p) => !value.includes(p)));
        //         }
        //     }}
        // />
    );
}
