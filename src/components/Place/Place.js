import {useEffect, useState} from "react";

import React from 'react';
import {Autocomplete, TextField, Typography} from "@mui/material";

export const Place = (props) => {
    const [location, setLocation] = useState(null)
    const [places, setPlaces] = React.useState([]);

    const handleAddPlace = (place) => {
        setPlaces([...places, place]);
    };

    const handleRemovePlace = (place) => {
        setPlaces(places.filter((p) => p !== place));
    };

    useEffect(()=>{
        // setLocation(props.markers[0])
        console.log('MARKERS in PLACE')
        console.log(props.markers)
        if(props.markers){
            setLocation(props.markers[0])
        }

    },[props.markers])

    return (
        <>
            <Typography variant={"h5"}>Location:</Typography>
            {location ? (
                <Typography>
                    {/*lat: {props.location.lat}, lng: {props.location.lng}*/}
                    lat: {location.lat}, lng: {location.lng}
                </Typography>
            ) : null}
        </>
        // <Autocomplete
        //     multiple
        //     id="tags-outlined"
        //     options={['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix']}
        //     getOptionLabel={(option) => option}
        //     filterSelectedOptions
        //     renderInput={(params) => (
        //         <TextField
        //             {...params}
        //             variant="outlined"
        //             label="Places"
        //             placeholder="Add a place"
        //         />
        //     )}
        //     onChange={(event, value) => {
        //         if (value.length > places.length) {
        //             handleAddPlace(value[value.length - 1]);
        //         } else {
        //             handleRemovePlace(places.find((p) => !value.includes(p)));
        //         }
        //     }}
        // />
    );
}
