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
    let response = {};
    response.data = {"articles":[{"article_icon":"link","article_title":"Brazilian pews become battlegrounds in fight against quarantine","article_url":"https://www.latimes.com/world-nation/story/2020-03-31/brazilian-pews-become-trenches-in-fight-against-quarantine","mins_ago":"1 hour ago","newspaper_name":"LA Times Health","short_link":"www.latimes.com","temp_var":1585641996},{"article_icon":"link","article_title":"The State of Play: Sports still offers us a temporary reprieve from the disheartening flood of coronavirus coverage","article_url":"http://dailytrojan.com/2020/03/31/the-state-of-play-sports-still-offers-us-a-temporary-reprieve-from-the-disheartening-flood-of-coronavirus-coverage/","mins_ago":"2 hours ago","newspaper_name":"Daily Trojan","short_link":"dailytrojan.com","temp_var":1585640728},{"article_icon":"link","article_title":"San Clemente pianist serenades neighbors amid coronavirus stay-at-home orders","article_url":"https://ktla.com/news/local-news/san-clemente-pianist-serenades-neighbors-amid-coronavirus-stay-at-home-orders/","mins_ago":"3 hours ago","newspaper_name":"KTLA","short_link":"ktla.com","temp_var":1585635993},{"article_icon":"link","article_title":"Here are disinfectants for use against the coronavirus","article_url":"https://www.ocregister.com/2020/03/30/here-are-disinfectants-for-use-against-the-coronavirus/","mins_ago":"3 hours ago","newspaper_name":"OC Register","short_link":"www.ocregister.com","temp_var":1585634763},{"article_icon":"link","article_title":"Stranded cruise ship hit by virus begs Florida to dock","article_url":"https://www.latimes.com/world-nation/story/2020-03-30/stranded-cruise-ship-hit-by-virus-begs-florida-to-dock","mins_ago":"3 hours ago","newspaper_name":"LA Times Health","short_link":"www.latimes.com","temp_var":1585634246},{"article_icon":"link","article_title":"Fearing the coronavirus, Michael Avenatti, R. Kelly and other celebrity inmates seek early release","article_url":"https://www.latimes.com/politics/story/2020-03-30/coronavirus-famous-inmates-early-release","mins_ago":"5 hours ago","newspaper_name":"LA Times Health","short_link":"www.latimes.com","temp_var":1585628280},{"article_icon":"link","article_title":"Hospitalizations spike as California tries to slow coronavirus spread","article_url":"https://www.latimes.com/california/story/2020-03-30/hospitalizations-spike-as-california-tries-to-slow-coronavirus","mins_ago":"6 hours ago","newspaper_name":"LA Times Health","short_link":"www.latimes.com","temp_var":1585626527},{"article_icon":"link","article_title":"Farmers markets in Santa Monica, Pasadena, Culver, Torrance to remain open after L.A.'s are ordered to close","article_url":"https://www.latimes.com/food/story/2020-03-30/santa-monica-pasadena-culver-city-farmers-markets","mins_ago":"6 hours ago","newspaper_name":"LA Times Health","short_link":"www.latimes.com","temp_var":1585626476},{"article_icon":"link","article_title":"15,000 L.A. high school students are AWOL online, 40,000 fail to check in daily amid coronavirus closures","article_url":"https://www.latimes.com/california/story/2020-03-30/coronavirus-los-angeles-schools-15000-high-school-students-absent","mins_ago":"6 hours ago","newspaper_name":"LA Times Health","short_link":"www.latimes.com","temp_var":1585624092},{"article_icon":"link","article_title":"L.A. County sheriff reverses closure order for gun stores","article_url":"https://ktla.com/news/l-a-county-sheriff-reverses-closure-order-for-gun-stores/","mins_ago":"6 hours ago","newspaper_name":"KTLA","short_link":"ktla.com","temp_var":1585623503},{"article_icon":"link","article_title":"Lose your job over the coronavirus? Here's how to avoid eviction if you can't pay rent","article_url":"https://www.latimes.com/homeless-housing/story/2020-03-30/coronavirus-homeowner-tenant-renter-protections-eviction-foreclosure-california","mins_ago":"7 hours ago","newspaper_name":"LA Times Health","short_link":"www.latimes.com","temp_var":1585622098},{"article_icon":"link","article_title":"Ventura County secures motels to shelter homeless as virus spreads, infecting another 17 people","article_url":"https://ktla.com/news/local-news/ventura-county-secures-motels-to-shelter-homeless-as-virus-spreads-infecting-another-17-people/","mins_ago":"7 hours ago","newspaper_name":"KTLA","short_link":"ktla.com","temp_var":1585622067},{"article_icon":"link","article_title":"Map shows coronavirus cases in San Bernardino County cities","article_url":"https://www.ocregister.com/2020/03/30/map-shows-coronavirus-cases-in-san-bernardino-county-cities/","mins_ago":"7 hours ago","newspaper_name":"OC Register","short_link":"www.ocregister.com","temp_var":1585621962},{"article_icon":"link","article_title":"Kensington, in Redondo Beach, one of 11 coronavirus outbreak centers","article_url":"https://www.dailybreeze.com/2020/03/30/kensington-in-redondo-beach-one-of-11-coronavirus-outbreak-centers/","mins_ago":"7 hours ago","newspaper_name":"The Daily Breeze","short_link":"www.dailybreeze.com","temp_var":1585621537},{"article_icon":"link","article_title":"Coronavirus Today: A rent freeze and a Health Corps","article_url":"https://www.latimes.com/science/newsletter/2020-03-30/coronavirus-today-health-corps-instacart-strike-coronavirus-today","mins_ago":"7 hours ago","newspaper_name":"LA Times Health","short_link":"www.latimes.com","temp_var":1585621282},{"article_icon":"link","article_title":"6 more patients arrive for care on the USNS Mercy","article_url":"https://www.ocregister.com/2020/03/30/6-more-patients-arrive-for-care-on-the-usns-mercy/","mins_ago":"7 hours ago","newspaper_name":"OC Register","short_link":"www.ocregister.com","temp_var":1585621257},{"article_icon":"link","article_title":"State considering Fairview center, OC fairgrounds to help manage coronavirus \u2018surge\u2019","article_url":"https://www.ocregister.com/2020/03/30/state-considering-fairview-center-oc-fairgrounds-to-help-manage-coronavirus-surge/","mins_ago":"7 hours ago","newspaper_name":"OC Register","short_link":"www.ocregister.com","temp_var":1585620452},{"article_icon":"link","article_title":"Is Orange County\u2019s coronavirus path the same as Italy\u2019s?","article_url":"https://www.ocregister.com/2020/03/30/is-orange-countys-coronavirus-path-the-same-as-italys/","mins_ago":"8 hours ago","newspaper_name":"OC Register","short_link":"www.ocregister.com","temp_var":1585619380},{"article_icon":"link","article_title":"Pass/no pass deadline extended to May 27, \u2018no record\u2019 option offered","article_url":"http://dailytrojan.com/2020/03/30/pass-no-pass-deadline-extended-to-may-27-no-record-option-offered/","mins_ago":"8 hours ago","newspaper_name":"Daily Trojan","short_link":"dailytrojan.com","temp_var":1585618793},{"article_icon":"link","article_title":"As coronavirus roils courts, prosecutors and public defenders fume about state directives","article_url":"https://www.latimes.com/california/story/2020-03-30/courts-coronavirus-prosecutors-public-defenders-fume-at-state-directives","mins_ago":"8 hours ago","newspaper_name":"LA Times California","short_link":"www.latimes.com","temp_var":1585618743},{"article_icon":"link","article_title":"Tenants get help as L.A. freezes rent hikes for thousands of apartments over coronavirus","article_url":"https://www.latimes.com/homeless-housing/story/2020-03-30/coronavirus-rent-freeze-control-apartment-los-angeles-eric-garcetti","mins_ago":"8 hours ago","newspaper_name":"LA Times California","short_link":"www.latimes.com","temp_var":1585618514},{"article_icon":"link","article_title":"Garcetti closes farmer\u2019s markets, slaps freeze on rent-controlled units during coronavirus crisis","article_url":"https://www.whittierdailynews.com/2020/03/30/garcetti-closes-farmers-markets-slaps-freeze-on-rent-controlled-units-during-coronavirus-crisis/","mins_ago":"8 hours ago","newspaper_name":"Whittier Daily News","short_link":"www.whittierdailynews.com","temp_var":1585618269},{"article_icon":"link","article_title":"Amazon fallout: Eastvale worker says company \u2018ho-hum\u2019 on coronavirus safety","article_url":"https://www.whittierdailynews.com/2020/03/30/amazon-fallout-eastvale-staff-say-company-ignoring-coronavirus-safety/","mins_ago":"8 hours ago","newspaper_name":"Whittier Daily News","short_link":"www.whittierdailynews.com","temp_var":1585618045},{"article_icon":"link","article_title":"Pasadenans find new social lives from their balconies in age of coronavirus","article_url":"https://www.sgvtribune.com/2020/03/30/pasadenans-find-new-social-lives-from-their-balconies-in-age-of-coronavirus/","mins_ago":"8 hours ago","newspaper_name":"San Gabriel Valley Tribune","short_link":"www.sgvtribune.com","temp_var":1585617273},{"article_icon":"link","article_title":"SoFi Stadium construction continues in Inglewood despite worker testing positive for coronavirus","article_url":"https://ktla.com/news/local-news/sofi-stadium-construction-continues-in-inglewood-despite-worker-testing-positive-for-coronavirus/","mins_ago":"8 hours ago","newspaper_name":"KTLA","short_link":"ktla.com","temp_var":1585617135},{"article_icon":"link","article_title":"Federal court order sought to shut down OC jail because of coronavirus exposure","article_url":"https://www.ocregister.com/2020/03/30/federal-court-order-sought-to-shut-down-oc-jail-because-of-coronavirus-exposure/","mins_ago":"8 hours ago","newspaper_name":"OC Register","short_link":"www.ocregister.com","temp_var":1585617130},{"article_icon":"link","article_title":"Orange County needs more supplies for protecting against coronavirus, officials said","article_url":"https://www.ocregister.com/2020/03/30/orange-county-needs-more-supplies-for-protecting-against-coronavirus-officials-said/","mins_ago":"8 hours ago","newspaper_name":"OC Register","short_link":"www.ocregister.com","temp_var":1585616457},{"article_icon":"link","article_title":"Coronavirus lawsuit: Conditions for immigrant detainees in Adelanto \u2018ideal\u2019 for disease","article_url":"https://www.ocregister.com/2020/03/30/coronavirus-lawsuit-conditions-for-immigrant-detainees-in-adelanto-ideal-for-disease/","mins_ago":"8 hours ago","newspaper_name":"OC Register","short_link":"www.ocregister.com","temp_var":1585616408},{"article_icon":"link","article_title":"Despite coronavirus, Monrovia church still met Sunday \u2014 but canceled evening service","article_url":"https://www.sgvtribune.com/2020/03/30/despite-coronavirus-monrovia-church-still-met-sunday-but-canceled-evening-service/","mins_ago":"8 hours ago","newspaper_name":"San Gabriel Valley Tribune","short_link":"www.sgvtribune.com","temp_var":1585616295},{"article_icon":"link","article_title":"L.A. suspends all farmers markets to slow coronavirus spread","article_url":"https://www.latimes.com/california/story/2020-03-30/coronavirus-deaths-jump-to-132-as-california-faces-a-critical-few-weeks","mins_ago":"8 hours ago","newspaper_name":"LA Times California","short_link":"www.latimes.com","temp_var":1585616240},{"article_icon":"link","article_title":"SpcaLA pet adoption centers in Hawthorne and Long Beach accepting donation drop-offs","article_url":"https://ktla.com/news/local-news/spcala-pet-adoption-centers-in-hawthorne-and-long-beach-accepting-donation-drop-offs/","mins_ago":"8 hours ago","newspaper_name":"KTLA","short_link":"ktla.com","temp_var":1585616182},{"article_icon":"link","article_title":"LAUSD struggles to reach significant number of students online, many of them homeless","article_url":"https://www.dailybreeze.com/2020/03/30/lausd-struggles-to-reach-significant-number-of-students-online-many-of-them-homeless/","mins_ago":"8 hours ago","newspaper_name":"The Daily Breeze","short_link":"www.dailybreeze.com","temp_var":1585616151},{"article_icon":"link","article_title":"Facing coronavirus, LA County Board of Supervisors set for first remote meeting \u2013 by phone, web","article_url":"https://www.whittierdailynews.com/2020/03/30/facing-coronavirus-la-county-board-of-supervisors-set-for-first-remote-meeting-by-phone-web/","mins_ago":"9 hours ago","newspaper_name":"Whittier Daily News","short_link":"www.whittierdailynews.com","temp_var":1585615450},{"article_icon":"link","article_title":"Conditions at San Francisco nursing home deteriorate rapidly amid coronavirus outbreak","article_url":"https://www.latimes.com/california/story/2020-03-30/conditions-at-san-francisco-hospital-deteriorate-rapidly-amid-coronavirus-outbreak","mins_ago":"9 hours ago","newspaper_name":"LA Times California","short_link":"www.latimes.com","temp_var":1585614601},{"article_icon":"link","article_title":"Pomona Unified, Mt. SAC employees test positive for coronavirus","article_url":"https://www.sgvtribune.com/2020/03/30/pomona-unified-mt-sac-employees-test-positive-for-coronavirus/","mins_ago":"9 hours ago","newspaper_name":"San Gabriel Valley Tribune","short_link":"www.sgvtribune.com","temp_var":1585614464},{"article_icon":"link","article_title":"First L.A. County inmate tests positive for coronavirus infection","article_url":"https://www.latimes.com/california/story/2020-03-30/inmates-coronavirus-la-county-jails-sheriff","mins_ago":"9 hours ago","newspaper_name":"LA Times California","short_link":"www.latimes.com","temp_var":1585613758},{"article_icon":"link","article_title":"Coronavirus hospitalizations have doubled in California over last three days","article_url":"https://www.latimes.com/california/story/2020-03-30/coronavirus-hospitalizations-have-doubled-in-california-over-last-three-days","mins_ago":"9 hours ago","newspaper_name":"LA Times California","short_link":"www.latimes.com","temp_var":1585613353},{"article_icon":"link","article_title":"L.A. extends renter protections, suspends farmers markets as virus cases continue to climb","article_url":"https://ktla.com/news/mayor-garcetti-to-give-daily-briefing-on-citys-response-to-coronavirus/","mins_ago":"9 hours ago","newspaper_name":"KTLA","short_link":"ktla.com","temp_var":1585613182},{"article_icon":"link","article_title":"Here\u2019s how many COVID-19 cases have been confirmed in San Bernardino County cities","article_url":"https://ktla.com/news/heres-how-many-covid-19-cases-have-been-confirmed-in-san-bernardino-county-cities/","mins_ago":"9 hours ago","newspaper_name":"KTLA","short_link":"ktla.com","temp_var":1585612297},{"article_icon":"link","article_title":"NCAA extends eligibility for spring student-athletes due to the coronavirus","article_url":"http://dailytrojan.com/2020/03/30/ncaa-extends-eligibility-for-spring-student-athletes-due-to-the-coronavirus/","mins_ago":"10 hours ago","newspaper_name":"Daily Trojan","short_link":"dailytrojan.com","temp_var":1585612260},{"article_icon":"link","article_title":"Students discuss impacts of losing on-campus jobs as facilities close amid COVID-19","article_url":"https://dailybruin.com/2020/03/30/students-discuss-impacts-of-losing-on-campus-jobs-as-facilities-close-amid-covid-19/","mins_ago":"10 hours ago","newspaper_name":"Daily Bruin","short_link":"dailybruin.com","temp_var":1585612069},{"article_icon":"link","article_title":"San Francisco Bay Area to extend coronavirus shelter-in-place order through at least May 1","article_url":"https://www.latimes.com/california/story/2020-03-30/bay-area-extends-coronavirus-shelter-in-place-order-through-at-least-may-1","mins_ago":"10 hours ago","newspaper_name":"LA Times California","short_link":"www.latimes.com","temp_var":1585611622},{"article_icon":"link","article_title":"LAPD officers get temperature checked before shift to help stem spread of coronavirus","article_url":"https://ktla.com/news/local-news/lapd-officers-get-temperature-checked-before-shift-to-help-stem-spread-of-coronavirus/","mins_ago":"10 hours ago","newspaper_name":"KTLA","short_link":"ktla.com","temp_var":1585611049},{"article_icon":"link","article_title":"El Monte confirms first coronavirus patient","article_url":"https://www.sgvtribune.com/2020/03/30/el-monte-confirms-first-coronavirus-patient/","mins_ago":"10 hours ago","newspaper_name":"San Gabriel Valley Tribune","short_link":"www.sgvtribune.com","temp_var":1585609742},{"article_icon":"link","article_title":"Orange County preparing for patient surge, releases inmates early as coronavirus cases continue to climb","article_url":"https://www.latimes.com/california/story/2020-03-30/coronavirus-orange-county-cases","mins_ago":"10 hours ago","newspaper_name":"LA Times California","short_link":"www.latimes.com","temp_var":1585609214},{"article_icon":"link","article_title":"L.A. County investigating COVID-19 outbreaks at 11 nursing homes and other facilities","article_url":"https://ktla.com/news/local-news/l-a-county-investigating-covid-19-outbreaks-at-11-nursing-homes-and-other-facilities-health-chief-says/","mins_ago":"11 hours ago","newspaper_name":"KTLA","short_link":"ktla.com","temp_var":1585607434},{"article_icon":"link","article_title":"USC launches outreach programs to assist community","article_url":"http://dailytrojan.com/2020/03/30/usc-launches-outreach-programs-to-assist-community/","mins_ago":"11 hours ago","newspaper_name":"Daily Trojan","short_link":"dailytrojan.com","temp_var":1585606756},{"article_icon":"link","article_title":"Coronavirus outbreaks at nursing homes rise sharply in L.A. County","article_url":"https://www.latimes.com/california/story/2020-03-30/coronavirus-outbreaks-la-county-nursing-homes","mins_ago":"11 hours ago","newspaper_name":"LA Times California","short_link":"www.latimes.com","temp_var":1585606484},{"article_icon":"link","article_title":"About a third of L.A. high school students aren\u2019t logging into class daily amid COVID-19 closures","article_url":"https://ktla.com/news/local-news/about-a-third-of-l-a-high-school-students-arent-logging-into-class-daily-amid-covid-19-closures/","mins_ago":"12 hours ago","newspaper_name":"KTLA","short_link":"ktla.com","temp_var":1585604907},{"article_icon":"link","article_title":"California will see peak of COVID-19 hospitalizations and deaths in less than 4 weeks, forecast finds","article_url":"https://ktla.com/news/california/california-will-see-peak-of-covid-19-hospitalizations-and-deaths-in-less-than-4-weeks-forecast-finds/","mins_ago":"12 hours ago","newspaper_name":"KTLA","short_link":"ktla.com","temp_var":1585604429},{"article_icon":"link","article_title":"19 coronavirus cases reported in Santa Monica since Friday for a total of 47","article_url":"https://www.smdp.com/19-new-coronavirus-cases-reported-in-santa-monica/188549","mins_ago":"12 hours ago","newspaper_name":"Santa Monica Daily Press","short_link":"www.smdp.com","temp_var":1585602578},{"article_icon":"link","article_title":"Students shift perspectives on COVID-19 as spread of disease progresses in US","article_url":"https://dailybruin.com/2020/03/30/students-shift-perspectives-on-covid-19-as-spread-of-disease-progresses-in-us/","mins_ago":"12 hours ago","newspaper_name":"Daily Bruin","short_link":"dailybruin.com","temp_var":1585601829},{"article_icon":"link","article_title":"Here are the Orange County communities with coronavirus cases","article_url":"https://www.latimes.com/california/story/2020-03-30/coronavirus-orange-county-city-breakdown","mins_ago":"12 hours ago","newspaper_name":"LA Times California","short_link":"www.latimes.com","temp_var":1585601507}],"cases":"464","county":"Orange County","deaths":"4","new_cases":"0","new_deaths":"0"}

    this.setState({
      county: response.data.county, 
      cases: response.data.cases, 
      deaths: response.data.deaths, 
      new_cases: response.data.new_cases, 
      new_deaths: response.data.new_deaths, 
      articles: response.data.articles
    })
    return;

        //TODO: get rid of above code

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
