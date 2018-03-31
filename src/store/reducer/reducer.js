import ActionTypes from '../constant/constant';

const INITIAL_STATE = {
    userName: '',
    todos: []
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ActionTypes.USERNAME:
            return ({
                ...state,
                userName: action.payload
            })
        /////////////
        case ActionTypes.ADDTODO:
            // console.log('reducer', state.todos)
            return ({
                ...state,
                todos: action.payload
            })
        ///////////////
        case ActionTypes.EDITTODO:
        state.todos[action.index].isEdit = true  
        // console.log('edittodo', state.todos)
            return({
                ...state,
                todos:state.todos.concat()
            })
        default:
            return state;
    }

}