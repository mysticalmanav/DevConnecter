import React,{useState} from "react";
import PropTypes from "prop-types";
import { addPost } from "../../actions/post";
import { connect } from "react-redux";
const CreatePost = ({addPost}) => {
    const [formdata,setformdata] = useState({
        text:""  });
      const onChange= (e)=>setformdata({...formdata,[e.target.name]:e.target.value})
    
      
      const {text}  = formdata;
    const onSubmit = (e)=>{

        e.preventDefault();
        addPost(formdata);
    }
  return <div>
    <p class="lead"><i class="fas fa-user"></i> Welcome to the community!</p>

  <div class="post-form">
    <div class="bg-primary p">
      <h3>Say Something...</h3>
    </div>
    <form class="form my-1" onSubmit={(e)=>onSubmit(e)}>
      <textarea
        name="text"
        cols="30"
        rows="5"
        placeholder="Create a post"
        required
        value={text}
        onChange={(e)=>onChange(e)}
      ></textarea>
      <input type="submit" class="btn btn-dark my-1" value="Submit" />
    </form>
  </div></div>;
};

CreatePost.propTypes = {
    addPost:PropTypes.func.isRequired
    
};

export default connect(null,{addPost}) (CreatePost);
