
// Import react functions
import { useState, useEffect } from 'react';

// Import MUI components
import { Input, TextField, Card, Grid, CardContent, Typography } from '@mui/material';

// Import app components
import { Title } from '../Title/Title';
import { Time } from '../Time/Time'
import { Tripmates } from '../Tripmates/Tripmates';

// Import API functions
import * as firestore from './firestorePlan'

// Import images
import planBgImage from '../../plan-bg.jpg'

const planBgImageStyle = {
    backgroundImage: `url(${planBgImage})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
}

export const Plan = () => {
    const [id, setId] = useState(null)
    const [title, setTitle] = useState('Enter title for your trip')
    const [cost, setCost] = useState(0)
    const [currency, setCurrency] = useState('USD')

    // const [tripmates, setTripmates] = useState(null)

    // constructor(userId, planId) {
    //     this.userId = userId
    //     this.id = planId
    //     this.properties = {}
    // }

    // build(userId) {
    //     const planId = await createPlan()
    //     return new Plan(userId, planId)
    // }

    // title = 'Trip to Sweden'
    // cost = 4000
    // currency = 'PLN'
    function updateTitle(title) {
        setTitle(title)
        firestore.updateTitle(id, title)
    }

    useEffect(() => {
        fetchPlan()
    }, []);

    async function fetchPlan() {
        const fakeUserId = '5234235'
        const plan = await firestore.createPlan(fakeUserId)
        setId(plan.id)
    }

    return (
        <div className="Plan">
            <Card className="plan-card"
                sx={{
                    height: '95vh'
                }} >
                <CardContent>
                    <Grid container spacing={2}>
                        <Grid item lg={12}>
                            <div style={planBgImageStyle}>
                                <div className="plan-title-container" style={{
                                    height: '10rem',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}>
                                    <Title title={title} onUpdate={updateTitle}></Title>
                                </div>
                            </div>
                        </Grid>
                        <Grid item lg={12}>
                            <TextField
                                id="standard-multiline-flexible"
                                label="Trip description"
                                multiline
                                rows={4}
                            />
                        </Grid>
                        <Grid item lg={12}>
                            <Time></Time>
                        </Grid>
                        <Grid item lg={12}>
                            <Tripmates></Tripmates>
                        </Grid>
                        <Grid item lg={12}>
                            <Card className="plan-cost">
                                <CardContent>
                                    <Input placeholder='set up a budget for your trip'></Input>
                                    <Typography>
                                        Calculated cost of your trip: {cost} {currency}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item lg={12}>
                            <TextField
                                id="standard-multiline-flexible"
                                label="Trip notes"
                                multiline
                                rows={4}
                            />
                        </Grid>
                        <Grid item lg={12}>
                            <Card className="reservations">
                                <CardContent>
                                    <Typography variant="h5">
                                        Reservations
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item lg={12}>
                            <Card className="documents">
                                <CardContent>
                                    <Typography variant="h5">
                                        Documents
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item lg={12}>

                            <Card className="Trip schedule">
                                <CardContent>
                                    <Typography variant="h5">
                                        Trip schedule
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </div>
    )



}