import './App.css';

// Import react functions
import { useState } from 'react';

// Import app components
import { Map } from './components/Map/Map'
import { Time } from './components/Time/Time'
import { Tripmates } from './components/Tripmates/Tripmates';

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
  const exampleData = {
    totalCost: 4000,
    currency: 'PLN'
  }

  const [totalCost, setTotalCost] = useState(exampleData.totalCost)
  const [currency, setCurrency] = useState(exampleData.currency)
  const [tripmates, setTripmates] = useState(null)

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
                    <Card>
                      <CardContent >
                        <Typography variant="h4">
                          Trip to Greece
                        </Typography>
                        {/* <Input placeholder='Enter title for your trip'></Input> */}
                      </CardContent>
                    </Card>
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
                      Calculated cost of your trip: {totalCost} {currency}
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
