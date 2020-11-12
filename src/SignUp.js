import React, { Component } from 'react';
import './App.css';
import request from 'superagent';

export default class SignUp extends Component {
    state = { 
        email: '',
        password: '',
        loading: false,
    }

    handleSubmit = async (e) => {
        e.preventDefault()

        this.setState({ loading:true })
        const user = await request
            .post('https://rocky-lowlands-87745.herokuapp.com/auth/signup')
            .send(this.state);
            
            console.log(user.body,' sending you tdos')
            this.setState({ loading: false })

       
            this.props.changerTN(user.body.email,
            user.body.token);
            this.props.history.push('/todos')
    }   

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    Username or Email:
                    <label> 
                        <input
                        value={this.state.email}
                        type="email" 
                        required
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

                    {
                        this.state.loading
                        ? 'spins'
                        : <button>Submit</button>
                    }
                </form>
            </div>
        )
    }
}
