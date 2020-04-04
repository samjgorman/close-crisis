import React from 'react';
import "../countyInfo/countyInfo.css";
import axios from 'axios';
import { tsExpressionWithTypeArguments } from '@babel/types';
import MediaQuery from 'react-media';

class StatisticsView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      county: null, 
      cases: null, 
      deaths: null, 
      new_cases: null, 
      new_deaths: null, 

    };
  }

  updateCountyInfo(county) {
    if(county == null || county == undefined) {
      return;
    }
    let endpoint = "https://us-central1-iris-263608.cloudfunctions.net/close_ca_regional_news?county=" + county; //region

    this.setState({
      county: "Loading", 
      cases: "Loading", 
      deaths: "Loading", 
      new_cases: "Loading", 
      new_deaths: "Loading", 
      articles: [], 

    }, () => {
      if(this.props.updateArticlesInParent !== undefined && this.props.updateArticlesInParent !== null) {
        this.props.updateArticlesInParent([]);
      }
      axios.get(endpoint).then(
        (response) => {
          console.log("Below is the response for: " + county)
          console.log(response.data)
          //index 1 means newly rendered component
          //scroll to top on update
          //document.getElementsByClassName('County-info')[1].scrollTo(0, 0) 


              this.setState({
                county: response.data.county, 
                cases: response.data.cases, 
                deaths: response.data.deaths, 
                new_cases: response.data.new_cases, 
                new_deaths: response.data.new_deaths, 
                articles: response.data.articles
              })
              if(this.props.updateArticlesInParent !== undefined && this.props.updateArticlesInParent !== null) {
                this.props.updateArticlesInParent(response.data.articles);
              }
        }
      ).catch(
        (err) => {
          console.log("An erorr occurred for: " + county)
          console.log(err);
        }
      )});
    
  }


  componentDidMount() {
    /*
      replace with default county
    */
   this.updateCountyInfo(this.props.county);

  }

  componentDidUpdate(prev_props) {
    if(prev_props.county !== this.props.county) {
        this.componentDidMount();
    }
      
  }

  render() {
    /**
     * 
     */
    return (
        <div className="Statistics-view">
    

          <div className="Stats">

              <div className="Column">
                  <div className="CurrentNumbers">
                  {this.state.cases}
                  </div>
                  <div className="Labels">
                  Confirmed
                  </div>

                  <div className="-today">
                  <ion-icon id="Arrow-icon" name="arrow-up-outline"></ion-icon>{this.state.new_cases} today
                  </div>
              </div>

              <div className="Column">
                  <div className="CurrentNumbers">
                  {this.state.deaths}
                  </div>
                  <div className="Labels">
                  Deceased
                  </div>
                  <div className="-today">
                  <ion-icon  id="Arrow-icon" name="arrow-up-outline"></ion-icon>{this.state.new_deaths} today
                  </div>

                  
              </div>



  
          </div>



        <div className="Showing-Department-of-Public-Health-data">
            Showing Department of Public Health data
        </div>
        
        </div>
        
    )

  }
}



export default StatisticsView;
