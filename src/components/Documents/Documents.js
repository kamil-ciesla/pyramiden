import React, {useEffect, useState} from "react"
import {
    Box,
    Card,
    CardContent,
    Collapse,
    Fab,
    Grid,
    IconButton,
    InputAdornment,
    List,
    ListItem,
    ListItemText,
    TextField,
    Tooltip
} from "@mui/material"
import DescriptionIcon from "@mui/icons-material/Description"
import AddIcon from "@mui/icons-material/Add"

import {uploadFile} from "../Plan/firestorePlan"

import {getDownloadURL, getStorage, listAll, ref} from 'firebase/storage';
import ClearIcon from "@mui/icons-material/Clear";
import * as firestore from "../../components/Plan/firestorePlan";
import DownloadIcon from '@mui/icons-material/Download';
import {ExpandLess, ExpandMore} from "@mui/icons-material";
import Typography from "@mui/material/Typography";

export function Documents(props) {
    const [files, setFiles] = useState([])
    const [open, setOpen] = useState(!props.filePaths.length);

    const handleClick = () => {
        setOpen(!open);
    };
    const handleFileUpload = async (event) => {
        const file = event.target.files[0]
        const isFileUploaded = await uploadFile(props.planId, file)
        if (isFileUploaded) {
            await fetchAllFiles()
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
        <Card
        >
            <CardContent

                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    mb: '2'
                }}>
                <ListItem onClick={handleClick}>
                    <ListItemText>
                        <Typography variant='h6'>Documents</Typography>
                    </ListItemText>
                    {open ? <ExpandLess/> : <ExpandMore/>}
                </ListItem>
                <Grid container spacing={2}>
                    <Grid item sm={12}>

                        <Collapse in={open} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                {
                                    files.map((file, index) => (

                                        <Box className="file-container" key={index}
                                             sx={{
                                                 cursor: "pointer",
                                                 display: 'flex',
                                                 alignItems: 'center'
                                             }}
                                        >
                                            <Tooltip key={file.name} title={file.name}>
                                                <TextField
                                                    variant='standard'
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
                                <Box sx={{marginTop: 2}}>
                                    <label>
                                        <input
                                            style={{display: "none"}}
                                            type="file"
                                            onChange={handleFileUpload}
                                            onClick={() => {
                                                setOpen(true)
                                            }}
                                        />
                                        <Fab
                                            color="secondary"
                                            size='small'
                                            e="small"
                                            component="span"
                                            aria-label="add"
                                            variant="extended"
                                        >
                                            <AddIcon/> Upload File
                                        </Fab>
                                    </label>
                                </Box>
                            </List>
                        </Collapse>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}


