import React, { Component } from 'react';
import './App.css';
import request from 'superagent';

export default class Login extends Component {
    state = { 
        email: '',
        password: '',
        loading: false,
        err: null,
    }

    handleSubmit = async (e) => {
        e.preventDefault()
        this.setState({ loading:true })
        try{
        const user = await request
            .post('https://rocky-lowlands-87745.herokuapp.com/auth/signin')
            .send(this.state);
        

            console.log(user.body,'sending you todos')
            this.setState({ loading: false })

            this.props.changerTN(user.body.email,
            user.body.token);
            this.props.history.push('/todos')
        }
        catch(err) {
            this.setState({ err: 'Fancy pants lads for mooon cheese, eat the moon cream, fingers '})
        } 

    }   

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <h2>Login</h2>
                    Username or Email:
                    <label> 
                        {this.state.err && <div>
                            {this.state.err}
                            </div>}
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
