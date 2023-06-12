import {useState, useEffect} from "react"
import {Fab} from "@mui/material"
import {
    Tooltip,
    Typography,
    Box
} from "@mui/material"
import DescriptionIcon from "@mui/icons-material/Description"
import AddIcon from "@mui/icons-material/Add"

import {uploadFile} from "../Plan/firestorePlan"

import {getStorage, ref, listAll, getDownloadURL} from 'firebase/storage';

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
                            <Box className="file-container" style={{cursor: "pointer"}}>
                                <DescriptionIcon
                                    key={file.name}
                                    alt={file.name}
                                    // src={URL.createObjectURL(file)}
                                    fontSize="large"
                                    onClick={() => handleFileDownload(file)}
                                    download
                                />
                                <Typography noWrap="false">{file.name}</Typography>
                            </Box>
                        </Tooltip>
                    </Box>
                ))}
            </Box>
            <label htmlFor="upload-photo">
                <input
                    style={{display: "none"}}
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
                    <AddIcon/> Upload File
                </Fab>
            </label>
        </>
    )
}
