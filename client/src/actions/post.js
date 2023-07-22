import axios from 'axios'
import { GET_POSTS,POST_ERROR,UPDATE_LIKES,GET_POST } from './types'
import { setAlert } from './alert';
export const getPosts=()=>async dispatch=>{
try {
    const res = await axios.get('/api/posts');
    dispatch({
        type:GET_POSTS,
        payload:res.data
    })
    
} catch (err) {
    if(err){
        dispatch(
            {
                type:POST_ERROR,
                payload:{msg:err.response.statusText,status:err.response.status}
            }
        )
    }
}
}

//create a post
export const addPost=(formdata)=>async dispatch=>{
   
    try {  
        const config = {
            headers:{ 
                'Content-Type':'application/json'
            }
        }
        const res= await axios.post(`/api/posts`,formdata,config);
        dispatch({
            type:GET_POSTS,
            payload:res.data
           })
        dispatch(setAlert('Post Created','success'))
       
    } catch (err) {
        if (err) {
            if (Array.isArray(err.response.data.errors)) {
                err.response.data.errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
              } else {
                console.error("errors is not an array");
           
                 
              }
            
          
        }
        dispatch({
            type:POST_ERROR,
            payload:{msg:err.response.statusText,status:err.response.status}
        })
    }
    }
export const deletePost = (id)=> async dispatch =>{
    try{
        const res = await axios.delete(`/api/posts/${id}`);
        dispatch({
            type:GET_POSTS,
            payload:res.data
        })
        dispatch(setAlert('Post Deleted','warning'))

    }
    catch(err){
        if (Array.isArray(err.response.data.errors)) {
            err.response.data.errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
          } else {
            console.error("errors is not an array");
       
             
          }
    }
}
export const LikePost =(id)=>async dispatch =>{
    try {
        const res = await axios.put(`/api/posts/like/${id}`);
        dispatch({
            type: UPDATE_LIKES,
            payload:res.data
            
        })
    } catch (err) {
       
        if (Array.isArray(err.response.data.errors)) {
            err.response.data.errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
          } else {
            console.error("errors is not an array");
       
             
          }
    }
}
export const UnlikePost =(id)=>async dispatch =>{
    try {
        const res = await axios.put(`/api/posts/unlike/${id}`);
        dispatch({
            type: UPDATE_LIKES,
            payload:res.data
             
        })
    } catch (err) {
        if (Array.isArray(err.response.data.errors)) {
            err.response.data.errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
          } else {
            console.error("errors is not an array");
       
             
          }
    }
}
//get post
export const getPostById= (id)=>async dispatch=>{
    try {
        const res = await axios.get(`/api/posts/${id}`);
        dispatch({
           type:GET_POST,
           payload:res.data
        })

    } catch (err) {
        dispatch({
           type:POST_ERROR,
           payload:{msg:err.response.statusText,status:err.response.status}
        })
    }
}
//add comment
export const addComment=(formdata,id)=>async dispatch=>{
   
    try {  
        const config = {
            headers:{ 
                'Content-Type':'application/json'
            }
        }
        const res= await axios.post(`/api/posts/comment/${id}`,formdata,config);
        dispatch({
            type:GET_POST,
            payload:res.data
           })
        dispatch(setAlert('Comment added','success'))
       
    } catch (err) {
        if (err) {
            if (Array.isArray(err.response.data.errors)) {
                err.response.data.errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
              } else {
                console.error("errors is not an array");
           
                 
              }
            
          
        }
        dispatch({
            type:POST_ERROR,
            payload:{msg:err.response.statusText,status:err.response.status}
        })
    }
    }
//delete comment
export const deleteComment=(id,comment_id)=>async dispatch=>{
   
    try {  
        
        const res= await axios.delete(`/api/posts/comment/${id}/${comment_id}`);
        dispatch({
            type:GET_POST,
            payload:res.data
           })
        dispatch(setAlert('Comment deleted','primary'))
       
    } catch (err) {
        if (err) {
            if (Array.isArray(err.response.data.errors)) {
                err.response.data.errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
              } else {
                console.error("errors is not an array");
           
                 
              }
            
          
        }
        dispatch({
            type:POST_ERROR,
            payload:{msg:err.response.statusText,status:err.response.status}
        })
    }
    }