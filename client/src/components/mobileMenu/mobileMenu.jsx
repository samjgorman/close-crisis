import React, {Component} from 'react'; 
import axios from 'axios';
import './mobileMenu.css';



class MobileMenu extends Component{
    constructor(props) {
        super(props);
        //TODO: get prop prev component 
        //TODO: get prop current county
        this.state = {
            counties: [
                "San Diego Area", 
                "SF Bay Area", 
                "Fresno County", 
                "Inland Empire",
                "Sacremento, San Joaquin, Stanislaus",
                "LA and Orange Counties",  
                "Kern, Ventura, and Santa Barbara County"
            ],
            prev_active_mobile_component: this.props.prev_active_mobile_component
        }
        
    }

    componentDidMount() {
    }

    componentDidUpdate(prev_props) {
   
    }

    onCountySelection(county) {
        this.setState({
            selected_county: county
        })
        this.props.onCountySelection(county);
    }

    makeCountiesList(counties) {
        let build_list = [];
        for(let i = 0; i < counties.length; ++i) {
            let county = counties[i]
            build_list.push(
                <div key={county} className="List-element">
                    <button onClick={() => { this.onCountySelection(county) }} className="Select-button">
                        <div className="Button-container">
                                <ion-icon 
                                    style={{color: this.getIconColor(county)}} 
                                    name="stop"
                                    id="Select-box"
                                />
                            <div className="County-name">
                                {county}
                            </div>
                        </div>
                    </button>
                </div>
            )
        }
       
        return build_list;
    }

    getIconColor(county) {
        if(this.props.selected_county === county) {
            return "#ffa700";
        }else {
            return "#27292d";
        }
    }


    render() {
        return (
            <div className="Mobile-menu-container">
                <div className="Selection-list">
                    <div className="Select-an-area">
                        Select an area: 
                    </div>
                    {this.makeCountiesList(this.state.counties)}
                </div>
            </div>

        );
    }
  }
  
  export default MobileMenu