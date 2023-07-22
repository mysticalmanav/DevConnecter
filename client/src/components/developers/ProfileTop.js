import React,{Fragment} from "react";

const ProfileTop = ({profile}) => {
    const {name,company,status,avatar,social,website,location,user} = profile;
    let ownwebsite = '';
    if(website){
        ownwebsite= <a href={ownwebsite} target="_blank" rel="opener referrer">
        <i class="fas fa-globe fa-2x"></i>
      </a>
    }
   
  
  return (<Fragment>
    <div class="profile-top bg-primary p-2">
          <img
            class="round-img my-1"
            src={user.avatar}
            alt=""
          />
          <h1 class="large">{user.name}</h1>
          <p class="lead">{status } { company===null? {}:`at ${company}`}</p>
          <p>{location}</p>
          <div class="icons my-1">
            
          {ownwebsite}
        {social.twitter==null?'': <a href={social.twitter} target="_blank" rel="noopener noreferrer">
              <i class="fab fa-twitter fa-2x"></i>
            </a>}
            {social.facebook==null?'': <a href={social.facebook} target="_blank" rel="noopener noreferrer">
              <i class="fab fa-facebook fa-2x"></i>
            </a>}
            {social.linkedin==null?'': <a href={social.linkedin} target="_blank" rel="noopener noreferrer">
              <i class="fab fa-linkedin fa-2x"></i>
            </a>}
            {social.youtube==null?'': <a href={social.youtube} target="_blank" rel="noopener noreferrer">
              <i class="fab fa-youtube fa-2x"></i>
            </a>}
            {social.instagram==null?'': <a href={social.instagram} target="_blank" rel="noopener noreferrer">
              <i class="fab fa-instagram fa-2x"></i>
            </a>}
          </div>
        </div>

  </Fragment>);
};
export default ProfileTop
