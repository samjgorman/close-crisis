import React, {Component} from 'react'; 
// import './components/footer.css';
// import rocket from '../images/rocket@4x.png';
// import { Link, BrowserRouter as Router, Route, Switch } from 'react-router-dom';


class Footer extends Component{
    render() {
        return (
        <div className = "Footer-wrapper">

        <div className = "Content-wrapper">

            <div className = "Text-wrapper"> 
                <div className = "Cat-one"> 
                    <div className = "Footer-content"> Built by Stanford and Berkeley students </div>
                </div>

                
            </div>

        </div>

        <div className = "Footer-bottom-wrapper"> 
            <div className = "Footer-bottom-text">Built with ❤️ and scholarship 💰 </div>
            <div className = "Footer-bottom-contact">contact@peerlift.org </div>
        </div>

        </div>
        );
    }
  }
  
  export default Footer;