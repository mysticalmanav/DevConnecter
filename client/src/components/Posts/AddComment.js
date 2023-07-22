import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useState } from "react";
import { addComment } from "../../actions/post";
const AddComment = ({post_id,addComment}) => {
  const [formdata,setformdata] = useState({
    text:""  });
  const onChange= (e)=>setformdata({...formdata,[e.target.name]:e.target.value})

  const onSubmit= (e)=>{
    e.preventDefault();
    addComment(formdata,post_id);
  }
  const {text}  = formdata;
  return <div class="post-form">
  <div class="bg-primary p">
    <h3>Leave A Comment</h3>
  </div>
  <form class="form my-1" onSubmit={(e)=>onSubmit(e)}>
    <textarea
      name="text"
      cols="30"
      rows="5"
      placeholder="Comment on this post"
      value={text}
      onChange={(e)=>onChange(e)}
      required
    ></textarea>
    <input type="submit" class="btn btn-dark my-1" value="Submit" />
  </form>
</div>;
};

AddComment.propTypes = {
    addComment:PropTypes.func.isRequired
};

export default connect(null,{addComment})(AddComment);
