import {GoogleMap, MarkerF} from "@react-google-maps/api";
import React, {createContext, useContext, useEffect, useState} from "react";
import "./Map.css"
import LeaderLine from 'react-leader-line'
import {useInterval} from "../../useInterval";
import {Box} from "@mui/material";
import {createMarker} from "./marker";

export const MapContext = createContext();

export const MapContextProvider = ({children}) => {
    const [markers, setMarkers] = useState([]);
    const [currentMarker, setCurrentMarker] = useState(null)
    const [movedMarker, setMovedMarker] = useState(null)
    const [center, setCenter] = useState(null)
    const [currentCenter, setCurrentCenter] = useState(null)
    const [zoom, setZoom] = useState(8)

    const updateMarkers = (newMarkers) => {
        setMarkers(newMarkers);
    };

    return (
        <MapContext.Provider value={
            {
                markers, updateMarkers,
                currentMarker, setCurrentMarker,
                movedMarker, setMovedMarker,
                center, setCenter,
                currentCenter, setCurrentCenter,
                zoom, setZoom
            }
        }>
            {children}
        </MapContext.Provider>
    );
};

export const Map = (props) => {
    const [lines, setLines] = useState([])
    const [linePathShape, setLinePathShape] = useState('magnet')

    const {
        markers, updateMarkers,
        setCurrentMarker, setMovedMarker,
        center, setCurrentCenter,
        zoom
    } = useContext(MapContext)

    const handleMapClick = (event) => {
        const {latLng} = event;
        const location = {
            lat: latLng.lat(),
            lng: latLng.lng()
        }
        const newMarker = createMarker(location, true)
        setCurrentCenter(location)
        setCurrentMarker(newMarker)
    };

    function connectMarkers(firstMarker, secondMarker, options = {}) {
        const firstMarkerEl = document.querySelector(`[aria-label="${firstMarker.id}"]`)
        const secondMarkerEl = document.querySelector(`[aria-label="${secondMarker.id}"]`)

        const newLine = new LeaderLine(
            {
                start: firstMarkerEl,
                end: secondMarkerEl,
                path: linePathShape,
                dropShadow: true,
                hide: !!options?.isNew,
                // dash: options?.isMoving ? {animation: true} : false
            }
        )

        if (options.isNew) newLine.show(['draw'])
        lines.push(newLine)
        return newLine
    }

    function areThereNewMarkers() {
        for (const marker of markers) {
            if (marker.isNew) {
                return true
            }
        }
        return false
    }

    function createLines() {
        if (checkMarkersRender()) {
            if (markers.length > 1) {
                for (let i = lines.length; i < markers.length - 1; i++) {
                    try {
                        connectMarkers(markers[i], markers[i + 1], {
                            isNew: markers[i + 1]?.isNew,
                            isMoving: markers[i + 1].isMoving
                        })
                        markers[i + 1].isNew = false
                    } catch (error) {
                        console.log(error.message)
                    }
                }
            }
        }
    }

    function updateLinePathShape(path) {
        setLinePathShape(path)
        setLines([])
    }

    function checkMarkersRender() {
        for (const marker of markers) {
            if (!document.querySelector(`[aria-label="${marker.id}"]`)) {
                return false
            }
        }
        return true
    }

    async function refreshLines() {
        if (lines.length) {
            for (const line of lines) {
                try {
                    line.position()
                } catch (error) {
                    try {
                        removeLines()
                    } catch (error) {
                    }
                }
            }
        }
    }

    function removeLines() {
        for (const line of lines) {
            line.remove()
        }
        setLines([])
    }

    const handleMarkerDrop = (event, marker, markerIndex) => {
        const {latLng} = event;
        const movedMarker = {
            ...marker,
            isMoving: false,
            lat: latLng.lat(),
            lng: latLng.lng(),
        }
        const updatedMarkers = [...markers]
        updatedMarkers[markerIndex] = movedMarker
        updateMarkers(updatedMarkers)

        setMovedMarker(movedMarker)
    }

    useEffect(() => {
        console.log('removing lines!!!')
        removeLines()
    }, [markers.length])

    useInterval(refreshLines, 1)
    useInterval(createLines, 1)

    return (
        <Box
            position="sticky"
            sx={{
                height: '100vh',
            }}>

            <GoogleMap
                mapContainerClassName="map-container"
                center={center}
                zoom={zoom}
                onClick={handleMapClick}
                options={{
                    mapTypeId: 'terrain'
                }}
            >


                {markers.map((marker, index) => {
                        const position = {lat: marker.lat, lng: marker.lng}
                        return (
                            <MarkerF title={marker.id}
                                     key={marker.id} position={position}
                                     draggable={true}
                                     onDragStart={() => {
                                         marker.isMoving = true
                                         const updatedMarkers = [...markers]
                                         markers[index] = marker
                                         updateMarkers(updatedMarkers)
                                         removeLines()
                                     }}
                                     onDragEnd={(event) => {
                                         // updateLinePathShape('straight')
                                         handleMarkerDrop(event, marker, index)
                                     }}
                            />
                        )
                    }
                )}
            </GoogleMap>
        </Box>
    )
}
