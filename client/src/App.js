import React from 'react';
import logo from './logo.svg';
import './App.css';
import AddPhone from './components/addphone.js';
import Footer from './components/footer.js';
import phone from './images/close-example@2x.png';




function App() {
  return (
    <div className="App">
        <div className = "title">A free public health tool for CA residents.</div>
        <div className = "desc">Simple statistics and local news for every county in California.  Available for every CA resident on iOS, for free.</div>
        <AddPhone></AddPhone>
        <img className = "img-hero" id = "phone" src = {phone} />
        <Footer></Footer>
        
      
    </div>
  );
}

export default App;
