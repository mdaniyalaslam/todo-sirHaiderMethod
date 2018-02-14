import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import {changeUserName} from '../store/action/action';
class Home extends Component {

    constructor(props){
        super(props)
        this.state={
            inputTxt:""
        }
    }
    _onChangeHandler(ev){
        this.setState({
            [ev.target.name]:ev.target.value
            
        })
        // console.log(ev.target.value)
    }

    _changeData(){
        console.log('event called');
        this.props.changeUserNameToReducer(this.state.inputTxt);
    }

    render() {
        return (
            <div>
                <h1>Hello World {this.props.userName}</h1>
                <input type="text" name="inputTxt" value={this.state.inputTxt} onChange={this._onChangeHandler.bind(this)}/>
                <button onClick={this._changeData.bind(this)}>Change</button>

                <Link to='/about'>Go to About</Link>
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

