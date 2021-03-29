import React, { Component } from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Home from './Components/Home';
import Navbar from './Components/Navbar'
 import Map from './Components/Map'
class App extends Component {
  render() {
    return (
      <div className="App">
      <Navbar />
      <Switch>
          <Route exact path='/' component={Home}/>
          <Route path='/map' component={Map}/>
        </Switch>
      </div>
    );
  }
}
 
export default App;
