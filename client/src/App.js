import React, { Component } from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import Signup from "./Components/auth/Signup";
import AuthService from "./Components/auth/auth-service";
import Login from "./Components/auth/Login";
import Home from "./Components/Home";
import Navbar from "./Components/Navbar";
import Map from "./Components/Map";
import LogDetails from "./Components/logs/LogDetails";
import EditLocation from "./Components/editLocations"
//import EditLogEntry from "./Components/logs/EditLogEntry";

class App extends Component {
  state = { loggedInUser: null };

  service = new AuthService();

  fetchUser() {
    if (this.state.loggedInUser === null) {
      this.service
        .loggedin()
        .then((response) => {
          this.setState({
            loggedInUser: response,
          });
        })
        .catch((err) => {
          this.setState({
            loggedInUser: false,
          });
        });
    }
  }

  getTheUser = (userObj) => {
    this.setState({
      loggedInUser: userObj,
    });
  };

  render() {
    this.fetchUser();
    if (this.state.loggedInUser) {
      return (
        <div className="App">
          <Navbar userInSession={this.state.loggedInUser} />
          <Switch>
            <Route exact path="/home" component={Home} />
            <Route exact path="/map" component={Map}/>
            <Route exact path= "/log-details" component={LogDetails}/>
            <Route exact path="/edit-location" component={EditLocation}/>
          </Switch>
        </div>
      );
    } else {
      return (
        <div className="App">
          <Navbar {...this.props} userInSession={this.state.loggedInUser} getUser={this.getTheUser}/>
          <Switch>
            <Route
              exact
              path="/signup"
              render={() => <Signup getUser={this.getTheUser} />}
            />
            <Route
              exact
              path="/login"
              render={() => <Login getUser={this.getTheUser} />}
            />
            <Route exact path="/home" component={Home} />
            <Route 
            exact path="/map"
            render={() => <Map {...this.props}/>}
            />
          </Switch>
        </div>
      );
    }
  }
}

export default App;
