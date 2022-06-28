import './App.css';
import WeatherContainer from './components/WeatherContainer/WeatherContainer.component';
import cloudyImage from './images/cloudyBackgroundImage.png'

function App() {
  return (
    <div className="App" >
      <div className= 'backgroundImageContainer' style={{backgroundImage: `url(${cloudyImage})`}}>
      <WeatherContainer/>
      </div>
      
    </div>
  );
}

export default App;
