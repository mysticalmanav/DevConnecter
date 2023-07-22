import React,{Fragment} from "react";

export const ProfileAbout = ({profile}) => {
    const {user,bio,skills} = profile;
    const skillset = skills.map((skill)=>(
        <div class="p-1"><i class="fa fa-check"></i> {skill}</div>
   ))
  return <Fragment>
    <div class="profile-about bg-light p-2">
          <h2 class="text-primary">{`${user.name}'s bio`}</h2>
          <p>
            {bio}
          </p>
          <div class="line"></div>
          <h2 class="text-primary">Skill Set</h2>
          <div class="skills text-primary">
            
          {skillset}
          </div>
        </div>
  </Fragment>;
};
