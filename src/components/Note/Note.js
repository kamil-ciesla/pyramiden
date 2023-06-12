import {Card, CardContent, TextField} from "@mui/material"

export const Note = (props) => {
    return (
        <TextField
            sx={{
                width: "100%",
                // minHeight: props?.textMinHeight
            }}
            id="standard-multiline-flexible"
            label={props.label}
            multiline={props.multiline}
            rows={4}
            onChange={(event) => {
                props.onChange(event.target.value)
            }}
            placeholder={props.placeholder}
            value={props.value}

        />
    )
}
