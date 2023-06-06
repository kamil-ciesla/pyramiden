import {useEffect, useState} from "react";

import React from 'react';
import {InputAdornment, TextField} from "@mui/material";
import RoomIcon from '@mui/icons-material/Room';
import Geocoder from 'react-native-geocoding';


export const Place = (props) => {
    Geocoder.init(process.env.REACT_APP_GOOGLE_API_KEY); // use a valid API key

    const [location, setLocation] = useState(null)
    const [locationName, setLocationName] = useState(null)
    const [places, setPlaces] = React.useState([]);
    const [isListeningForMarker, setIsListeningForMarker] = useState(false)
    const handleAddPlace = (place) => {
        setPlaces([...places, place]);
    };

    const handleRemovePlace = (place) => {
        setPlaces(places.filter((p) => p !== place));
    };

    useEffect(() => {
        if (props.markers && isListeningForMarker) {
            const newLocation = props.markers.at(-1)
            setLocation(newLocation)

            reverseGeocode(newLocation).then(locationName => {
                if (locationName) {
                    setLocationName(locationName)
                } else {
                    setLocationName(locationString(newLocation))
                }
            }, (error) => {
                setLocationName(locationString(newLocation))
            })

            setIsListeningForMarker(false)
        }
    }, [props.markers])

    function locationString(location) {
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
        setLocation(null)
        setIsListeningForMarker(true)
    }

    return (<>
        {/*<Button variant="contained" color="primary">*/}
        {/*    <Name name={props.number}/>*/}
        {/*</Button>*/}
        <TextField
            sx={{
                width: "100%",
            }}
            fullWidth
            placeholder={'Add a place'}
            value={locationName}
            onClick={listenForMarker}
            InputProps={{
                startAdornment: (<InputAdornment position="start">
                    <RoomIcon/>
                </InputAdornment>),
            }}
        />
    </>);
}
