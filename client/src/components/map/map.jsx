import React from 'react';
import axios from 'axios';


class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentCounty: null, 
      currentNumCases: null, 
      currentNumDeceased: null,
      newCasesToday: null, 
      newDeathsToday: null
    }
  }

  componentDidMount() {
    /**
     * Replace this with a GET request once endpoint is written. 
     */
    this.setState({
      currentCounty: "Los Angeles County", 
      currentNumCases: 0, 
      currentNumDeceased: 0,
      newCasesToday: 0, 
      newDeathsToday: 0
    })

  }

  render() {
    /**
     * 
     */
    return (
      <div className="County-info">
          <div className="Statistics-view">
            <div className="Displaying">
              Displaying 
              <div className="County">
                {this.state.currentCounty}
              </div>
            </div>

            <div className="COVID-19-changes-in-your-area">
              COVID-19 changes in your area

              <div className="row">
                  <div className="col">
                    <div className="Confirmed">
                        dd
                    </div>
                  </div>
               
              </div>


            </div>


            <div className="Showing-Department-of-Public-Health-data">
              Showing Department of Public Health data
            </div>
            
          </div>

          

          <div className="News-feed">
     
          </div>
      </div>
    )

  }
}



export default Map;
