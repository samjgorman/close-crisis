import React from 'react';
import MapGL from 'react-map-gl';

class Map extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        county: null,
        latitude: 45.42, 
        longitude: -75.69, 
        width: "50vw", 
        height: "100%", 
        zoom: 10
    };

  }

  componentDidMount() {
    this.setState({
        county: this.props.county
    })
  }

  
  setViewport(viewport) {
    this.setState({
        latitude: viewport.latitude, 
        longitude: viewport.longitude, 
        width: viewport.width,
        height: viewport.height,
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

  render() {

    let mapbox_token = "pk.eyJ1Ijoic2hhbGludnMiLCJhIjoiY2s4ZnNtZHhlMDd0NzNrcGU4eHJnYXgyOCJ9.qv2ft9xqJ32Ovea3vDq3Yg";
    let viewport = this.getViewport();
    return (
        <MapGL 
            {...viewport} 
            mapboxApiAccessToken={mapbox_token} 
            onViewportChange={(viewport) => { this.setViewport(viewport)}}
        >

        </MapGL>
    );
  }
    
}

  
  
  



export default Map;
