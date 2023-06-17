import {Box, Card, CardContent, TextField} from "@mui/material";
import {Currency} from "../Currency/Currency";
import React from "react";
import Typography from "@mui/material/Typography";

export function Budget(props) {

    return (
        <Card>
            <CardContent
                sx={{
                    display: "flex", flexDirection: "column"
                }}
            >
                <Typography variant='h5' textAlign='left'>Budget</Typography>

                <Box
                    sx={{
                        display: "flex", flexDirection: "row"
                    }}
                >
                    <TextField
                        name='budget'
                        // label="Budget"
                        placeholder={"set up a budget for your trip"}
                        value={props.budget}
                        onChange={props.onChange}
                    />
                    <Currency
                        name='currency'
                        currency={props.currency}
                        onChange={props.onChange}
                    />
                </Box>
            </CardContent>
        </Card>
    )
}