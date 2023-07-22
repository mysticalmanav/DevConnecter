import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addExperience } from "../../actions/profile";
import {useNavigate,Link } from "react-router-dom";

 const AddExperience = ({addExperience}) => {
    const navigate = useNavigate();
  const [formdata, setformdata] = useState({
    title:"", company:"", location:"", from:"", to:"", current:false, description :""
  });
  const {  title, company, location, from, to, current, description  } =
    formdata;
  const onChange = (e) => {
    setformdata({ ...formdata, [e.target.name]: e.target.value });
  };
  const onCheck = (e)=>{
    
        setformdata({ ...formdata, [e.target.name]: e.target.checked });
    
  }

  const onSubmit = (e) => {
    e.preventDefault();
    addExperience(formdata);
    navigate("/dashboard");
  };
  return (
    <div>
     <h1 className="large text-primary">
       Add An Experience
      </h1>
      <p className="lead">
        <i className="fas fa-code-branch"></i> Add any developer/programming
        positions that you have had in the past
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit={(e)=>onSubmit(e)}>
        <div className="form-group" >
          <input type="text" placeholder="* Job Title" name="title" required value={title} onChange={(e)=>onChange(e)} />
        </div>
        <div className="form-group">
          <input type="text" placeholder="* Company" name="company" value={company} onChange={(e)=>onChange(e)} required />
        </div>
        <div className="form-group">
          <input type="text" placeholder="Location" name="location" value={location} onChange={(e)=>onChange(e)}/>
        </div>
        <div className="form-group">
          <h4>From Date</h4>
          <input type="date" name="from" value={from} onChange={(e)=>onChange(e)} />
        </div>
         <div className="form-group">
          <p><input type="checkbox" name="current" value="" onChange={(e)=>onCheck(e)}/> Current Job</p>
        </div>
        <div className="form-group">
          <h4>To Date</h4>
          <input type="date" name="to" value={to} onChange={(e)=>onChange(e)}/>
        </div>
        <div className="form-group">
          <textarea
            name="description"
            cols="30"
            rows="5"
            placeholder="Job Description"
            value={description} onChange={(e)=>onChange(e)}
          ></textarea>
        </div>
        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">Go Back</Link>
      </form>
    </div>
  );
};
 AddExperience.propTypes={
    addExperience:PropTypes.func.isRequired
    
}
export default connect(null,{addExperience})(AddExperience)
 