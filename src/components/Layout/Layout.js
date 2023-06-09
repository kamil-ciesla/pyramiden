import React, {useState} from 'react';
import {MainRouterContainer} from '../MainRouterContainer/MainRouterContainer';
import {Box} from "@mui/material";
import {AppMenu} from "../AppMenu/AppMenu";
import {Map} from "../Map/Map";

import "../../styles.css"

export const Layout = () => {
    const [markers, setMarkers] = useState([]);

    return (<>
            <div className="App">
                <Box className="left-container"
                     sx={{
                         display: 'flex',
                     }}
                >
                    <div className="app-menu-container">
                        <AppMenu/>
                    </div>
                    <Box className="left-main-content"
                         sx={{
                             display: "flex",
                             flexDirection: 'column',
                             justifyContent: 'center',
                             alignItems: 'center',
                             flexGrow: '1',
                         }}
                    >
                        <MainRouterContainer/>
                    </Box>
                </Box>
                <Box className="right-container">
                    <div className="map-container">
                        <Map markers={markers} onMapClick={markers => setMarkers(markers)}/>
                    </div>
                </Box>
            </div>
        </>);
};
