import {AuthProvider} from "./auth/firebaseAuth";
import {BrowserRouter} from 'react-router-dom';
import {Layout} from './components/Layout/Layout'
import {MapContextProvider} from "./components/Map/Map";
import {mainTheme} from './theme'
import {ThemeProvider} from "@mui/material";

function App() {
    return (
        <AuthProvider>
            <ThemeProvider theme={mainTheme}>
                <MapContextProvider>
                    <BrowserRouter basename="/">
                        <Layout/>
                    </BrowserRouter>
                </MapContextProvider>
            </ThemeProvider>
        </AuthProvider>
    )
}

export default App
