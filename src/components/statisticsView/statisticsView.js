import React from 'react';
import "../countyInfo/countyInfo.css";
import axios from 'axios';
import { tsExpressionWithTypeArguments } from '@babel/types';
import MediaQuery from 'react-media';
import './statisticsView.css';
import ContentLoader, { List } from 'react-content-loader'


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
      last_updated: "Loading",
      newsLoaded: false

    }, () => {
      if(this.props.updateArticlesInParent !== undefined && this.props.updateArticlesInParent !== null) {
        const MyList = () => <List />
        this.props.updateArticlesInParent((MyList));
      }
      axios.get(endpoint).then(
        (response) => {
              this.setState({
                county: response.data.county, 
                cases: response.data.cases, 
                deaths: response.data.deaths, 
                new_cases: response.data.new_cases, 
                new_deaths: response.data.new_deaths, 
                articles: response.data.articles,
                last_updated: response.data.last_updated,
                source: response.data.source_link,
                newsLoaded: true
              })

              if(this.props.updateLastUpdatedInParent !== undefined && this.props.updateLastUpdatedInParent !== null) {
                this.props.updateLastUpdatedInParent(response.data.last_updated);
              }
              if(this.props.updateArticlesInParent !== undefined && this.props.updateArticlesInParent !== null) {
                this.props.updateArticlesInParent(response.data.articles);
              }
              var newCases = this.state.new_cases;
               if (this.state.new_cases == 0 || this.state.newCases == 0){
                 this.setState({
                   new_cases: "Awaiting update",
                   new_deaths:"Awaiting update"
                 })
               }
        }
      ).catch(
        (err) => {
          console.log("An error occurred for: " + county)
          console.log(err);
        }
      )});
    
  }


  componentDidMount() {
    /*
      replace with default county
    */
    
   if(this.props.cases !== undefined && this.props.cases !== null) {
    this.setState({
      county: this.props.county, 
      cases: this.props.cases,
      deaths: this.props.deaths,
      new_cases: this.props.new_cases,
      new_deaths: this.props.new_deaths
    });

    
    return;
   }
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
                  Cases
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
                  Deaths
                  </div>
                  <div className="-today">
                  <ion-icon  id="Arrow-icon" name="arrow-up-outline"></ion-icon>{this.state.new_deaths} today
                  </div>

                  
              </div>



  
          </div>



        <a href="https://coronavirus.jhu.edu/map.html" target="_blank" className="Showing-Department-of-Public-Health-data">
            Data sourced from Johns Hopkins University
        </a>
        
        </div>
        
    )

  }
}



export default StatisticsView;
