import React,{Fragment,useEffect} from "react";
import PropTypes from "prop-types";
import { getProfiles } from "../../actions/profile";
import {connect} from 'react-redux' 
import Spinner from "../layout/Spinner";
import {Link} from 'react-router-dom'
const Profiles = ({getProfiles,profile:{profiles,loading}}) => {
useEffect(()=>{
    getProfiles();
},[getProfiles]);
  const developers  = profiles.map((profile)=>(

<div className="profile bg-light">
          <img
            className="round-img"
            src={profile.user.avatar}
            alt=""
          />
          <div>
            <h2>{profile.user.name}</h2>
            <p>{profile.status}  { profile.company===null? {}:`at ${profile.company}`}</p>
            <p>{profile.location!==null?(profile.location):('')}</p>
            <Link  to={`/profile/${profile.user._id}`} className="btn btn-primary">View Profile</Link> 
          </div>

          <ul>
            {profile.skills.map((skill)=>(
                <li className="text-primary bold">
                <i className="fas fa-solid fa-check"></i> {skill}
              </li>
           ))}
           
           
            
          </ul>
        </div>

  ))
  return (loading?<Spinner/>:<Fragment>
<h1 className="large text-primary">Developers</h1>
      <p className="lead">
        <i className="fab fa-connectdevelop"></i> Browse and connect with developers
      </p>
      <div className="profiles">
        {developers}
        </div>
  </Fragment>);
};


Profiles.propTypes = {
    getProfiles:PropTypes.func.isRequired,
    profile:PropTypes.object.isRequired
    
};
const mapStateToProps= state=>({
    profile:state.profile
})

export default connect(mapStateToProps,{getProfiles})(Profiles);
 