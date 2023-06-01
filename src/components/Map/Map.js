import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { useMemo, useState } from "react";
import "./Map.css"

export const Map = (props) => {
    const {isLoaded} = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY
    })
    const center = useMemo(() => ({ lat: 37.9838, lng: 23.7275 }), []);
    const [markers, setMarkers] = useState(props.markers);

    const handleMapClick = (event) => {
        const { latLng } = event;
        setMarkers([...markers, { lat: latLng.lat(), lng: latLng.lng() }]);
        props.onMapClick(event)
    };

    return (
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
                    {markers.map(({ lat, lng }) => (
                        <Marker key={`${lat}-${lng}`} position={{ lat, lng }} />
                    ))}
                </GoogleMap>
            )}
        </div>
    )
}
