import React, {useState, useEffect} from "react"
import {Card, CardContent, Fab, Grid, IconButton, Input, InputAdornment, TextField} from "@mui/material"
import {
    Typography,
    Box
} from "@mui/material"
import DescriptionIcon from "@mui/icons-material/Description"
import AddIcon from "@mui/icons-material/Add"

import {uploadFile} from "../Plan/firestorePlan"

import {getStorage, ref, listAll, getDownloadURL} from 'firebase/storage';
import ClearIcon from "@mui/icons-material/Clear";
import NoteIcon from "@mui/icons-material/Note";
import * as PropTypes from "prop-types";


export function Documents(props) {
    const [files, setFiles] = useState([])

    const handleFileUpload = async (event) => {
        const file = event.target.files[0]
        const isFileUploaded = await uploadFile(props.planId, file)
        if (isFileUploaded) {
            setFiles([...files, file])
        }
    }

    const handleFileDownload = (file) => {
        const link = document.createElement('a');
        link.href = file.url;
        link.download = file.name;
        link.target = '_blank';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    useEffect(() => {
        async function fetchData() {
            const storage = getStorage();
            const storageRef = ref(storage, props.planId);
            const res = await listAll(storageRef);

            const files = [];
            for (const itemRef of res.items) {
                const url = await getDownloadURL(itemRef);
                files.push({name: itemRef.name, url: url});
            }
            setFiles(files);
        }

        fetchData();
    }, []);

    return (
        <Card className="Tripmates">
            <CardContent sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent:"space-between",
                mb:'2'
            }} >
                <Grid container spacing={2}>
                    <Grid item sm={12}>
                        <Typography variant='h6'>Documents</Typography>
                        {files.map((file, index) => (
                            <Box className="file-container" key={index}
                                 sx={{
                                     cursor: "pointer",
                                     display: 'flex',
                                     alignItems: 'center'
                                 }}
                            >

                                <TextField
                                    variant='filled'
                                    InputProps={{
                                        readOnly: true,
                                        startAdornment: (<InputAdornment position="start">
                                            <DescriptionIcon
                                                key={file.name}
                                                alt={file.name}
                                                fontSize="medium"
                                            />
                                        </InputAdornment>),
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    className="delete-file-button"
                                                    aria-label="delete"
                                                    size="small"
                                                    onClick={() => {
                                                        // handleDeleteTripmate(index)
                                                    }}
                                                >
                                                    <ClearIcon/>
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }}
                                    value={file.name}
                                    fullWidth
                                    onClick={() => handleFileDownload(file)}
                                />

                            </Box>
                        ))}
                    </Grid>
                    <Grid item sm={12}>
                        <label>
                            <input
                                style={{display: "none"}}
                                type="file"
                                onChange={handleFileUpload}
                            />
                            <Fab
                                color="secondary"
                                size='medium'
                                e="small"
                                component="span"
                                aria-label="add"
                                variant="extended"
                            >
                                <AddIcon/> Upload File
                            </Fab>
                        </label>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}


