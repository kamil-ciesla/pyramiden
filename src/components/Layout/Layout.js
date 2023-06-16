import React from 'react';
import {Router} from '../MainRouterContainer/Router';
import {Box, Grid} from "@mui/material";
import {Map} from "../Map/Map";
import "../../styles.css"
import {AppMenu} from "../AppMenu/AppMenu";

export const Layout = () => {
    return (<>
        <div id="App" className="App">
            <Grid container
            >
                <Grid item className="left-container"
                      sm={12}
                      md={6}
                      lg={4}
                      sx={{
                          display: 'flex',
                          flexDirection: 'column',

                      }}>
                    <Box sx={{
                        position: 'sticky',
                        top: '0',
                        zIndex: '3'
                    }}>
                        <AppMenu/>
                    </Box>
                    <Box className="left-main-content"
                         sx={{
                             scrollbarGutter: 'stable',
                             overflow: 'auto',
                             direction: 'rtl',
                             overflowX: 'hidden',
                             flexGrow: '1',

                         }}
                    >
                        <Box className="content" sx={{
                            direction: 'ltr',
                            display: "flex",
                            flexDirection: 'column',
                            justifyContent: 'center',
                            height: '100%',
                            alignItems: 'center',
                        }}>
                            <Router/>
                        </Box>
                    </Box>
                </Grid>
                <Grid item sm={12} md={6} lg={8} className="right-container"
                      sx={{
                          overflow: 'hidden'
                      }}>
                    <Map/>
                </Grid>
            </Grid>
        </div>
    </>);
};
