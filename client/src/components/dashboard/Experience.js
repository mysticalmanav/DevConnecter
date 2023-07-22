import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Moment from 'react-moment'
import {connect} from 'react-redux'

import { DeleteExperience } from "../../actions/profile";
const Experience = ({experience,DeleteExperience}) => {
    let experiences='';
    if(experience){
     experiences  = experience.map((exp)=>(
        <tr key={exp._id}>
            <td>{exp.company}</td>
            <td class="hide-sm">{exp.title}</td>
            <td class="hide-sm">
             <Moment format='YYYY/MM/DD'>{exp.from}</Moment> - {' '}
               { exp.to===null?('Now'):(<Moment format= 'YYYY/MM/DD'>{exp.to}</Moment>)
             }
            </td>
            <td>
              <button class="btn btn-danger" onClick={()=>DeleteExperience(exp._id)}>
                Delete
              </button>
            </td>
          </tr>
          
    ))}
  return( 
    <Fragment>
    <h2 className="my-2">Experience Credentials</h2>
  <table className="table">
  <thead>
    <tr>
      <th>Company</th>
      <th className="hide-sm">Title</th>
      <th className="hide-sm">Years</th>
      <th></th>
    </tr>
  </thead>
  <tbody>
     {experiences}
    </tbody>
    </table>
    </Fragment>)
};

Experience.propTypes = {
  experience:PropTypes.array.isRequired
  ,
    DeleteExperience:PropTypes.func.isRequired
    
    
};
const mapStateToProps=state=>({
    experience : state.profile.profile.experience
}
)
 
export default connect(mapStateToProps,{DeleteExperience})(Experience); 
 