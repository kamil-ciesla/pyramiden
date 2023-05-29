import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api"
import { useMemo } from "react"

import "./Map.css"

export const Map = () => {
	const { isLoaded } = useLoadScript({
		googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY
	})
	const center = useMemo(() => ({ lat: 37.9838, lng: 23.7275 }), [])
	return (
		<div className="Map">
			{!isLoaded ? (
				<h1>Loading...</h1>
			) : (
				<GoogleMap
					mapContainerClassName="map-container"
					center={center}
					zoom={10}
				/>
			)}
		</div>
	)
}
