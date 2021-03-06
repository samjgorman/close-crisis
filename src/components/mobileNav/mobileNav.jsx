import React from 'react';
import { HashLink } from 'react-router-hash-link';
import './mobileNav.css';

class MobileNav extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        active_icon: "news", //by default, other is "map"
    };

  }

  onNewsClick() {

    this.props.changeActiveMobileComponent("news");
  }

  onMapClick() {
 
      this.props.changeActiveMobileComponent("map");

  }
  getIconColor(icon_name) {
    if(this.props.active_icon === icon_name) {
        return "#cfcfcf";
    }else {
        return "#555555"
    }
  }

  render() {
    return (
      <div className="Mobile-nav-container">
        <div className="ion-icon-container">
            <div>
                <button onClick={() => {this.onNewsClick()}} className="button">
                    <ion-icon style={{color: this.getIconColor("news")}} name="newspaper-outline"></ion-icon>
                </button>
           </div>
            <div className="Mobile-nav-labels">
                <font color={this.getIconColor("news")}>
                    News
                </font>
            </div>
        </div>
        <div className="ion-icon-container">
            <div>
                
                <button onClick={() => {this.onMapClick()}} className="button"> 
                    <ion-icon style={{color: this.getIconColor("map")}} name="map-outline"></ion-icon>
                </button>
            </div>
            <div className="Mobile-nav-labels">
                <font color={this.getIconColor("map")}>
                    Map
                </font>
            </div>
        </div>        
      </div>
    );
  }
    
}

  
  
  



export default MobileNav;
