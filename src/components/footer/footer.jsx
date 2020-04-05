import React, {Component} from 'react'; 
import './footer.css';
import { Link, BrowserRouter as Router, Route, Switch } from 'react-router-dom';




const Footer = ( {title, color} ) => {
  return(

    <div className = "footer-wrapper"> 
        <div className = "footer-section-wrapper">
        
            <div className = "desc"> 
                <ion-icon id = "info" name="information-circle-outline"></ion-icon>
                <div className = "section-two-title">Created by scholars at UC Berkeley and Stanford.</div>

                  
            </div>

        </div >
        <div className = "contact"> 
            <ion-icon id = "mail" name="mail-outline" className = "mail"></ion-icon>
            <div className = "footer-text">sgorman at stanford.edu</div>
        </div>
    </div>
  
  )
}

export default Footer;