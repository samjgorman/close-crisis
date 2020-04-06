import React from 'react';
import './App.css';
import Header from './components/header/header.jsx';
import CountyInfo from './components/countyInfo/countyInfo.jsx';
import Footer from './components/footer/footer.jsx';

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
      mobile_map_county: "Los Angeles County",
      mobile_info_county: "LA and Orange Counties",
      latitude: 34.196398, //default for LA
      longitude: -118.261862, //defualt for LA
      active_mobile_component: "news", //by default, other possible values are "map", "menu"
      prev_active_mobile_component: "news",
      //arbitrary
    };

    
    this.changeActiveMobileComponent = (icon_name) => {
      console.log(icon_name);
      this.setState(
        {
          prev_active_mobile_component: this.state.active_mobile_component,
          active_mobile_component: icon_name
        }
      );
    };

    this.onCountySelection = (selected_county, longitude, latitude) => {
      console.log("map clicked" + selected_county);
      document.getElementsByClassName("County-info")[0].scrollTop = 0;
      this.setState({
        mobile_map_county: selected_county,
        county: selected_county,
      })

      if(latitude !== undefined && longitude !== undefined) {
        this.setState({
          latitude: latitude,
          longitude: longitude
        });
      }
    
    };
    
    this.onCountySelectionMobileMenu = (selected_county) => {
      document.getElementsByClassName("County-info")[0].scrollTop = 0;
        //       document.getElementsByClassName("County-info")[0].scrollTop = 0;
              this.setState({
                mobile_info_county: selected_county,
                active_mobile_component: "news", //by default, other possible values are "map", "menu"
                prev_active_mobile_component: "news"
              })
            
      // this.setState({
      //   mobile_info_county: selected_county,
      // })
    }

    this.onCountySelectionMobileMap = (selected_county, longitude, latitude) => {
      console.log("map clicked" + selected_county);
      this.setState({
        mobile_map_county: selected_county,
        county: selected_county
      })
    
      if(latitude !== undefined && longitude !== undefined) {
        this.setState({
          latitude: latitude,
          longitude: longitude
        });
      }
    
    };

  }


  getStyle(component_name) {
    let style = {}
    if(this.state.active_mobile_component === component_name) {
      style.visiblity = "visible";
      style.width = "100%";
      if(component_name === "menu") {
        style.display = "block";
      }

    }else {
      style.visibility = "hidden";
      style.width= "0%";

      if(component_name === "menu") {
        style.display = "none"
        style.width= "0%";
        style.height = "0%";
      }
    }
    return style;
  }

  render() {

    return (



      <div>
        <Header 
          changeActiveMobileComponent={this.changeActiveMobileComponent}
          prev_active_mobile_component={this.state.prev_active_mobile_component}
          active_mobile_component={this.state.active_mobile_component}
        />
        <MediaQuery query="(max-width: 768px)">
          {
            (matches) => {
              return matches ? 
                (

                  <div className="App-container">
                    <div style={this.getStyle("news")} className="County-info-outer">
                      <CountyInfo 
                        county={this.state.mobile_info_county} 

                      />
                    </div>
                    <div style={this.getStyle("map")} className="Map">
                      <Map 
                        selected_county={this.state.mobile_map_county}
                        latitude={this.state.latitude}
                        longitude={this.state.longitude}
                        mapOnClick={this.onCountySelectionMobileMap}

                        />
                    </div>
                    <div style={this.getStyle("menu")} >
                      <MobileMenu 
                        changeActiveMobileComponent={this.changeActiveMobileComponent}
                        prev_active_mobile_component={this.state.active_mobile_component} 
                        selected_county={this.state.mobile_info_county}
                        onCountySelection={this.onCountySelectionMobileMenu} 
                      />
                    </div>
        
                  </div>
                )

                :

                (
                  <div className="App-container">
                    <div className="County-info-outer">
                      <CountyInfo 
                        county={this.state.county} 
                      />
                    </div>
                    <div className="Map">
                      <Map
                        selected_county={this.state.county}
                        latitude={this.state.latitude}
                        longitude={this.state.longitude}
                        mapOnClick={this.onCountySelection}

                        />
                    </div>
                  </div>
                  
                )

            }
          }
        </MediaQuery>
        <MediaQuery query="(max-width: 768px)">
          {
            (matches) => {
              return matches ? 

                (
                  <MobileNav 
                    active_icon={this.state.active_mobile_component}
                    changeActiveMobileComponent={this.changeActiveMobileComponent}
                  /> 
                )
                :
                null
            }
          }
        </MediaQuery>
        
        <MediaQuery query="(max-width: 768px)">
          {
            (matches) => {
              return matches ? 

                (
                  null
                )
                :
                <Footer></Footer>
            }
          }
        </MediaQuery>
       


{/*         
                  <div className="App-container">
                    <div className="County-info-outer">
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
                  />  */}
                
          

      </div>
    );
  }
    
}

  
  
  



export default App;
