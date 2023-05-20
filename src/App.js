import './App.css';
import { useState } from 'react';

import { Map } from './components/Map/Map'
import { Time } from './components/Time/Time'
import { Tripmates } from './components/Tripmates/Tripmates';

import { Input, TextField, Card, CardContent, Typography } from '@mui/material';

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
        <Card className="plan-card" >
          <CardContent sx={{
            display: 'flex',
            flexDirection: 'column',
            padding: '1rem'

          }}>
            <Typography variant="h3">
              Travel planner
            </Typography>
            <Input placeholder='Enter title for your trip'></Input>
            <TextField
              id="standard-multiline-flexible"
              label="Trip description"
              multiline
              rows={4}
            />
            <Time></Time>
            <Tripmates></Tripmates>
            <Card className="plan-cost">
              <CardContent>
                <Input placeholder='set up a budget for your trip'></Input>
                <Typography>
                  Caluculated cost of your trip: {totalCost} {currency}
                </Typography>
              </CardContent>
            </Card>


          </CardContent>

        </Card>
      </div>
      <Map>
      </Map>
    </div >
  );
}

export default App;
