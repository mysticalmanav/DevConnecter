import axios from 'axios'
import {setAlert} from './alert'
import {
    AUTH_ERROR,
    GET_PROFILE,PROFILE_ERROR,CLEAR_PROFILE,GET_PROFILES,GET_REPOS} from './types'

     

export const getCurrentProfile = ()=> async dispatch =>{
    try {
        const res = await axios.get('/api/profile/me');
        dispatch({
         type:GET_PROFILE,
         payload:res.data
        })
    } catch (err) {  
        dispatch({
            type:PROFILE_ERROR,
            payload:{msg:err.response.statusText,status:err.response.status}
        })
    }
}
//Get profile by id
export const getProfileById = (id)=> async dispatch =>{
    try {
        const res = await axios.get(`/api/profile/user/${id}`);
        dispatch({
         type:GET_PROFILE,
         payload:res.data
        })
        
    } catch (err) {  
        dispatch({
            type:PROFILE_ERROR,
            payload:{msg:err.response.statusText,status:err.response.status}
        })
    }
}
//get all profles
export const getProfiles = ()=> async dispatch =>{
    dispatch({
        type:CLEAR_PROFILE
    })
    try {
        const res = await axios.get('/api/profile');
        
        dispatch({
         type:GET_PROFILES,
         payload:res.data
        })
    } catch (err) {  
        dispatch({
            type:PROFILE_ERROR,
            payload:{msg:err.response.statusText,status:err.response.status}
        })
    }
}
//get github repos
export const getGithubRepos = (username)=> async dispatch =>{
    
    try {
        const res = await axios.get(`/api/profile/github/${username}`);
        
        dispatch({
         type:GET_REPOS,
         payload:res.data
        })
    } catch (err) {  
        dispatch({
            type:PROFILE_ERROR,
            payload:{msg:err.response.statusText,status:err.response.status}
        })
    }
}
//create or update a profile
export const createprofile=(formdata,edit=false)=>async dispatch=>{
   
try {  
    const config = {
        headers:{ 
            'Content-Type':'application/json'
        }
    }
    const res= await axios.post('/api/profile',formdata,config);
    dispatch({
        type:GET_PROFILE,
        payload:res.data
       })
    dispatch(setAlert(edit?'Profile updated':'Profile created','success'))
   
} catch (err) {
    if (err) {
        if (Array.isArray(err.response.data.errors)) {
            err.response.data.errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
          } else {
            console.error("errors is not an array");
       
             
          }
        
      
    }
    dispatch({
        type:PROFILE_ERROR,
        payload:{msg:err.response.statusText,status:err.response.status}
    })
}
}
//add education
export const addEducation=(formdata)=>async dispatch=>{
   
try { 
    const config = {
        headers:{ 
            'Content-Type':'application/json'
        }
    }
    const res= await axios.put('/api/profile/education',formdata,config);
    dispatch({
        type:GET_PROFILE,
        payload:res.data
       })
    dispatch(setAlert('Education added','success'))
   
} catch (err) {
    if (err) {
        if (Array.isArray(err.response.data.errors)) {
            err.response.data.errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
          } else {
            console.error("errors is not an array");
       
             
          }
       
    }
    dispatch({
        type:PROFILE_ERROR,
        payload:{msg:err.response.statusText,status:err.response.status}
    })
}
}
//add experience
export const addExperience=(formdata)=>async dispatch=>{
   
try { 
    const config = {
        headers:{ 
            'Content-Type':'application/json'
        }
    }
    const res= await axios.put('/api/profile/experience',formdata,config);
    dispatch({
        type:GET_PROFILE,
        payload:res.data
       })
    dispatch(setAlert('Experience added','success'))
   
} catch (err) {
    if (err) {
        if (Array.isArray(err.response.data.errors)) {
            err.response.data.errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
          } else {
            console.error("errors is not an array");
       
             
          }
        
       
    }
    dispatch({
        type:PROFILE_ERROR,
        payload:{msg:err.response.statusText,status:err.response.status}
    })
}
}
 export const DeleteEducation= (id)=>async dispatch=>{
   try {
    const res= await axios.delete(`/api/profile/education/${id}`);
    
    dispatch({
        type:GET_PROFILE,
        payload:res.data
       })
    dispatch(setAlert('Education deleted','success'))
   
} catch (err) {
    if (err) {
        if (Array.isArray(err.response.data.errors)) {
            err.response.data.errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
          } else {
            console.error("errors is not an array");
       
             
          }
        
       
    }}}
 export const DeleteExperience= (id)=>async dispatch=>{
   try {
    const res= await axios.delete(`/api/profile/experience/${id}`);
    
    dispatch({
        type:GET_PROFILE,
        payload:res.data
       })
    dispatch(setAlert('Experience deleted','success'))
   
} catch (err) {
    if (err) {
        if (Array.isArray(err.response.data.errors)) {
            err.response.data.errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
          } else {
            console.error("errors is not an array");
       
             
          }
        
       
    }}}
 