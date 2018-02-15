import ActionTypes from '../constant/constant';

const INITIAL_STATE = {
    userName: '',
    todos : []
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ActionTypes.USERNAME:
            return ({
                ...state,
                userName: action.payload
            })
        case ActionTypes.ADDTODO:
            return({
                ...state,
                todos:action.payload

            })
        default:
            return state;
    }

}