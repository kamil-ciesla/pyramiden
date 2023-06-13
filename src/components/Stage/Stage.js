import {useContext, useEffect, useState} from "react";

import React from 'react';
import {InputAdornment, TextField} from "@mui/material";
import RoomIcon from '@mui/icons-material/Room';
import Geocoder from 'react-native-geocoding';
import {MapContext} from "../Map/Map";


export const Stage = (props) => {
    Geocoder.init(process.env.REACT_APP_GOOGLE_API_KEY); // use a valid API key
    const {markers} = useContext(MapContext)

    const [stage, setStage] = useState(props.stage)
    const [isListeningForMarker, setIsListeningForMarker] = useState(false)

    // const handleRemovePlace = (place) => {
    //     setPlaces(places.filter((p) => p !== place));
    // };

    useEffect(() => {
        if (markers && isListeningForMarker) {
            catchMarker()
        }
    }, [markers])

    async function catchMarker() {
        setIsListeningForMarker(false)
        const marker = (markers.at(-1))
        const markerLocation = {lat: marker.lat, lng: marker.lng}
        const locationName = await fetchLocationName(markerLocation)

        const updatedStage = {
            ...stage,
            marker: marker,
            locationName: locationName ? locationName : locationCoordinatesAsString(markerLocation)
        }

        setStage(updatedStage)
        props.onChange(updatedStage)
    }

    async function fetchLocationName(location) {
        return reverseGeocode(location).then(locationName => {
            if (locationName) {
                return locationName
            } else {
                return null
            }
        }, (error) => {
            return null
        })
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
