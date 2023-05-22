import './App.css';

// Import react functions
import { useState, useEffect } from 'react';

// Import app components
import { Plan } from './components/Plan/Plan'
import { Map } from './components/Map/Map'

function App() {
  return (
    <div className="App">
      <div className="plan-container">
        <Plan />
      </div>
      <Map />
    </div >
  );
}

export default App;
