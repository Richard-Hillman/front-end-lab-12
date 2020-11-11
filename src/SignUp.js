import React, { Component } from 'react';
import './App.css';

export default class SignUp extends Component {
    state = { 
        email: '',
        password: ''
    }

    handleSubmit = (e) => {
        e.preventDefault()
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    Username or Email:
                    <label> 
                        <input
                        value={this.state.email}
                        onChange={(e) => this.setState({ email: e.target.value})}
                        />
                    </label>
                    Password
                    <label type="password"> 
                        <input
                        value={this.state.password}
                        onChange={(e) => this.setState({ password: e.target.value})}
                        />
                    </label>
                    <button>Submit</button>
                </form>
            </div>
        )
    }
}
