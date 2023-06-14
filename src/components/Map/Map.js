import {GoogleMap, MarkerF, useLoadScript} from "@react-google-maps/api";
import {createContext, useContext, useMemo, useState} from "react";
import "./Map.css"
import LeaderLine from 'react-leader-line'
import {useInterval} from "../../useInterval";
import {createRandomId} from "../../idGenerator";

export const MapContext = createContext();

export const MapContextProvider = ({children}) => {
    const [markers, setMarkers] = useState([]);
    const [currentMarker, setCurrentMarker] = useState(null)
    const [movedMarker, setMovedMarker] = useState(null)
    const updateMarkers = (newMarkers) => {

        setMarkers(newMarkers);
    };

    return (
        <MapContext.Provider value={
            {
                markers,
                updateMarkers,
                currentMarker,
                setCurrentMarker,
                movedMarker,
                setMovedMarker
            }
        }>
            {children}
        </MapContext.Provider>
    );
};

export const Map = (props) => {
    const [lines, setLines] = useState([])
    const [linePathShape, setLinePathShape] = useState('magnet')
    const {markers, updateMarkers, setCurrentMarker, setMovedMarker} = useContext(MapContext)
    const {isLoaded} = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY
    })
    const center = useMemo(() => ({lat: 37.9838, lng: 23.7275}), []);

    const handleMapClick = (event) => {
        const {latLng} = event;
        const newMarker = {
            id: createRandomId(),
            lat: latLng.lat(),
            lng: latLng.lng(),
        }
        setCurrentMarker(newMarker)
    };

    function connectMarkers(firstMarker, secondMarker) {
        const firstMarkerEl = document.querySelector(`[aria-label="${firstMarker.id}"]`)
        const secondMarkerEl = document.querySelector(`[aria-label="${secondMarker.id}"]`)

        const newLine = new LeaderLine(
            {
                start: firstMarkerEl,
                end: secondMarkerEl,
                path: linePathShape
            }
        )
        // newLine.path ='magnet'
        lines.push(newLine)
        return newLine
    }

    function createLines() {
        if (checkMarkersRender()) {
            if (markers.length > 1) {
                for (let i = lines.length; i < markers.length - 1; i++) {
                    try {
                        connectMarkers(markers[i], markers[i + 1])
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
                    console.log('refreshing lines failed')
                    try {
                        removeLines()
                    } catch (error) {
                        console.log(error.message)
                    }
                    console.log(error.message)
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
            lat: latLng.lat(),
            lng: latLng.lng()
        }
        const updatedMarkers = [...markers]
        updatedMarkers[markerIndex] = movedMarker
        updateMarkers(updatedMarkers)
        setMovedMarker(movedMarker)
        createLines()
        removeLines()
    }

    useInterval(refreshLines, 1)
    useInterval(createLines, 1)

    return (
        <>
            <div className="Map">
                {!isLoaded ? (
                    <h1>Loading...</h1>
                ) : (
                    <GoogleMap
                        mapContainerClassName="map-container"
                        center={center}
                        zoom={10}
                        onClick={handleMapClick}
                    >
                        {markers.map((marker, index) => {
                                const position = {lat: marker.lat, lng: marker.lng}
                                return (
                                    <MarkerF title={marker.id}
                                             key={marker.id} position={position}
                                             draggable={true}
                                             onDragEnd={(event) => {
                                                 // updateLinePathShape('straight')
                                                 handleMarkerDrop(event, marker, index)
                                             }}
                                    />
                                )
                            }
                        )}
                    </GoogleMap>
                )
                }
            </div>
        </>
    )
}
