import Box from "@mui/material/Box"
import TextField from "@mui/material/TextField"

const CURRENCIES = [
    {
        value: "EUR",
        label: "€"
    },
    {
        value: "GBP",
        label: "£"
    },
    {
        value: "CHF",
        label: "CHF"
    },
    {
        value: "SEK",
        label: "SEK"
    },
    {
        value: "NOK",
        label: "NOK"
    },
    {
        value: "DKK",
        label: "DKK"
    },
    {
        value: "PLN",
        label: "PLN"
    },
    {
        value: "HUF",
        label: "HUF"
    },
    {
        value: "CZK",
        label: "CZK"
    },
    {
        value: "BGN",
        label: "BGN"
    },
    {
        value: "RON",
        label: "RON"
    },
    {
        value: "HRK",
        label: "HRK"
    },
    {
        value: "TRY",
        label: "TRY"
    }
]

export function Currency(props) {
    return (
        <Box
            component="form"
            sx={{
                "& .MuiTextField-root": {
                    width: "8ch"
                }
            }}
            noValidate
            autoComplete="off"
        >
            <div>
                <TextField
                    id="standard-select-currency-native"
                    name='currency'
                    select
                    // label="Native select"
                    defaultValue={props.currency}
                    SelectProps={{
                        native: true
                    }}
                    inputProps={{
                        style: {
                            fontWeight: 'bold'
                        }
                    }}

                    onChange={event => props.onChange(event)}
                >
                    {/* <select defaultValue={props.currency}> */}
                    {CURRENCIES.map((option) => (
                        <option
                            key={option.value}
                            defaultValue={props.currency}
                        >
                            {option.label}
                        </option>
                    ))}
                    {/* </select> */}
                </TextField>
            </div>
        </Box>
    )
}
