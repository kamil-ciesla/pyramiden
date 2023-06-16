import {AuthProvider} from "./auth/firebaseAuth";
import {HashRouter} from 'react-router-dom';
import {Layout} from './components/Layout/Layout'
import {MapContextProvider} from "./components/Map/Map";
import {mainTheme} from './theme'
import {ThemeProvider} from "@mui/material";

function App() {
    return (
        <AuthProvider>
            <ThemeProvider theme={mainTheme}>
                <MapContextProvider>
                    <HashRouter basename="/">
                        <Layout/>
                    </HashRouter>
                </MapContextProvider>
            </ThemeProvider>
        </AuthProvider>
    )
}

export default App
