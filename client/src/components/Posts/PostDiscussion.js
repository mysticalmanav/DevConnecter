import React,{Fragment,useEffect} from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getPostById } from "../../actions/post";
import { useParams ,Link} from "react-router-dom";
import Spinner from "../layout/Spinner";
import AddComment from "./AddComment";
import Comments from "./Comments";

const PostDiscussion = ({getPostById,post:{post,loading}}) => {

  const {id} = useParams();
 
  useEffect(()=>{
    getPostById(id);
  },[])
  
  return (loading||post===null?<Spinner/>:<Fragment>
    <Link to="/posts" class="btn">Back To Posts</Link>
      <div class="post bg-white p-1 my-1">
        <div>
          <Link to={`/profile/${post.user}`}>
            <img
              class="round-img"
              src={post.avatar} 
              alt=""
            />
            <h4>{post.name}</h4>
          </Link>
        </div> 
        <div>
          <p class="my-1">
           {post.text}
          </p>
        </div>
      </div>
      <AddComment post_id={post._id}/>
      {post.comment.length!==null&&post.comment.length > 0 ?<Comments id={post._id} comments = {post.comment}/>:<h4 className="text-primary">No discussion statrted ,Add a comment to start a discussion</h4>}
  </Fragment>);
}

PostDiscussion.propTypes = {
    getPostById:PropTypes.func.isRequired,
    post:PropTypes.object.isRequired
    
}
const mapStateToProps=state=>({
    post :state.post
})

export default connect(mapStateToProps,{getPostById})(PostDiscussion);

