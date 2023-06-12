import {AuthProvider} from "./auth/firebaseAuth";
import {BrowserRouter} from 'react-router-dom';
import {Layout} from './components/Layout/Layout'
import {MapContextProvider} from "./components/Map/Map";
import {PlanContextProvider} from "./components/Plan/Plan";

function App() {
    return (
        <AuthProvider>
            <PlanContextProvider>
                <MapContextProvider>
                    <BrowserRouter basename="/">
                        <Layout/>
                    </BrowserRouter>
                </MapContextProvider>
            </PlanContextProvider>
        </AuthProvider>
    )
}

export default App
