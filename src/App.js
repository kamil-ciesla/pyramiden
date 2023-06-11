import {AuthProvider} from "./auth/firebaseAuth";
import {BrowserRouter} from 'react-router-dom';
import {Layout} from './components/Layout/Layout'
import {MapContextProvider} from "./components/Map/Map";

function App() {
    return (
        <AuthProvider>
            <MapContextProvider>
                <BrowserRouter basename="/">
                    <Layout/>
                </BrowserRouter>
            </MapContextProvider>
        </AuthProvider>
    )
}

export default App
