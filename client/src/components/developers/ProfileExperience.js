import React,{Fragment} from "react";
import Moment from 'react-moment'
export const ProfileExperience = ({experience}) => {
    const experiences = experience.map((exp)=>(
        <div>
        <h3 class="text-dark">{exp.company}</h3>
        <p> <Moment format='YYYY/MM/DD'>{exp.from}</Moment> - {' '}
               { exp.to===null?('Now'):(<Moment format= 'YYYY/MM/DD'>{exp.to}</Moment>)
             }</p>
        <p><strong>Position: </strong>{exp.title}</p>
        <p>
        <strong>Description: </strong> {exp.description!==undefined&&exp.description.length>0? ( exp.description):'There is no description availaible'}
        </p>
      </div>
    ))
  return <Fragment>
    <div class="profile-exp bg-white p-2">
  <h2 class="text-primary">Experience</h2>
 
 {experiences}
</div></Fragment>;
};
