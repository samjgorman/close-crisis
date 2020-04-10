import React from 'react';
import "./countyInfo.css";
import StatisticsView from "../statisticsView/statisticsView.js"
import Placeholder from "../placeholder/placeholder.jsx"

import axios from 'axios';
import ContentLoader, { List } from 'react-content-loader'
import { Mixpanel } from '../../mixpanel';


class CountyInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      county: null, 
      cases: null, 
      deaths: null, 
      new_cases: null, 
      new_deaths: null, 
      articles: [],
      last_updated: null
    };

    this.newsHandler = this.newsHandler.bind(this);


    this.updateArticlesInParent = (articles) => {
      this.setState({
        articles: articles
      })
    }

    this.updateLastUpdatedInParent = (last_updated) => {
      console.log(last_updated);
      this.setState({
        last_updated: last_updated
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

 
  //This handler tracks newsArticle clicks for mixpanel
  newsHandler(article){
    Mixpanel.track('newsClick');
    // console.log(article);
   
}

  displayNewsFeed() {
    if(!Array.isArray(this.state.articles)){
      return this.state.articles
    }
    var sorted = this.state.articles.sort( //sort the newsfeed articles by date, earliest to latest
      function(article1, article2) {
        return new Date(article1.timestamp) - new Date(article2.timestamp);
      })

    return sorted.map((article) =>{
        return (
          <div className="Article-element"> 
            <div className="Timestamp">
              {article.mins_ago}
            </div>
            <div className="Title">
              {/* <button className="clickWrapper" onClick = {() => this.newsHandler(article)}>  */}
              <a target="_blank" href={article.article_url} onClick = {() => this.newsHandler(article)} className="Title">
                {article.article_title}
              </a>
              {/* </button> */}
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
            COVID-19 cases for {this.state.last_updated}
        </div>
          <StatisticsView 
            county={this.state.county}
            updateArticlesInParent={this.updateArticlesInParent}
            endpoint={this.props.endpoint}
            updateLastUpdatedInParent={this.updateLastUpdatedInParent}
          />
          <div className="News-feed">
            <div className="Local-updates-for-Los-Angeles-Orange-County">
              Local updates for {this.state.county}
            </div>

          {/* {this.props.newsLoaded ? (
                        null
                        ) : (
                          <Placeholder/>
                            )} */}
            
            {this.displayNewsFeed()}
          </div>
      </div>
    )

  }
}



export default CountyInfo;
