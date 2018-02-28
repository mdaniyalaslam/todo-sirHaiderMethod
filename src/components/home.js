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
        firebase.database().ref('/reduxTodos').on('child_added', (snap) => {
            let firebaseTodo = {}
            firebaseTodo.todo = snap.val();
            firebaseTodo.key = snap.key;
            let allTodos = [];
            allTodos.push(firebaseTodo)
            this.props.addTodoToState(allTodos)
        })
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
                    {/* {console.log('state', this.props.stateTodos)} */}
                    {
                        (this.state.flag) ? (
                            
                            <ul className="">
                                {
                                //     this.props.stateTodos.map((val, ind) => {
                                //         return (
                                //             <li>
                                //                 <table>
                                //                     <tr>
                                //                         <td>{}</td>
                                //                         <td><button>Edit</button></td>
                                //                         <td><button>Delete</button></td>
                                //                     </tr>
                                //                 </table>
                                //             </li>
                                //         )
                                //     })
                                }


                            </ul>
                        )
                            :
                            (
                                console.log('check')
                                
                                // <RaisedButton label="cancel" onClick={this._addTodo.bind(this)} style={btnStyle} />

                            )

                    }


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