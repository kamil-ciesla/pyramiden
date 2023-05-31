import {Typography} from "@mui/material";

export const Name = (props)=>{
    return(
        <Typography variant={props.variant}>
            {props.name}
        </Typography>
    )
}