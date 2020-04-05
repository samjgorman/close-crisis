import React, {Component} from 'react'; 
import Logo from "../../images/close-logo@2x.png"
import "./header.css"
import MediaQuery from "react-media";
import menu from '../../images/menu@5x.png';
import { Link, BrowserRouter as Router, Route, Switch } from 'react-router-dom';


// import './components/footer.css';
// import rocket from '../images/rocket@4x.png';
// import { Link, BrowserRouter as Router, Route, Switch } from 'react-router-dom';


class Header extends Component{
    constructor(props) {
        super(props);
        this.state = {
            menu_active: false
        }
    }

    componentDidUpdate(prev_props) {
        if(prev_props.active_mobile_component !== this.props.active_mobile_component) {
            this.setState({
                menu_active: this.props.active_mobile_component === "menu"
            });
        }
    }
    

    onMenuClick() {
        if(this.state.menu_active) {
            this.props.changeActiveMobileComponent(this.props.prev_active_mobile_component);
        }else {
            this.props.changeActiveMobileComponent("menu");
        }
        this.setState({
            menu_active: !this.state.menu_active
        })
    }
    render() {
        return (
            <div className="header">
            <div className = "grid-logo"> 
                <img className="logo-pic" src={Logo} />
                <div className="logo-title">Close</div>
                    
            </div>
                <MediaQuery query="(max-width: 768px)">
                    {
                        (match) => {
                            return match ? 

                            (
                                <button onClick={() => {this.onMenuClick()}} className="Menu-button"> 
                                    {
                                        this.state.menu_active ? 
                                            (<ion-icon  id="Close-icon" name="close-outline"></ion-icon>)
                                            :
                                            <img id = "Menu-icon" src = {menu} />

                                            // (<ion-icon id="Menu-icon" name="menu-outline"></ion-icon>)
                                    }
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