import {Card, CardContent, List, ListItem, Box, Button, CardHeader, Input, TextField, Divider} from "@mui/material";
import {useState} from "react";
import {format} from "date-fns";
import {PlaceStage} from "../Stage/PlaceStage";
import {NoteStage} from "../Stage/NoteStage";

export const Day = (props) => {
    const [day, setDay] = useState(props.day)

    function formattedDate() {
        return format(convertedDate(day.date), "EEEE, MMMM do")
    }

    function convertedDate(date) {
        if (isDate(date)) {
            return date
        } else {
            return date.toDate()
        }
    }

    function isDate(obj) {
        return obj instanceof Date && !isNaN(obj.valueOf());
    }

    function addStage(type) {
        const newStage = {
            id: createRandomStageId(),
            note: '',
            locationName: '',
            type: type,
            time: new Date(),
            marker: {}
        }

        const dayWithNewStage = {...day, stages: [...day.stages, newStage]}
        setDay(dayWithNewStage)
        props.onChange(dayWithNewStage)
    }

    function createRandomStageId() {
        let randomId = ''
        for (let i = 0; i < 4; i++) {
            randomId += Math.random().toString(36).substring(2, 32 + 2)
        }
        return randomId
    }

    const handleChange = (e) => {
        setDay({...day, [e.target.name]: e.target.value})
        props.onChange({...day, [e.target.name]: e.target.value})
    }

    const handleStageChange = (stageIndex, updatedStage) => {
        const updatedStages = [...day.stages]
        updatedStages[stageIndex] = updatedStage
        const updatedDay = {...day, stages: updatedStages}
        setDay(updatedDay)
        props.onChange(updatedDay)
    }

    const handleDeleteStage = (id) => {
        const updatedStages = [...day.stages].filter(function (stage) {
            return stage.id !== id;
        });
        const updatedDay = {...day, stages: updatedStages}
        setDay(updatedDay)
        props.onChange(updatedDay)
    }

    return (<Card sx={{width: "100%"}}>
            <CardHeader
                title={formattedDate()}
                titleTypographyProps={{
                    align: 'left',
                }}
                subheader={<Input
                    name='name'
                    value={day.name}
                    defaultValue={day.name}
                    inputProps={{'aria-label': 'description'}}
                    size="small"
                    onChange={handleChange}
                />}
                subheaderTypographyProps={{
                    align: 'left', padding: '0', margin: '0'
                }}
            />
            <CardContent>
                <Box>
                    <List>
                        {day.stages.map((stage, index) => (<>
                            <ListItem>
                                {
                                    stage.type === 'place' &&
                                    <PlaceStage
                                        key={stage.id}
                                        stage={stage}
                                        onChange={(updatedStage) => {
                                            handleStageChange(index, updatedStage)
                                        }}
                                        handleDeleteStage={() => {
                                            handleDeleteStage(stage.id)
                                        }}
                                    />
                                }
                                {
                                    stage.type === 'note' &&
                                    <NoteStage
                                        key={stage.id}
                                        stage={stage}
                                        onChange={(updatedStage) => {
                                            handleStageChange(index, updatedStage)
                                        }}
                                    />
                                }
                            </ListItem>
                            <Divider light/>
                        </>))}
                    </List>
                    <Button onClick={()=>{addStage('note')}}>Add note</Button>
                    <Button onClick={()=>{addStage('place')}}>Add place</Button>
                </Box>
            </CardContent>
        </Card>

    )
}