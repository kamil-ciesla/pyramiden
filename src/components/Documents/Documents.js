import { useState } from "react"
import { Fab } from "@mui/material"
import {
	Tooltip,
	Avatar,
	Card,
	CardContent,
	Typography,
	Box
} from "@mui/material"
import DescriptionIcon from "@mui/icons-material/Description"
import AddIcon from "@mui/icons-material/Add"

import { uploadFile } from "../Plan/firestorePlan"

export function Documents(props) {
	const [files, setFiles] = useState([])

	const handleFileUpload = async (event) => {
		const file = event.target.files[0]
		setFiles([...files, file])
		await uploadFile(props.planId, file)
	}

	const handleFileDownload = (file) => {
		const url = URL.createObjectURL(file)
		const link = document.createElement("a")
		link.href = url
		link.download = file.name
		document.body.appendChild(link)
		link.click()
		document.body.removeChild(link)
	}

	return (
		<>
			<Typography variant="h5">Documents</Typography>
			<Box
				className="files"
				sx={{
					display: "flex"
				}}
			>
				{files.map((file) => (
					<Box
						className="file"
						sx={{
							width: "10rem"
						}}
					>
						<Tooltip key={file.name} title={file.name}>
							<Box className="file-container" style={{ cursor: "pointer" }}>
								<DescriptionIcon
									key={file.name}
									alt={file.name}
									src={URL.createObjectURL(file)}
									fontSize="large"
									onClick={() => handleFileDownload(file)}
								/>
								<Typography noWrap="false">{file.name}</Typography>
							</Box>
						</Tooltip>
					</Box>
				))}
			</Box>
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
