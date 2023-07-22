import React,{Fragment,useEffect} from "react";
import PropTypes from "prop-types";
import { getProfileById } from "../../actions/profile";
import {connect} from 'react-redux'
import Spinner from "../layout/Spinner";
import { useParams,Link } from "react-router-dom";
import ProfileTop from "./ProfileTop";
import { ProfileAbout } from "./ProfileAbout";
import { ProfileEducation } from "./ProfileEducation";
import { ProfileExperience } from "./ProfileExperience";
import GithubRepos from "./GithubRepos";

const Profile = ({getProfileById,profile:{profile,loading,error},auth,match}) => {
    const {id}= useParams();
   
    useEffect(()=>{ 
       
        getProfileById(id); 
    },[profile,getProfileById,loading,id,error]);
   

  return (
    loading||(profile===null)?(<Spinner/>):
    (<Fragment>
    <Link to="/profiles" class="btn btn-light">Back To Profiles</Link>
    {auth.isAuthenticated&&auth.loading===false&&auth._id===profile.user._id&&(<Link to='/edit-profile' className="btn btn-dark">Edit Profile</Link>)}
    <div class="profile-grid my-1"> 
    <ProfileTop profile= {profile}/>
    <ProfileAbout profile= {profile}/> 
    
   {profile.experience.length>0 ?  <ProfileExperience experience={profile.experience}/>:<h4 className>No experience Credentials</h4>}

   {profile.education===0?'':     <ProfileEducation education={profile.education}/>}
   
   {profile.githubusername===null?'': <GithubRepos username = {profile.githubusername}/>}
    
    </div> 
    </Fragment>)
  ) 
};

Profile.propTypes = {
    getProfileById:PropTypes.func.isRequired,
    profile:PropTypes.object.isRequired,
    auth:PropTypes.object.isRequired
    
}; 
const mapStateToProps= state=>({
    profile:state.profile,
    auth:state.auth
    
})
  
export default connect(mapStateToProps,{getProfileById})(Profile);
