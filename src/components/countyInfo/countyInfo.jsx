import React from 'react';
import "./countyInfo.css";
import StatisticsView from "../statisticsView/statisticsView.js"
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

    this.updateArticlesInParent = (articles) => {
      this.setState({
        articles: articles
      })
    }
  }

  componentDidMount() {
    console.log(this.props.endpoint)
    /*
      replace with default county
    */
   this.setState({
     county: this.props.county
   })
  }

  componentDidUpdate(prev_props) {
    if(prev_props.county !== this.props.county) {
      // let county = "Los Angelas County"; //default
      // if(this.props.match.params !== undefined) {
      //   county = this.props.match.params.county;
      // }
      this.setState({
        county: this.props.county
      })
    }
  }

  displayNewsFeed() {
    return  this.state.articles.sort( //sort the newsfeed articles by date, earliest to latest
      function(article1, article2) {
        return new Date(article1.timestamp) - new Date(article2.timestamp);
      }
    ).map(
      function(article) {
        return (
          <div className="Article-element"> 
            <div className="Timestamp">
              {article.mins_ago}
            </div>
            <div className="Title">
              <a target="_blank" href={article.article_url} className="Title">
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
         <div className="Displaying">
            Displaying 
            <div className="County">
            {this.state.county}
            </div>
        </div>
        <div className="COVID-19-changes-in-your-area">
            COVID-19 changes in your area
        </div>
          <StatisticsView 
            county={this.state.county}
            updateArticlesInParent={this.updateArticlesInParent}
            endpoint={this.props.endpoint}
          />
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
