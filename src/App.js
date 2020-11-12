import React, { Component } from 'react'
import {
    BrowserRouter as Router, 
    Route, 
    Switch,
    Link,
} from "react-router-dom";
import Login from './Login.js';
import SignUp from './SignUp.js';
import Home from './Home.js';
import Todos from './Todos.js';
import './App.css';

export default class App extends Component {
  // state = { token: localStorage.getItem('TOKEN') }

  // handleTokenChange = (myToken) => {
  //   this.setState({ token: myToken });
  //   localStorage.setItem('TOKEN', myToken);
  // }

  state= {
    username: localStorage.getItem('USERNAME') || '',
    token: localStorage.getItem('TOKEN') || '',
  }

  changerTN =(username, token) => {
    localStorage.setItem('TOKEN', token);
    localStorage.setItem('USERNAME', username);

    this.setState({
      username: username,
      token: token
    })
  }

  render() {
    return (
      <div>
        <Router>
          <ul>
            { this.state.username }
            <Link to="/login"><div>log in</div></Link>
            <Link to="/signup"><div>sign up</div></Link>
            <button onClick={() => this.handleTokenChange('')}>logout</button>
          </ul>
          <Switch>
            <Route exact path='/' render={(routerProps) => <Home {...routerProps} />} />
            <Route exact path='/login' render={(routerProps) => <Login {...routerProps} />} />
            <Route exact path='/signup'
            render={
              (routerProps) =>
                <SignUp
                {...routerProps}
                changerTN={this.changerTN} 
                />
            }
            />    
            <Route exact path='/todos' render={(routerProps) => <Todos {...routerProps} token={this.state.token} />} />      
          </Switch>
        </Router>
      </div>
    )
  }
}