import { useState } from "react"
import { Fab } from "@mui/material"
import { Input, Card, CardContent, Typography, IconButton } from "@mui/material"
import DescriptionIcon from "@mui/icons-material/Description"
import AddIcon from "@mui/icons-material/Add"

export function Documents() {
	const [files, setFiles] = useState([])

	const handleFileUpload = (event) => {
		const file = event.target.files[0]
		setFiles([...files, file])
	}

	return (
		<>
			<Typography variant="h5">Documents</Typography>
			<div className="files">
				{files.map((file) => (
					<DescriptionIcon
						key={file.name}
						alt={file.name}
						src={URL.createObjectURL(file)}
						fontSize="large"
					/>
				))}
			</div>
			<label htmlFor="upload-photo">
				<input
					style={{ display: "none" }}
					id="upload-photo"
					name="upload-photo"
					type="file"
					onChange={handleFileUpload}
				/>
				<Fab
					color="secondary"
					siz
					e="small"
					component="span"
					aria-label="add"
					variant="extended"
				>
					<AddIcon /> Upload File
				</Fab>
			</label>
		</>
	)
}
