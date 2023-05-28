import Box from "@mui/material/Box"
import TextField from "@mui/material/TextField"

const currencies = [
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

export function Currency() {
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
					select
					// label="Native select"
					defaultValue={currencies[0].value}
					SelectProps={{
						native: true
					}}
					// helperText="Please select your currency"
				>
					{currencies.map((option) => (
						<option key={option.value} value={option.value}>
							{option.label}
						</option>
					))}
				</TextField>
			</div>
		</Box>
	)
}
