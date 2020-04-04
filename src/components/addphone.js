import React, {Component} from 'react'; 
// import '../components/addOpp.css';
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import axios from 'axios';


//Deprecated component that sends a text message to users after an onClick
//Leaving as a component because may be useful when we get iOS approved.

class AddPhone extends Component{

    constructor(props){
        super(props);
            this.state = {
                phone: "",
                copied: false
            };
        }
    // changeHandler = e => {
    //     this.setState({phone: e.target.value});
    // }

    submitHandler = e => {
        e.preventDefault()
        axios.post(`/api/phone`, {
            phone: this.state.phone,
          })
          
          .then((response)=>{
            console.log(response);
              this.setState({onError: false});
         })
          .catch((error)=>{
            console.log(error);
              this.setState({onError: true});
         });

    }
     
    render() {
        return (
            <div className = "FormContainer"> 
            <div className = "OppText">Enter your phone number </div>
            <form onSubmit= {this.submitHandler} className = "Form">
                {/* <input className = "FormInput" type = "text" placeholder = "Your Phone Number" value ={this.state.name} onChange = {this.changeHandler}>
                </input> */}
                <PhoneInput
                    defaultCountry={'US'}
                    placeholder = "Enter your phone number"
                    value={this.state.phone}
                    onChange={phone => this.setState({ phone })}
                />
                <button type = "submit" className = "FormButton" > Add
                </button>
            </form>
            {/* {this.state.copied ? 
                    <React.Fragment>
                     <ConfirmButton
                     text = "Sent to Peerlift!"
                     visible = {false}
                     ></ConfirmButton>
                      </React.Fragment>
                     : null} */}
            </div>
        );
    }
  }
  
  export default AddPhone;
  //notee: myClick goes nowhere