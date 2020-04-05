import React from 'react';
import MapGL, {Source, Layer, Popup, GeolocateControl, NavigationControl, FlyToInterpolator } from 'react-map-gl';
import axios from 'axios';
import boundary_data from './ca_boundaries.json';
import StatisticsView from '../statisticsView/statisticsView.js';
import MediaQuery from 'react-media';
import { Link } from 'react-router-dom';
import './map.css';

class Map extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        selected_county: this.props.selected_county,
        latitude: 36.7783, //° N, 119.4179° Wthis.props.latitude, //default for LA
        longitude: -119.4179, //this.props.longitude, //default for LA
        width: "100%",
        height: "60em",
        zoom: 5,
        minZoom: 5,
        cases_layer: null, 
        interactiveLayerIds: null, 
        all_county_info: null, 
        cases: null,
        deaths: null,
        new_cases: null,
        new_deaths: null, 
        hover_county: null,
        hover_latitude: null,
        hover_longitude: null, 
        cases: null, 
        deaths: null, 
        new_cases: null, 
        new_deaths: null,
        county_stats: null
    };

  }

  componentDidMount() {
    this.setState({
      latitude: this.props.latitude, 
      longitude: this.props.longitude,
      zoom: 7,
      transitionInterpolator: new FlyToInterpolator({speed: 1.2}),
      transitionDuration: 'auto', 
  });
    this.updateCasesLayer();

  }

  componentDidUpdate(prev_props) {
      if(prev_props.selected_county !== this.props.selected_county) {
        // this.setState({
        //     latitude: this.props.latitude, 
        //     longitude: this.props.longitude,
        //     zoom: 7,
        //     transitionInterpolator: new FlyToInterpolator({speed: 1.2}),
        //     transitionDuration: 'auto', 
        // });
        //^^deprecated above camer operation
        this.setState({
          selected_county: this.props.selected_county
        })
      }

  }
  
  setViewport(viewport) {
    let max_latitude = 42;
    let min_latitude = 34;
    let min_longitude = -124.6;
    let max_longitude = -115;

    /**
     * the 4 if statements below restrict panning
     * react-mapbox-gl doesn't seem to have the maxBounds prop, 
     * so had to custom implement
     */
    if(viewport.latitude > max_latitude) {
        viewport.latitude = max_latitude;
    }
    if(viewport.latitude < min_latitude) {
        viewport.latitude = min_latitude;
    }
    if(viewport.longitude > max_longitude) {
        viewport.longitude = max_longitude;
    }
    if(viewport.longitude < min_longitude) {
        viewport.longitude = min_longitude;
    }

    this.setState({
        latitude: viewport.latitude, 
        longitude: viewport.longitude, 
        zoom: viewport.zoom, 
        transitionInterpolator: null,
        transitionDuration: null
    })
  }

  getViewport() {
    return {
        latitude: this.state.latitude, 
        longitude: this.state.longitude, 
        width: this.state.width,
        height: this.state.height,
        zoom: this.state.zoom,
        minZoom: this.state.minZoom, 
        transitionInterpolator: this.state.transitionInterpolator,
        transitionDuration: this.state.transitionDuration
    }
  }

  makeSource(county, latitude, longitude, severity) {
    let source_properties = {
        id: county, 
        type: 'geojson', 
        data: {
            type: 'FeatureCollection', 
            features: [
                {
                    type: 'Feature', 
                    geometry: {
                        type: 'Point', 
                        coordinates: [longitude, latitude]
                    },
                }
            ]
        }
    }
    return (
        <Source key={county} {...source_properties}>
            {this.makeLayer(county, severity)}
        </Source>
    )
  }

  makeLayer(county, severity) {


    let layer_properties = {
        id: county, 
        type: "circle", 
        paint: {
            'circle-radius': severity*8, 
            'circle-color': '#ffa700', 
            'circle-opacity': 0.3, 
            'circle-stroke-width': 1, 
            'circle-stroke-color': '#ffa700'
   
        }
    }

    return (
            <Layer {...layer_properties}>
            </Layer>
    )
  }
  

  makeCountyBoundaries() {
      let source_properties = {
        id: 'california',
        type: 'geojson',
        data: boundary_data
      }

      let layer_properties = {
        'id': 'california',
        'type': 'line',
        'source': 'california',
        'layout': {},
        'paint': {
            'line-color': '#414141'
        }
      }
    
      return (
        <Source id='california' key='california' {...source_properties} >
            <Layer {...layer_properties} />
        </Source>
      );
      
      
      
  }

  updateCasesLayer() {

      axios.get("https://us-central1-iris-263608.cloudfunctions.net/close_ca_map_all").then(
          (response) => {
            let build_cases_layer = [];
            let build_county_stats = {}
            let counties = [];
            for(let i = 0; i < response.data.items.length; ++i) {
                let county_info = response.data.items[i];
                let circle = this.makeSource(county_info.county, county_info.lat, county_info.lon, county_info.severity);
                build_cases_layer.push(circle);
                counties.push(county_info.county);


                build_county_stats[county_info.county] = {
                  cases: county_info.cases, 
                  deaths: county_info.deaths,
                  new_cases: county_info.new_cases, 
                  new_deaths: county_info.new_deaths
                }


            }

            this.setState({
                cases_layer: build_cases_layer,
                interactiveLayerIds: counties,
                county_stats: build_county_stats, 
                cases: build_county_stats[this.state.selected_county].cases,
                deaths: build_county_stats[this.state.selected_county].deaths,
                new_cases: build_county_stats[this.state.selected_county].new_cases,
                new_deaths: build_county_stats[this.state.selected_county].new_deaths,
            })
          }
          
      ).catch(
          (err) => { 
              console.log(err);
          }
      )
  }

  onClickCounty(event) {
    event.preventDefault();
    let feature = event.features[0];
    if(feature === undefined || feature.source === undefined) {
        return;
    }
    this.setState({
      latitude: feature.geometry.coordinates[1], 
      longitude: feature.geometry.coordinates[0], 
      transitionInterpolator: new FlyToInterpolator({speed: 1.2}),
      transitionDuration: 'auto', 
      zoom: 7,
      county: feature.source, 
      cases: this.state.county_stats[feature.source].cases,
      deaths: this.state.county_stats[feature.source].deaths,
      new_cases: this.state.county_stats[feature.source].new_cases,
      new_deaths: this.state.county_stats[feature.source].new_deaths
      //deprecated the above camera pan animation

    });
    this.props.mapOnClick(feature.source, feature.geometry.coordinates[0], feature.geometry.coordinates[1]);
    return;
 
  }

  onCountyEnter(event) {

    return;
    //below deprecated for now
    console.log(event)
    event.preventDefault();
    
    this.setState({
      hover_county: "testing",
      hover_latitude: event.lngLat[1], 
      hover_longitude: event.lngLat[0]
    })
    
  }

  onCountyLeave() {
    return;
    //below deperecated for now;
    this.setState({
      hover_county: null,
      hover_latitude: null,
      hover_longitude: null
    })
  }

  makePopup(county, latitude, longitude) {
    return (
          <Popup 
          latitude={latitude} 
          longitude={longitude}
          closeButton={false}
      >
          <div >
              {county}
          </div>
      </Popup>
    )
  }

  render() {
    let mapbox_token = "pk.eyJ1Ijoic2hhbGludnMiLCJhIjoiY2s4ZnNtZHhlMDd0NzNrcGU4eHJnYXgyOCJ9.qv2ft9xqJ32Ovea3vDq3Yg";
    let viewport = this.getViewport();


    //vvv copied from github
    const geolocateStyle = {
        position: 'absolute',
        top: 0,
        left: 0,
        margin: 10
      };

      const navStyle = {
        position: 'absolute',
        top: 36,
        left: 0,
        padding: '10px'
      };
    //^^^ copied from  github
      //Todo: undelete statisticsView
    return (

        <div className="Map-container">
          
            <MediaQuery query="(max-width: 768px)">
              {
                (matches) => {
                    return matches ?
                      <div>
                        <StatisticsView 
                            county={this.state.selected_county}
                            cases={this.state.cases}
                            deaths={this.state.deaths}
                            new_cases={this.state.new_cases}
                            new_deaths={this.state.new_deaths}
                        />
                      </div>
                      :
                      null

                }
              }
              </MediaQuery>
         


            <MapGL className = "test-map"
                {...viewport} 
                mapboxApiAccessToken={mapbox_token} 
                onViewportChange={(viewport) => { this.setViewport(viewport)}}
                interactiveLayerIds={this.state.interactiveLayerIds}
                onClick={(event) => {this.onClickCounty(event)}}
                mapStyle='mapbox://styles/mapbox/dark-v10'
                onMouseEnter={(event) => this.onCountyEnter(event)}
                onMouseLeave={() => this.onCountyLeave()}
               
            >
                {this.state.cases_layer}

                {this.state.hover_county !== null ?
                
                  this.makePopup(this.state.hover_county, this.state.hover_latitude, this.state.hover_longitude)
                  :
                  null
                }
                {this.state.selected_county !== "No county chosen" && this.state.selected_county !== null ? 
                    (
                        this.makePopup(this.props.selected_county, this.props.latitude, this.props.longitude)

                    ) : null
                }

                <GeolocateControl
                    style={geolocateStyle}
                    positionOptions={{enableHighAccuracy: true}}
                    trackUserLocation={true}
                />

                <div className = "poteential" style={navStyle}>
                    <NavigationControl />
                </div>

                {this.makeCountyBoundaries()}

            </MapGL>
        </div>
    );
  }
    
}

  
  
  



export default Map;
