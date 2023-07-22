import React,{Fragment,useEffect} from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getPosts } from "../../actions/post";
import Spinner from "../layout/Spinner";
import CreatePost from "./CreatePost";
import Post from "./SinglePost";
import AddComment from "./AddComment";
import Comments from "./Comments";
const Posts = ({getPosts,post:{posts,loading}}) => {
  useEffect(()=>{
    getPosts();
  },[]);
  return(loading||posts==null?<Spinner/>:<Fragment>
    <CreatePost />
    <div class="posts">
    {posts.length!==null&&posts.length>0?posts.map((post)=>(<Post post= {post}/>)):''}
    </div>
  </Fragment>)
};

Posts.propTypes = {
  getPosts:PropTypes.func.isRequired,
  post:PropTypes.object.isRequired
  
  
};
const mapStateToProps= state=>({
  post:state.post 
})

export default  connect(mapStateToProps,{getPosts})(Posts);
