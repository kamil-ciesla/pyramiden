import React, {useContext, useEffect, useRef, useState} from "react";
import {Box, IconButton, InputAdornment, TextField} from "@mui/material";
import RoomIcon from '@mui/icons-material/Room';
import Geocoder from 'react-native-geocoding';
import {MapContext} from "../Map/Map";
import ClearIcon from "@mui/icons-material/Clear";

export const PlaceStage = (props) => {
    Geocoder.init(process.env.REACT_APP_GOOGLE_API_KEY); // use a valid API key
    const {
        currentMarker,
        setCurrentMarker,
        movedMarker,
        setMovedMarker
    } = useContext(MapContext)

    const stageInputRef = useRef(null);
    const [stage, setStage] = useState(props.stage)
    const [isListeningForMarker, setIsListeningForMarker] = useState(
        props.selectedStageId === stage.id
    )

    useEffect(() => {
        setIsListeningForMarker(props.selectedStageId === stage.id)
    }, [props.selectedStageId])

    useEffect(() => {
        if (!movedMarker) return
        catchMovedMarker()
    }, [movedMarker])

    function catchMovedMarker() {
        if (movedMarker.id === stage.marker.id) {
            updateMarker(movedMarker)
            setMovedMarker(null)

            stageInputRef.current.focus()
        }
    }

    useEffect(() => {
        if (currentMarker && isListeningForMarker) {
            catchNewMarker()
        }
    }, [currentMarker])

    function stageHasMarker(stage) {
        return !!(Object.keys(stage.marker).length)
    }

    async function catchNewMarker() {
        setIsListeningForMarker(false)
        updateMarker(currentMarker)
        setCurrentMarker(null)
    }

    async function updateMarker(marker) {
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

    return (
        <Box
            sx={{
                width: "100%"
            }}
        >
            <TextField
                id={'stage-input-' + stage.id}
                inputRef={stageInputRef}
                fullWidth
                placeholder={'Type the place or click on the map'}
                value={stage.locationName}
                onClick={() => {
                    setIsListeningForMarker(true)
                    props.onSelect()
                }}

                onMouseOver={(e) => {
                    e.currentTarget.querySelector('.delete-stage-button').style.visibility = 'visible';
                }}
                onMouseOut={(e) => {
                    e.currentTarget.querySelector('.delete-stage-button').style.visibility = 'hidden';
                }}
                InputProps={{
                    startAdornment: (<InputAdornment position="start">
                        <RoomIcon/>
                    </InputAdornment>),
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton
                                className='delete-stage-button'
                                aria-label="delete"
                                size="large"
                                onClick={props.handleDeleteStage}
                                style={{visibility: 'hidden'}}
                            >
                                <ClearIcon/>
                            </IconButton>
                        </InputAdornment>
                    )
                }}
            />
        </Box>);
}
