import React from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { connect } from "react-redux";
import { deleteComment } from "../../actions/post";
const Comments = ({comments,id,auth,deleteComment}) => {
  const Comment=  comments.map((comment)=>(
    <div class="post bg-white p-1 my-1">
    <div>
      <a href={`/profile/${comment.user}`}>
        <img
          class="round-img"
          src={comment.avatar}
          alt=""
        />
        <h4>{comment.name}</h4>
      </a>
    </div>
    <div>
      <p class="my-1">
        {comment.text}
      </p>
       <p class="post-date">
          Posted on <Moment format = 'DD/MM/YYYY'>{comment.date}</Moment>
      </p>
      {auth._id=== comment.user?<button      
            type="button"
            class="btn btn-danger"
            onClick={()=>deleteComment(id,comment._id)}
          >
            <i class="fas fa-times"></i>
          </button>:('')}
    </div>
  </div>
  ))
  return <div class="comments">
       

      {Comment}
      </div>;
};

Comments.propTypes = {
    auth:PropTypes.object.isRequired,
    comments:PropTypes.array.isRequired,
    deleteComment:PropTypes.func.isRequired
    
    
    
};
const mapStateToProps = state=>({
    auth:state.auth
})

export default connect(mapStateToProps,{deleteComment})(Comments);
