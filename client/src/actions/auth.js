import axios from 'axios';
import { REGISTER_FAIL, REGISTER_SUCCESS,USER_LOADED,AUTH_ERROR ,LOGIN_FAIL,LOGIN_SUCCESS,LOGOUT,CLEAR_PROFILE} from './types';
import { setAlert } from "../actions/alert";
import setAuthToken from '../utils/setAuthToken';
//load a user
export const loadUser =  ()=>async dispatch =>{
   
    
        setAuthToken(localStorage.token);
    
    try{
        const res = await axios.get('/api/auth');
        dispatch({
            type:USER_LOADED,
            payload:res.data
        });
    }
    catch(err){
        dispatch({
            type: AUTH_ERROR
        })
    }
}
//Register a User
export const register = ({ name, email, password }) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({ name, email, password });
    try {
        const res = await axios.post('api/users', body, config);
        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        });

    }
    catch (error) {
        const errors = error.response.data.errors;
        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type: REGISTER_FAIL
        })
    }
}
//login user
export const login = ({ email, password }) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({  email, password });
    try {
        const res = await axios.post('api/auth', body, config);
        
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        });
       

    }
    catch (error) {
        const errors = error.response.data.errors;
        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type: LOGIN_FAIL
        })
    }
}
//LOGOUT
export const logout =()=>dispatch=>{
    dispatch({
        type:CLEAR_PROFILE
    
    })
    dispatch({
        type:LOGOUT
    
    })
   
}
export const DeleteProfile= ()=>async dispatch=>{
    try {
     const res= await axios.delete(`/api/profile`);
     
     dispatch({
         type:AUTH_ERROR
      
        })
     dispatch(setAlert('User deleted','danger'))
    
    
 } catch (errors) {
     if (errors) {
         if (Array.isArray(errors)) {
             errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
           } else {
             console.error("errors is not an array");
              
           }
         
        
     }}}
     