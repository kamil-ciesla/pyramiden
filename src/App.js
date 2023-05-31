import "./App.css"

import {AppMenu} from "./components/AppMenu/AppMenu"
import {Plan} from "./components/Plan/Plan"
import {Map} from "./components/Map/Map"

function App() {
    return (
        <div className="App">
            <div className="left-container">
                <AppMenu/>
                <div className="plan-container">
                    <Plan/>
                </div>
            </div>
            <div className="right-container">
                <div className="map-container">
                    <Map/>
                </div>
            </div>
        </div>
    )
}

export default App
