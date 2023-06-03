import "./App.css"

import {AppMenu} from "./components/AppMenu/AppMenu"
import {Plan} from "./components/Plan/Plan"
import {Map} from "./components/Map/Map"
import {useState} from "react";

function App() {
    const [markers, setMarkers] = useState([]);

    const handleMapClick = (markers) => {
        setMarkers(markers)
    }

    return (
        <div className="App">
            <div className="left-container">
                <AppMenu/>
                <div className="plan-container">
                    <Plan markers={markers}/>
                </div>
            </div>
            <div className="right-container">
                <div className="map-container">
                    <Map markers={markers} onMapClick={handleMapClick}/>
                </div>
            </div>
        </div>
    )
}

export default App
