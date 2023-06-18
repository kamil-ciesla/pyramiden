import React, {useContext, useEffect, useRef, useState} from "react";
import {Box, IconButton, InputAdornment, TextField} from "@mui/material";
import RoomIcon from '@mui/icons-material/Room';
import Geocoder from 'react-native-geocoding';
import {MapContext} from "../Map/Map";
import ClearIcon from "@mui/icons-material/Clear";
import {StandaloneSearchBox} from "@react-google-maps/api";
import {convertDateIfNeeded} from "../../time";
import {createMarker} from "../Map/marker";

export const PlaceStage = (props) => {
    Geocoder.init(process.env.REACT_APP_GOOGLE_API_KEY); // use a valid API key
    const {
        currentMarker, setCurrentMarker,
        movedMarker, setMovedMarker,
    } = useContext(MapContext)

    const stageInputRef = useRef(null);
    const [stage, setStage] = useState(props.stage)
    const [isListeningForMarker, setIsListeningForMarker] = useState(
        props.selectedStageId === stage.id
    )
    const [searchBox, setSearchBox] = useState(null)


    function catchMovedMarker() {
        if (movedMarker.id === stage.marker.id) {
            updateMarker(movedMarker)
            setMovedMarker(null)

            stageInputRef.current.focus()
        }
    }


    function stageHasMarker(stage) {
        return !!(Object.keys(stage.marker).length)
    }

    async function catchNewMarker() {
        setIsListeningForMarker(false)
        updateMarker(currentMarker)
        setCurrentMarker(null)
    }

    async function updateMarker(marker, locationName = null) {
        const markerLocation = {lat: marker.lat, lng: marker.lng}
        if (!locationName) {
            locationName = await fetchLocationName(markerLocation)
        }

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

    const onPlacesChanged = () => {
        const catchedPlace = searchBox?.getPlaces()[0]
        if (catchedPlace) {
            const location = {
                lat: catchedPlace.geometry.location.lat(),
                lng: catchedPlace.geometry.location.lng()
            }
            const newMarker = createMarker(location)
            let locationName = catchedPlace.address_components[1].long_name
            if (!locationName) {
                locationName = locationCoordinatesAsString(location)
            }
            updateMarker(newMarker, locationName)
        }
    };
    const onLoad = ref => {
        setSearchBox(ref)
    };

    function handleTimeChange(newTime) {
        const date = convertDateIfNeeded(newTime)
        const updatedStage = {...stage, time: date}
        setStage(updatedStage)
        props.onChange(updatedStage)
    }

    useEffect(() => {
        setStage(props.stage)
    }, [props.stage])

    useEffect(() => {
        setIsListeningForMarker(props.selectedStageId === stage.id)
    }, [props.selectedStageId])

    useEffect(() => {
        if (!movedMarker) return
        catchMovedMarker()
    }, [movedMarker])

    useEffect(() => {
        if (currentMarker && isListeningForMarker) {
            catchNewMarker()
        }
    }, [currentMarker])

    return (
        <Box
            sx={{
                width: "100%",
                display: 'flex'
            }}
        >
            <Box
                sx={{
                    flexGrow: 1
                }}
            >

                <StandaloneSearchBox onLoad={onLoad} onPlacesChanged={onPlacesChanged}>
                    <TextField
                        fullWidth
                        id={'stage-input-' + stage.id}
                        inputRef={stageInputRef}
                        placeholder={'Type the place or click on the map'}
                        value={stage.locationName}
                        onClick={() => {
                            setIsListeningForMarker(true)
                            props.onSelect()
                        }}
                        onChange={(event) => {
                            setStage({...stage, locationName: event.target.value})
                        }}

                        onMouseOver={(e) => {
                            e.currentTarget.querySelector('.end-adornments').style.visibility = 'visible';
                        }}
                        onMouseOut={(e) => {
                            e.currentTarget.querySelector('.end-adornments').style.visibility = 'hidden';
                        }}
                        InputProps={{
                            autoComplete: "off",
                            startAdornment: (<InputAdornment position="start">
                                <RoomIcon/>
                            </InputAdornment>),
                            endAdornment: (
                                <div className='end-adornments' style={{visibility: 'hidden'}}>
                                    <InputAdornment position="end">
                                        <IconButton
                                            className='delete-stage-button'
                                            aria-label="delete"
                                            size="large"
                                            onClick={props.handleDeleteStage}
                                        >
                                            <ClearIcon/>
                                        </IconButton>
                                        {/*<IconButton*/}
                                        {/*    size="large"*/}
                                        {/*    onClick={() => {*/}
                                        {/*        const TimeContainer = document.getElementById('time-picker-container-' + stage.id)*/}
                                        {/*        TimeContainer.style.display = 'block';*/}
                                        {/*    }}*/}
                                        {/*>*/}
                                        {/*    <MoreTimeIcon/>*/}
                                        {/*</IconButton>*/}

                                    </InputAdornment>
                                </div>
                            )
                        }}
                    />
                </StandaloneSearchBox>
            </Box>
            {/*<Box*/}
            {/*    sx={{*/}
            {/*        width: '20%',*/}
            {/*        display: stage.time ? 'block' : 'none'*/}
            {/*    }}*/}
            {/*    id={'time-picker-container-' + stage.id}*/}
            {/*    className='time-picker-container'*/}
            {/*    onClick={() => {*/}
            {/*        console.log(convertDateIfNeeded(stage.time))*/}
            {/*    }}*/}
            {/*>*/}
            {/*    <MobileTimePicker*/}
            {/*        ampm={false}*/}
            {/*        openTo="hours"*/}
            {/*        sx={{*/}
            {/*            align: 'center'*/}
            {/*        }}*/}
            {/*        value={() => {*/}
            {/*            console.log(stage.time)*/}
            {/*            return stage.time ? convertDateIfNeeded(stage.time) : new Date()*/}
            {/*        }}*/}
            {/*        onChange={handleTimeChange}*/}
            {/*    />*/}
            {/*</Box>*/}
        </Box>);
}
