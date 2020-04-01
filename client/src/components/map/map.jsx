import React from 'react';
import MapGL, {Source, Layer, Popup, GeolocateControl, NavigationControl} from 'react-map-gl';
import axios from 'axios';
class Map extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        selected_county: null,
        latitude: 34.196398, //default for LA
        longitude: -118.261862, //default for LA
        width: "50vw",
        height: "100vh",
        zoom: 10,
        cases_layer: null, 
        interactiveLayerIds: null, 
        all_county_info: null
    };

  }

  componentDidMount() {

    this.updateCasesLayer();
  }
  
  setViewport(viewport) {
    this.setState({
        latitude: viewport.latitude, 
        longitude: viewport.longitude, 

        zoom: viewport.zoom
    })
  }

  getViewport() {
    return {
        latitude: this.state.latitude, 
        longitude: this.state.longitude, 
        width: this.state.width,
        height: this.state.height,
        zoom: this.state.zoom
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
    console.log(event)
    if(feature === undefined || feature.source === undefined) {
        this.setState({
            selected_county: null
        })
        return;
    }
    
    this.setState({
        selected_county: feature
    })
    this.props.mapOnClick(feature.source);
  }

 
  makePopup(county, latitude, longitude) {

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
        <MapGL 
            {...viewport} 
            mapboxApiAccessToken={mapbox_token} 
            onViewportChange={(viewport) => { this.setViewport(viewport)}}
            interactiveLayerIds={this.state.interactiveLayerIds}
            onClick={(event) => {this.onClickCounty(event)}}
        >
            {this.state.cases_layer}

            {this.state.selected_county ? 
                (
                    <Popup 
                        latitude={this.state.selected_county.geometry.coordinates[1]} 
                        longitude={this.state.selected_county.geometry.coordinates[0]}
                        closeOnClick={true}
                        onClose={() => this.setState({selected_county: null})}
                    />
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

        </MapGL>
    );
  }
    
}

  
  
  



export default Map;
