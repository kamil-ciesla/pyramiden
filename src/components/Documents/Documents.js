import React, {useEffect, useState} from "react"
import {
    Box,
    Card,
    CardContent,
    Fab,
    Grid,
    IconButton,
    InputAdornment,
    TextField,
    Tooltip,
    Typography
} from "@mui/material"
import DescriptionIcon from "@mui/icons-material/Description"
import AddIcon from "@mui/icons-material/Add"

import {uploadFile} from "../Plan/firestorePlan"

import {getDownloadURL, getStorage, listAll, ref} from 'firebase/storage';
import ClearIcon from "@mui/icons-material/Clear";
import * as firestore from "../../components/Plan/firestorePlan";
import DownloadIcon from '@mui/icons-material/Download';

export function Documents(props) {
    const [files, setFiles] = useState([])

    const handleFileUpload = async (event) => {
        const file = event.target.files[0]
        const isFileUploaded = await uploadFile(props.planId, file)
        if (isFileUploaded) {
            setFiles([...files, file])
            props.onChange({
                target: {
                    name: 'filePaths',
                    value: [...props.filePaths, file.name]
                }
            })
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

    async function handleDeleteDocument(deletedFileName) {
        const deletingFileResult = await firestore.deleteFile(props.planId, deletedFileName)
        if (deletingFileResult) {
            deleteFileFromPlan(deletedFileName)
            deleteFileFromLocalState(deletedFileName)
        } else {
            console.log('FILE CACHE DELETING ERROR')
        }
    }

    function deleteFileFromPlan(deletedFileName) {
        const updatedFilePaths = [...props.filePaths].filter(function (filePath) {
            return filePath !== deletedFileName;
        })
        props.onChange({
            target: {
                name: 'filePaths',
                value: updatedFilePaths
            }
        })
    }

    function deleteFileFromLocalState(deletedFileName) {
        const updatedFiles = [...files].filter(file => {
            return file.name !== deletedFileName;
        })

        setFiles(updatedFiles)
    }

    useEffect(() => {
        fetchAllFiles();
    }, []);

    async function fetchAllFiles() {
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

    return (
        <Card className="Tripmates">
            <CardContent sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                mb: '2'
            }}>
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
                                <Tooltip key={file.name} title={file.name}>
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
                                                <>
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            className="delete-file-button"
                                                            aria-label="delete"
                                                            size="small"
                                                            onClick={() => handleFileDownload(file)}

                                                        >
                                                            <DownloadIcon/>
                                                        </IconButton>
                                                    </InputAdornment>
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            className="delete-file-button"
                                                            aria-label="delete"
                                                            size="small"
                                                            onClick={() => {
                                                                handleDeleteDocument(file.name)
                                                            }}
                                                        >
                                                            <ClearIcon/>
                                                        </IconButton>
                                                    </InputAdornment>
                                                </>
                                            )
                                        }}
                                        value={file.name}
                                        fullWidth
                                    />
                                </Tooltip>
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


