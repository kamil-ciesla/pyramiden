import './styles/App.css';
import Stage from './components/Stage';
import Map from './components/Map';

function App() {
  return (
    <div className="App">
      
        <div className="stagesContainer">
        <Stage></Stage>
        <Stage></Stage>
        </div>
        <div className="mapContainer">
          <Map></Map>
        </div>
    </div>
  );
}

export default App;
