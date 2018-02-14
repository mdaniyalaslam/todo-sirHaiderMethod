
import ActionTypes from '../constant/constant';

export function changeUserName(name){
    return dispatch => dispatch({type: ActionTypes.USERNAME, payload: name})
    
}