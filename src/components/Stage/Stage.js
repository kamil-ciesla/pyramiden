import {useEffect, useState} from "react";

import React from 'react';
import {InputAdornment, TextField} from "@mui/material";
import RoomIcon from '@mui/icons-material/Room';
import Geocoder from 'react-native-geocoding';


export const Stage = (props) => {
    Geocoder.init(process.env.REACT_APP_GOOGLE_API_KEY); // use a valid API key
    const [stage, setStage] = useState(props.stage)
    const [locationName, setLocationName] = useState(null)
    const [isListeningForMarker, setIsListeningForMarker] = useState(false)

    // const handleRemovePlace = (place) => {
    //     setPlaces(places.filter((p) => p !== place));
    // };

    useEffect(() => {
        if (props.markers && isListeningForMarker) {
            setIsListeningForMarker(false)

            const lastMarkerLocation = props.markers.at(-1)
            const newLocation = lastMarkerLocation
            fetchAndUpdateLocationName(newLocation)

            const updatedStage = {...stage, location: newLocation}
            setStage(updatedStage)
            props.onChange(updatedStage)
        }
    }, [props.markers])

    function fetchAndUpdateLocationName(location) {
        reverseGeocode(location).then(locationName => {
            if (locationName) {
                updateLocationName(locationName)
            } else {
                updateLocationName(locationCoordinatesAsString(location))
            }
        }, (error) => {
            updateLocationName(locationCoordinatesAsString(location))
        })
    }

    function updateLocationName(name) {
        // stage.locationName = name

        const updatedStage = {...stage, locationName: name}
        setStage(updatedStage)
        props.onChange(updatedStage)
    }

    function locationCoordinatesAsString(location) {
        if (location) {
            location = formatLatLng(location)
            return `lat: ${location.lat}, lng: ${location.lng}`
        } else {
            return null
        }
    }

    async function reverseGeocode(location) {
        try {
            const json_result = await Geocoder.from({
                lat: location.lat, lng: location.lng
            });
            const placeLongName = json_result.results[0].address_components[1].long_name
            return placeLongName
        } catch (e) {
            console.log(e)
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
        setIsListeningForMarker(true)
    }

    return (<>
        <TextField
            sx={{
                width: "100%",
            }}
            fullWidth
            placeholder={'Add a place'}
            value={stage.locationName}
            onClick={listenForMarker}
            InputProps={{
                startAdornment: (<InputAdornment position="start">
                    <RoomIcon/>
                </InputAdornment>),
            }}
        />
    </>);
}
