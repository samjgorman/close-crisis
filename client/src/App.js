import React from 'react';
import './App.css';
import Header from './components/header/header.jsx';
import CountyInfo from './components/countyInfo/countyInfo.jsx';
import Map from './components/map/map.jsx';



class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      county: "Orange County" //default county
    };

    this.mapOnClick = (clicked_county) => {
      this.setState({
        county: clicked_county
      });
    };
  }

  render() {
    return (
      <div>
        <Header ></Header>
        <div className="App-container">
          <div>           
            <CountyInfo county={this.state.county} />
          </div>
          <div>
            <Map county={this.state.county} />
          </div>
        </div>
      </div>
    );
  }
    
}

  
  
  



export default App;
