import React, {Component} from 'react'; 
import Logo from "../../images/close-logo@2x.png"
import "./header.css"
import MediaQuery from "react-media";

// import './components/footer.css';
// import rocket from '../images/rocket@4x.png';
// import { Link, BrowserRouter as Router, Route, Switch } from 'react-router-dom';


class Header extends Component{
    constructor(props) {
        super(props);
    }

    
    render() {
        return (
            <div className="header">
                <img className="logo-pic" src={Logo} />
                <span className="logo-title">
                    Close
                </span>
                <MediaQuery query="(max-width: 768px)">
                    {
                        (match) => {
                            return match ? 

                            (
                                <button onClick={() => {this.props.changeActiveMobileComponent("menu")}} className="Menu-button"> 
                                    <ion-icon id="Menu-icon" name="menu-outline"></ion-icon>
                                </button>
                            )
                            :
                            null
                        }
                    }
                   
                </MediaQuery>
            </div>

        );
    }
  }
  
  export default Header;