import {useEffect, useState} from "react";

import React from 'react';
import {InputAdornment, TextField} from "@mui/material";
import RoomIcon from '@mui/icons-material/Room';

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
            return null
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
            {/*<Button variant="contained" color="primary">*/}
            {/*    <Name name={props.number}/>*/}
            {/*</Button>*/}
            <TextField
                sx={{
                    width: "100%",
                    // minHeight: props?.textMinHeight
                }}
                fullWidth

                placeholder={'Add a place'}
                value={locationString(location)}
                onClick={listenForMarker}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <RoomIcon/>
                        </InputAdornment>
                    ),
                }}
                // onChange={(event) => {
                //     props.onChange(event.target.value)
                // }}
                // value={props.value}
            />
        </>
    );
}
