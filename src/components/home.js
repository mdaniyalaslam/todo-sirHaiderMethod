import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import *as firebase from 'firebase';
import { addTodoAction, deleteTodoAction } from '../store/action/action';
// import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';


// style
// const paperStyle = {
//     height: 100,
//     width: 500,
//     margin: 30,
//     textAlign: 'center',
//     display: 'inline-block',
// };
const btnStyle = {
    margin: 12,
};

class Home extends Component {

    constructor(props) {
        super(props)
        this.state = {
            todoInput: "",
            isEdit: false,
            todoId: ''
        }
        //firebase
        console.log('cons')

    }
    componentDidMount() {
        console.log('did')
        this.props.addTodoToState()
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
            this.setState({todoInput:''})
        }
    }
    _deleteTodo(id) {
        // console.log('delete', id)
        this.props.deleteTodoToState(id)
        this.props.addTodoToState();
    }
    _editTodo(val){
        console.log('edit works', val.key)
        val.isEdit = true;

        // this.setState({isEdit:true, todoId:id})
    }
    _editTodoDone(id){
        // console.log('edit works')
        this.setState({isEdit:false})
    }
    render() {
        // console.log('render')
        return (
            <div className='row'>
                <div className='col-md-6 offset-md-3'>

                    <br />
                    <h2>Create Your Tasks Here {this.props.userName}</h2> <br />
                    <TextField floatingLabelText="Todo" hintText="Enter Todo Here" name="todoInput" value={this.state.todoInput} onChange={this._onChangeHandler.bind(this)} />
                    <RaisedButton label="Add" onClick={this._addTodo.bind(this)} style={btnStyle} />


                    <br />
                    {console.log('coming state', this.props.stateTodos)}

                    <ul>
                        {
                            this.props.stateTodos.map((val) => {
                                // console.log('map', val)
                                return (
                                    (this.state.isEdit)?

                                    (
                                        <li id={val.key}>
                                        {/* {val.todo} */}
                                        <TextField
                                            hintText="Hint Text"
                                            value = {val.todo}
                                        />
                                        <RaisedButton label="Done"  style={btnStyle} primary={true} onClick={this._editTodoDone.bind(this, val.key)} />
                                        <RaisedButton label="Cancel" onClick={()=>{this.setState({isEdit:false})}} style={btnStyle} secondary={true}/>
                                        </li>
                                     )
                                     :
                                     (
                                        <li id={val.key}>
                                        {/* {val.todo} */}
                                        <TextField
                                            hintText="Hint Text"
                                            value = {val.todo}
                                            disabled
                                        />
                                        <RaisedButton label="Edit"  style={btnStyle} primary={true} onClick={this._editTodo.bind(this, val)} />
                                        <RaisedButton label="Delete" onClick={this._deleteTodo.bind(this, val.key)} style={btnStyle} secondary={true}/>
                                        </li>
                                     )
                                     
                                    
                                    
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

        addTodoToState: () => {
            dispatch(addTodoAction())
        },
        deleteTodoToState: (id) => {
            dispatch(deleteTodoAction(id))
        }
    })
}

export default connect(mapStateToProp, mapDispatchToProp)(Home);



//will
//render
//did