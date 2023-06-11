import {GoogleMap, MarkerF, useLoadScript, OverlayView} from "@react-google-maps/api";
import {createContext, createRef, useContext, useEffect, useMemo, useRef, useState} from "react";
import "./Map.css"
import LeaderLine from 'react-leader-line'
import {Button} from "@mui/material";
import {useInterval} from "../../useInterval";

export const MapContext = createContext();

export const MapContextProvider = ({children}) => {

    const [markers, setMarkers] = useState([
        // {lat: 38.11, lng: 23.30},
        // {lat: 38.13, lng: 23.77}
    ]);

    const updateMarkers = (newMarkers) => {
        setMarkers(newMarkers);
    };

    return (
        <MapContext.Provider value={{markers, updateMarkers}}>
            {children}
        </MapContext.Provider>
    );
};

export const Map = (props) => {
    const [lines, setLines] = useState([])

    const {markers, updateMarkers} = useContext(MapContext)
    const {isLoaded} = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY
    })
    const center = useMemo(() => ({lat: 37.9838, lng: 23.7275}), []);

    const handleMapClick = (event) => {
        const {latLng} = event;
        const newMarker = {
            id: 'map-marker-' + (markers.length + 1),
            lat: latLng.lat(),
            lng: latLng.lng(),
        }
        const newMarkers = [...markers, newMarker]
        updateMarkers(newMarkers)
    };

    function connectMarkers(firstMarker, secondMarker) {
        const firstMarkerEl = document.querySelector(`[aria-label="${firstMarker.id}"]`)
        const secondMarkerEl = document.querySelector(`[aria-label="${secondMarker.id}"]`)

        const newLine = new LeaderLine(
            firstMarkerEl,
            secondMarkerEl
        )
        lines.push(newLine)
    }

    function createLines() {
        if (checkMarkersRender()) {
            if (markers.length > 1) {
                for (let i = lines.length; i < markers.length - 1; i++) {
                    connectMarkers(markers[i], markers[i + 1])
                }
            }
        }
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
        for await (const line of lines) {
            line.position()
        }
    }

    function removeLines(){
        for(const line of lines){
            line.remove()
        }
        setLines([])
    }

    const updateMarker = (index, newMarker) => {
        updateMarkers(prevState => {
            return prevState.map((item, i) => {
                if (i === index) {
                    return {newMarker};
                }
            });
        });
    };

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
                                             key={`${marker.lat}-${marker.lng}`} position={position}
                                             draggable={true}
                                             onDragEnd={(event) => {
                                                 const {latLng} = event;
                                                 const updatedMarker = {
                                                     ...marker,
                                                     lat: latLng.lat(),
                                                     lng: latLng.lng()
                                                 }
                                                 const updatedMarkers = [...markers]
                                                 updatedMarkers[index] = updatedMarker
                                                 updateMarkers(updatedMarkers)
                                                 removeLines()
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
