import React from 'react';
import MapGL, {Source, Layer, Popup, GeolocateControl, NavigationControl, FlyToInterpolator } from 'react-map-gl';
import axios from 'axios';
import boundary_data from './ca_boundaries.json';
import { Link } from 'react-router-dom';
import './map.css';

class Map extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        selected_county: this.props.selected_county,
        latitude: this.props.latitude, //default for LA
        longitude: this.props.longitude, //default for LA
        width: "100%",
        height: "100%",
        zoom: 10,
        minZoom: 5,
        cases_layer: null, 
        interactiveLayerIds: null, 
        all_county_info: null
    };

  }

  componentDidMount() {
    this.updateCasesLayer();
  }

  componentDidUpdate(prev_props) {
      if(prev_props !== this.props) {
        this.setState({
            selected_county: this.props.selected_county, 
            latitude: this.props.latitude, 
            longitude: this.props.longitude,
            zoom: 7,
            transitionInterpolator: new FlyToInterpolator({speed: 1.2}),
            transitionDuration: 'auto', 
        })
      }
  }
  
  setViewport(viewport) {
    let max_latitude = 42;
    let min_latitude = 32.52;
    let min_longitude = -124.6;
    let max_longitude = -114.05;

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
            'circle-radius': severity*2, 
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
            let counties = [];
            for(let i = 0; i < response.data.items.length; ++i) {
                let county_info = response.data.items[i];
                let circle = this.makeSource(county_info.county, county_info.lat, county_info.lon, county_info.severity);
                build_cases_layer.push(circle);
                counties.push(county_info.county);
            }

            this.setState({
                cases_layer: build_cases_layer,
                interactiveLayerIds: counties
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
        this.setState({
            selected_county: null
        })
        return;
    }
    
    this.setState({
        selected_county: feature.source, 
        latitude: feature.geometry.coordinates[1], 
        longitude: feature.geometry.coordinates[0], 
        transitionInterpolator: new FlyToInterpolator({speed: 1.2}),
        transitionDuration: 'auto', 
        zoom: 7

    })
    this.props.mapOnClick(feature.source, feature.geometry.coordinates[0], feature.geometry.coordinates[1]);
  }

 
  makePopup(county, latitude, longitude) {
    return (
        <Popup 
            latitude={latitude} 
            longitude={longitude}
            closeOnClick={true}
            onClose={() => this.setState({selected_county: null})}
        >
            {/**
            * Your code here Sam
            */
            }
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
    //^^^ copied from github

    return (

        <div className="Map-container">
            <MapGL 
                {...viewport} 
                mapboxApiAccessToken={mapbox_token} 
                onViewportChange={(viewport) => { this.setViewport(viewport)}}
                interactiveLayerIds={this.state.interactiveLayerIds}
                onClick={(event) => {this.onClickCounty(event)}}
                mapStyle='mapbox://styles/mapbox/dark-v10'
               
            >
                {this.state.cases_layer}

                {this.state.selected_county ? 
                    (
                        <Popup 
                            latitude={this.props.latitude} 
                            longitude={this.props.longitude}
                            closeButton={false}
                            onClose={() => this.setState({selected_county: null})}
                        >
                            <div >
                         
                                {this.state.selected_county}
                            </div>
                        </Popup>

                    ) : null
                }

                <GeolocateControl
                    style={geolocateStyle}
                    positionOptions={{enableHighAccuracy: true}}
                    trackUserLocation={true}
                />

                <div style={navStyle}>
                    <NavigationControl />
                </div>

                {this.makeCountyBoundaries()}

            </MapGL>
        </div>
    );
  }
    
}

  
  
  



export default Map;
