import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import {changeUserName} from '../store/action/action';
class Home extends Component {

    constructor(props){
        super(props)
        this.state={
            todoInput:""
        }
    }
    _onChangeHandler(ev){
        this.setState({
            [ev.target.name]:ev.target.value
 
        })
        // console.log(ev.target.value)
    }

    _addTodo(){
        console.log('event called');
        this.props.changeUserNameToReducer(this.state.todoInput);
    }

    render() {
        return (
            <div>
                <h1>Hello World {this.props.userName}</h1>
                <input type="text" name="todoInput" value={this.state.todoInput} onChange={this._onChangeHandler.bind(this)}/>
                <button onClick={this._addTodo.bind(this)}>Add</button>
            </div>
        )
    }
}

function mapStateToProp(state){
    return({
        userName: state.root.userName
    })
}
function mapDispatchToProp(dispatch){
    return({
        changeUserNameToReducer: (name)=>{dispatch(changeUserName(name))}
    })
}

export default connect(mapStateToProp,mapDispatchToProp)(Home);

