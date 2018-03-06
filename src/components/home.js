import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import *as firebase from 'firebase';
import { addTodoAction } from '../store/action/action';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';


//style
const paperStyle = {
    height: 100,
    width: 500,
    margin: 30,
    textAlign: 'center',
    display: 'inline-block',
};
const btnStyle = {
    margin: 12,
};

class Home extends Component {

    constructor(props) {
        super(props)
        this.state = {
            todoInput: "",
            flag: false
        }
        //firebase
        let allTodos = [];
        firebase.database().ref('/reduxTodos').on('child_added', (snap) => {
            let firebaseTodo = {}
            firebaseTodo.todo = snap.val();
            firebaseTodo.key = snap.key;
            allTodos.push(firebaseTodo)
            this.props.addTodoToState(allTodos)
        })
        console.log('cons')
    }
    _onChangeHandler(ev) {
        this.setState({
            [ev.target.name]: ev.target.value
        })
    }

    _addTodo() {
        if (this.state.todoInput === '') {
            alert("Enter Some Value")
        }
        else {
            let inputValue = this.state.todoInput
            firebase.database().ref('/').child('reduxTodos').push(inputValue);
        }
    }
    _deleteTodo(val){
        console.log('delete', val.key)
        firebase.database().ref('/').child('rduxTodos').remove(val.key)
    }
    render() {
        console.log('render')
        return (
            <div className='row'>
                <div className='col-md-6 offset-md-3'>

                    <br />
                    <h2>Create Your Tasks Here {this.props.userName}</h2> <br />
                    <TextField floatingLabelText="Todo" hintText="Enter Todo Here" name="todoInput" value={this.state.todoInput} onChange={this._onChangeHandler.bind(this)} />
                    <RaisedButton label="Add" onClick={this._addTodo.bind(this)} style={btnStyle} />


                    <br />
                    {console.log('state', this.props.stateTodos)}

                    <ul>
                        {
                            this.props.stateTodos.map((val, ind) => {
                                console.log('map', val)
                                return (
                                    <li key={ind}>
                                        <table>
                                            <tbody>
                                                <tr>
                                                    <td>{val.todo}</td>
                                                    <td><RaisedButton label="Edit" primary={true} onClick={this._deleteTodo.bind(this)} style={btnStyle} /></td>
                                                    <td><RaisedButton label="Delete" secondary={true} onClick={this._deleteTodo.bind(this, val)} style={btnStyle} /></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </li>
                                )
                            })
                        }


                    </ul>
                </div>

            </div>
        )
    }


}

function mapStateToProp(state) {
    return ({
        userName: state.root.userName,
        stateTodos: state.root.todos
    })
}
function mapDispatchToProp(dispatch) {
    return ({

        addTodoToState: (allTodos) => {
            dispatch(addTodoAction(allTodos))
        }
    })
}

export default connect(mapStateToProp, mapDispatchToProp)(Home);



//will
//render
//did