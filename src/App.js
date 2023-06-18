import {AuthProvider} from "./auth/firebaseAuth";
import {HashRouter} from 'react-router-dom';
import {Layout} from './components/Layout/Layout'
import {MapContextProvider} from "./components/Map/Map";
import {mainTheme} from './theme'
import {ThemeProvider} from "@mui/material";
import {LoadScript} from "@react-google-maps/api";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {LocalizationProvider} from "@mui/x-date-pickers";

function App() {
    return (
        <AuthProvider>
            <ThemeProvider theme={mainTheme}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_API_KEY} libraries={['places']}>
                        <MapContextProvider>
                            <HashRouter basename="/">
                                <Layout/>
                            </HashRouter>
                        </MapContextProvider>
                    </LoadScript>
                </LocalizationProvider>
            </ThemeProvider>
        </AuthProvider>
    )
}

export default App
