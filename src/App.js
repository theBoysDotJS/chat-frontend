import React, { Component } from 'react';
import NavBar from "./components/elements/NavBar.js"
import './css/App.css';
import Socket from './socketHandle'



class App extends Component {
  render() {
    return (
      <div className="App">
	  	<NavBar user={localStorage.user} params={this.props.params}/>
        {this.props.children}
      </div>
    );
  }
}
// Socket.receiveMessage();
export default App;
