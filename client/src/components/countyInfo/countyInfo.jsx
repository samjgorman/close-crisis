import React from 'react';
import "./countyInfo.css";
import axios from 'axios';

class CountyInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      county: null, 
      cases: null, 
      deaths: null, 
      new_cases: null, 
      new_deaths: null, 
      articles: []
    };
  }

  updateCountyInfo(county) {
    let endpoint = "https://us-central1-iris-263608.cloudfunctions.net/close_ca_regional_news?county=" + county; 
    axios.get(endpoint).then(
      (response) => {
        console.log(response);
        this.setState({
          county: response.data.county, 
          cases: response.data.cases, 
          deaths: response.data.deaths, 
          new_cases: response.data.new_cases, 
          new_deaths: response.data.new_deaths, 
          articles: response.data.articles
        })
      }
    ).catch(
      (err) => {
        console.log(err);
      }
    );
  }
  
  componentDidMount() {
    /*
      replace with default county
    */
    this.updateCountyInfo(this.props.county);

  }

  componentDidUpdate(prev_props) {
    if(prev_props.county !== this.props.county) {
      this.updateCountyInfo(this.props.county);
    }
  }

  displayNewsFeed() {
    return this.state.articles.sort( //sort the newsfeed articles by date, earliest to latest
      function(article1, article2) {
        return new Date(article1.timestamp) - new Date(article2.timestamp);
      }
    ).map(
      function(article) {
        return (
          <div>
            <div className="Timestamp">
              {article.mins_ago}
            </div>
            <div>
              <a href={article.article_url} className="Title">
                {article.article_title}
              </a>
            </div>
            <div className="Sourcename">
              {article.newspaper_name}
            </div>
            
          </div>
        )
      }
    )
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
                {this.state.county}
              </div>
            </div>

            <div className="COVID-19-changes-in-your-area">
              COVID-19 changes in your area
              <div className="Stats">

                <div className="Column">
                  <div className="CurrentNumbers">
                    {this.state.cases}
                  </div>
                  <div className="Labels">
                    Confirmed
                  </div>

                  <div className="-today">
                    <ion-icon name="arrow-up-outline"></ion-icon> {this.state.new_cases} today
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
                    <ion-icon name="arrow-up-outline"></ion-icon> {this.state.new_deaths} today
                  </div>

                  
                </div>



       
              </div>

            </div>


            <div className="Showing-Department-of-Public-Health-data">
              Showing Department of Public Health data
            </div>
            
          </div>

          

          <div className="News-feed">
            <div className="Local-updates-for-Los-Angeles-Orange-County">
              Local updates for {this.state.county}
            </div>
            {this.displayNewsFeed()}
          </div>
      </div>
    )

  }
}



export default CountyInfo;
