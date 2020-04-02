import React from 'react';
import './App.css';
import Header from './components/header/header.jsx';
import CountyInfo from './components/countyInfo/countyInfo.jsx';
import Map from './components/map/map.jsx';
import MobileNav from './components/mobileNav/mobileNav.jsx';
import MobileMenu from './components/mobileMenu/mobileMenu.jsx';
import MediaQuery from "react-media";
import { Router, Route } from 'react-router-dom';


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      county: "Los Angeles County", //default county
      latitude: 34.196398, //default for LA
      longitude: -118.261862, //defualt for LA
      active_mobile_component: "news" //by default, other possible values are "map"
    };

    this.changeActiveMobileComponent = (icon_name) => {
      console.log(icon_name);
      this.setState(
        {
          active_mobile_component: icon_name
        }
      );
    };

    this.onCountySelection = (selected_county, longitude, latitude) => {
      console.log(selected_county);
      this.setState({
        county: selected_county,
        latitude: latitude,
        longitude: longitude
      });
    };

  }

  render() {

  
    return (



      <div>
        {/* <Header changeActiveMobileComponent={this.changeActiveMobileComponent}></Header> */}




{/* 
        <MediaQuery query="(max-width: 768px)">
          {
            (matches) => {
              return matches ? 
                (

                  <div className="App-container">
                    <div className="County-info">
                      <>
                      <CountyInfo county={this.state.county} />
                    </div>
                    <div style={{visibility: "hidden"}} className="Map">
                      <Map county={this.state.county} mapOnClick={this.mapOnClick}/>
                    </div>
                    <MobileNav changeActiveMobileComponent={this.changeActiveMobileComponent} />
                  </div>

                ) 

                : 

                (
                  <div className="App-container">
                    <div className="County-info">
                      <CountyInfo county={this.state.county} />
                    </div>
                    <div style={{display: "none"}} className="Map">
                      <Map county={this.state.county} mapOnClick={this.mapOnClick}/>
                    </div>
                  </div>

                ) 
            }
          }
        </MediaQuery>

 */}

        <MobileMenu 
          changeActiveMobileComponent={this.changeActiveMobileComponent}
          prev_active_mobile_component={this.state.active_mobile_component} 
          selected_county={this.state.county}
          onCountySelection={this.onCountySelection} 
        />
        
        <div className="App-container">
          <div className="County-info">
            <CountyInfo county={this.state.county} />
          </div>
          <div className="Map">
              <Map 
                selected_county={this.state.county}
                latitude={this.state.latitude}
                longitude={this.state.longitude}
                mapOnClick={this.onCountySelection}/>
          </div>
        </div>
        

        <MobileNav 
          changeActiveMobileComponent={this.changeActiveMobileComponent}
        />

      </div>
    );
  }
    
}

  
  
  



export default App;
