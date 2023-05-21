import './App.css';

// Import react functions
import { useState, useEffect } from 'react';

// Import app components
import { Title } from './components/Title/Title';
import { Time } from './components/Time/Time'
import { Tripmates } from './components/Tripmates/Tripmates';
import { Map } from './components/Map/Map'

// Import api classes
import { Plan } from './plan/plan'

// Import MUI components
import { Input, TextField, Card, Grid, CardContent, Typography } from '@mui/material';

// Import images
import planBgImage from './plan-bg.jpg'

const planBgImageStyle = {
  backgroundImage: `url(${planBgImage})`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
}


function App() {
  const [plan, setPlan] = useState({ properties: {} })

  const [title, setTitle] = useState(plan.properties.title || 'Enter title for your trip')
  const [cost, setCost] = useState(plan.properties.cost)
  const [currency, setCurrency] = useState(plan.properties.currency)
  // const [tripmates, setTripmates] = useState(null)

  useEffect(() => {
    // fetchPlan()
  }, []);

  async function fetchPlan() {
    const plan = new Plan('5234235')
    await plan.id
    console.log('plan id in App is ' + plan.id)
    plan.title = 'Trip to Sweden'
    plan.cost = 4000
    plan.currency = 'PLN'

    setPlan(plan)
  }

  return (
    <div className="App">
      <div className="plan-container">
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
                    <Title title={title} setTitle={setTitle}></Title>
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
      <Map></Map>
    </div >
  );
}

export default App;
