import { POST_ERROR,GET_POSTS ,UPDATE_LIKES, GET_POST} from "../actions/types"
const initialState= {
    posts:[],
    post:null,
    loading:true,
    error:{}
}

export default function(state=initialState,action){
const {type,payload}  = action;
switch (type) {
    case GET_POSTS:
       return ({
        ...state,
        posts:payload,
        loading:false}  
       )
     case POST_ERROR:
        return({
            ...state,
            loading:false,
            error:payload})
     case UPDATE_LIKES:
        return{
            ...state, 
            posts:state.posts.map((post)=>(
                post._id===payload.id?{...post,like:payload.likes}:{...post}
            )),
            loading:false,
        };

     case GET_POST:
        return{
            ...state, 
            post:payload, 
            loading:false
        };

    default:
        return({
            ...state
        })
       
}
}
