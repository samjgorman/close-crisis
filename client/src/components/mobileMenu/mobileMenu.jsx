import React, {Component} from 'react'; 
import axios from 'axios';
import './mobileMenu.css';



class MobileMenu extends Component{
    constructor(props) {
        super(props);
        //TODO: get prop prev component 
        //TODO: get prop current county
        this.state = {
            selected_county: null, 
            counties: {},
            prev_active_mobile_component: null
        }
        
    }

    componentDidMount() {
        axios.get("https://us-central1-iris-263608.cloudfunctions.net/close_ca_map_all").then(
            (response) => {
                let build_counties = {};
                for(let i = 0; i < response.data.items.length; ++i) {
                    let county_info = response.data.items[i];
                    build_counties[county_info.county] = {
                        latitude: county_info.lat, 
                        longitude: county_info.lon
                    };
                }
                console.log("ddogggg")
                console.log(build_counties)
                this.setState({
                    selected_county: this.props.selected_county,
                    prev_active_mobile_component: this.props.prev_active_mobile_component,
                    counties: build_counties
                })
            }
        ).catch(
            (err) => {
                if(err) {
                    console.log(err);
                }
            }
        );
    }

    componentDidUpdate(prev_props) {
        if(prev_props !== this.props) {
            this.setState({
                selected_county: this.props.selected_county,
                prev_active_mobile_component: this.props.prev_active_mobile_component
            })
         
        }
    }

    onCountySelection(county) {
        this.props.onCountySelection(county, this.state.counties[county].longitude, this.state.counties[county].latitude);
    }

    makeCountiesList(counties, selected_county) {
        let build_list = [];
        let county_names = Object.keys(counties).sort((c1, c2) => {return c1 > c2});
        console.log(counties)
        for(let i = 0; i < county_names.length; ++i) {
            let county = county_names[i];
            build_list.push(
                <div className="List-element">
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
        if(this.state.selected_county === county) {
            return "#ffa700";
        }else {
            return "#27292d";
        }
    }

    onBackClick() {
        this.props.changeActiveMobileComponent(this.props.prev_active_mobile_component);
    }

    render() {
        return (
            <div>
                <div className="Back-header">
                    <button onClick={() => this.onBackClick()} className="Back-button">
                        Back
                    </button>
                </div>
                <div className="Selection-list">
                    <div className="Select-an-area">
                        Select an area: 
                    </div>
                    {this.makeCountiesList(this.state.counties, this.state.selected_county)}
                </div>
            </div>

        );
    }
  }
  
  export default MobileMenu