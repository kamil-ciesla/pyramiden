import "./App.css"

import { Plan } from "./components/Plan/Plan"
import { Map } from "./components/Map/Map"

function App() {
	return (
		<div className="App">
			<div className="plan-container">
				<Plan />
			</div>
			<Map />
		</div>
	)
}

export default App
