import React from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";
import {Link} from 'react-router-dom'
import {connect}from 'react-redux'
import { LikePost,UnlikePost,deletePost } from "../../actions/post";
const post = ({post,auth,LikePost,UnlikePost,deletePost}) => {
    const {name,avatar,date,text,like,comment,user,_id} = post;
  return (
    <div class="post bg-white p-1 my-1">
          <div>
            <Link to={`/profile/${user}`}>
              <img
                class="round-img"
                src={avatar}
                alt=""
              />
              <h4>{name}</h4> 
            </Link>
          </div>
          <div>
            <p class="my-1">
             {text}
            </p>
             <p class="post-date">
                Posted on <Moment format='DD/MM/YYYY'>{date}</Moment>
            </p>
            <button type="button" class="btn btn-light" onClick={()=>LikePost(_id)}>
              <i class="fas fa-thumbs-up"></i>
              <span> {like.length}</span>
            </button>
            <button type="button" class="btn btn-light" onClick={()=>UnlikePost(_id)}>
              <i class="fas fa-thumbs-down"></i>
            </button>
            <Link to={`/posts/${_id}`} class="btn btn-primary">
              Discussion <span class='comment-count'> {comment.length}</span>
            </Link>
           {!auth.loading&&auth._id===user&&( <button      
            type="button"
            class="btn btn-danger"
            onClick={()=>deletePost(_id)}
          >
            <i class="fas fa-times"></i>
          </button>)}
          </div>
        </div>
  );
};

post.propTypes = {
  auth:PropTypes.object.isRequired,
  post:PropTypes.object.isRequired,
  UnlikePost:PropTypes.func.isRequired
  ,
  LikePost:PropTypes.func.isRequired,
  deletePost:PropTypes.func.isRequired
  
  
};
const mapStateToProps=state=>({
  auth:state.auth
})

export default connect(mapStateToProps,{LikePost,UnlikePost,deletePost})(post);
