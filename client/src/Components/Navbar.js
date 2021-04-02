// navbar/Navbar.js
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AuthService from './auth/auth-service';

class Navbar extends Component {
  state = { loggedInUser: null }

  service = new AuthService()

  componentWillReceiveProps(nextProps) {
    this.setState({...this.state, loggedInUser: nextProps["userInSession"]});
  }

  logoutUser = () =>{
    this.service.logout()
    .then(() => {
      this.props.getUser(null);  
      this.setState({ loggedInUser: null });
    })
  }

  render(){
    console.log({props: this.props})
    if(this.state.loggedInUser){
      return(
        <nav className="nav-style">
          <ul>
            <li>Welcome, {this.state.loggedInUser.username}</li>
            <li><Link to='/map' style={{ textDecoration: 'none' }}>Map</Link></li>
            <li>
              <Link to='/'>
                <button onClick={() => this.logoutUser()}>Logout</button>
              </Link>
            </li>
          </ul>
        </nav>
      )
    } else {
      return ( 
        <nav className="nav-style">
          <ul>
            <li><Link to='/login' style={{ textDecoration: 'none' }}>Login</Link></li>
            <li><Link to='/signup' style={{ textDecoration: 'none' }}>Signup</Link></li>
          </ul>
        </nav>
      )
    }
  }
}


export default Navbar;