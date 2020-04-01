import React from 'react';
import './App.css';
import Header from './components/header/header.jsx';
import CountyInfo from './components/countyInfo/countyInfo.jsx';
import Map from './components/map/map.jsx';



class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      county: "Los Angeles County" //default county
    };

    this.mapOnClick = (selected_county) => {
      this.setState({
        county: selected_county
      });
    };
  }

  render() {
    return (
      <div>
        <Header ></Header>
        <div className="App-container">
          <div className="County-info">
            <CountyInfo county={this.state.county} />
          </div>
          <div className="Map">
            <Map county={this.state.county} mapOnClick={this.mapOnClick}/>
          </div>
        </div>
      </div>
    );
  }
    
}

  
  
  



export default App;
