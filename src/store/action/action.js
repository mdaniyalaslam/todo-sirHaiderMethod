
import ActionTypes from '../constant/constant';
import *as firebase from 'firebase';

 // Initialize Firebase
 var config = {
    apiKey: "AIzaSyAkhH4uLWHVBCVd5wtIvK6l6p9BLTZXBLs",
    authDomain: "todo-app-2411f.firebaseapp.com",
    databaseURL: "https://todo-app-2411f.firebaseio.com",
    projectId: "todo-app-2411f",
    storageBucket: "todo-app-2411f.appspot.com",
    messagingSenderId: "213722828277"
  };
  firebase.initializeApp(config);

export function fetchingDataAction(){
  
}

export function addTodoAction(allTodos){
    // console.log('action',allTodos)
    
    return dispatch => {
            dispatch({type: ActionTypes.ADDTODO, payload: allTodos})
    }
}
// export function deleteTodoAction(){
//   return dispatch => {
//     dispatch({type: ActionTypes.DELETETODO, payload: allTodos})
//   }
// }