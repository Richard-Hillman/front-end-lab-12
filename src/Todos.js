import React, { Component } from 'react'
import request from 'superagent';


export default class Todos extends Component {

    state = { 
        todos: [],
        todo: '',
        completed: false,
        err: null,
    }

    fetch = async () => {
        const response = await request.get('https://rocky-lowlands-87745.herokuapp.com/api/todos')
        .set('Authorization', this.props.token)

        this.setState({ todos: response.body })
    } 

    componentDidMount = async () => {
        this.fetch();
    }

// ----------------------------------------------------------------------------

    createTodo = async () => {
        try{
            await request
            .post('https://rocky-lowlands-87745.herokuapp.com/api/todos')
            .send({
                todo: this.state.todo,
                completed: this.state.completed,
            })
            .set('Authorization', this.props.token)
            this.fetch()
        
            return;
        } catch (err) {
            this.setState({
                err: 'fancy error message'
            })
        }
    }

// -----------------------------------------------------------------------------

    handleSubmit = async (e) => {
        e.preventDefault(); 

        await this.createTodo({
            todo: this.state.todo,
            completed: this.state.completed,
        });

        // this.props.history.push('/todos')
    } 

// -----------------------------------------------------------------------------

    handleTodo = (e) => {
        this.setState({todo: e.target.value})
    }

    handleCompleted = (e) => {
        this.setState({completed: e.target.value});
    }

    // -------------------------------------------------------------------------

    render() {
        return (
            <>
            <div>
                Welcome to Todos
                {
                    !!this.state.todos.length && this.state.todos.map(todo => 
                    <div>
                        todo: {todo.todo}; 
                        completed: {todo.completed.toString()}
                    </div>)
                }
            </div>
            
            <form onSubmit={this.handleSubmit}>
                <label>

                    <h1>Create a Todo</h1>

                    <div>
                        Name Of Todos
                    </div>

                    <div>     
                        <input onChange={this.handleTodo} type="text" 
                        value={this.state.todo} /> 
                    </div>
                    
                    <div>
                        <div>
                        Complete: 
                        </div>

                        <select onChange={this.handleCompleted}>
                            <option value={true}>TRUE</option>
                            <option value={false}>FALSE</option>
                        </select>
                    </div>

                </label>

                <button>Submit</button>

            </form>
            </>
        )
    }
}
