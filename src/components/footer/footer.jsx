import React, {Component} from 'react'; 
import './footer.css';
import { Link, BrowserRouter as Router, Route, Switch } from 'react-router-dom';




const Footer = ( {title, color} ) => {
  return(

    <div className = "footer-wrapper"> 
        <div className = "footer-section-wrapper">
        
            <div className = "section-two"> 
                <div className = "section-two-title">Created by scholars at UC Berkeley and Stanford.</div>

                  
            </div>

        </div>
        <div className = "footer-text">sgorman at stanford.edu</div>
    </div>
  
  )
}

export default Footer;