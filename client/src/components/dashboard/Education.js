import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Moment from 'react-moment'
import {connect} from 'react-redux'
import {DeleteEducation} from '../../actions/profile'


let educations='';
const Education = ({education,DeleteEducation}) => {
    if(education){
     educations  = education.map((edu)=>(
        <tr key={edu._id}>
            <td>{edu.school}</td>
            <td class="hide-sm">{edu.degree}</td>
            <td class="hide-sm">
             <Moment format='YYYY/MM/DD'>{edu.from}</Moment> - {' '}
               { edu.to===null?('Now'):(<Moment format= 'YYYY/MM/DD'>{edu.to}</Moment>)
             }
            </td>
            <td>
              <button class="btn btn-danger" onClick={()=>DeleteEducation(edu._id)}>
                Delete
              </button>
            </td>
          </tr>
    
    ))}
    else{
         educations = '';
    }
  return( 
    <Fragment>
    <h2 className="my-2">Education Credentials</h2>
  <table className="table">
  <thead>
    <tr>
      <th>School</th>
      <th className="hide-sm">Degree</th>
      <th className="hide-sm">Years</th>
      <th></th>
    </tr>
  </thead>
  <tbody>
     {educations}
    </tbody>
    </table>
    </Fragment>)
};

Education.propTypes = {
  education:PropTypes.array.isRequired,
  DeleteEducation:PropTypes.func.isRequired
  
  
    
    
};
const mapStateToProps=state=>({
    education : state.profile.profile.education
}
)
 
export default connect(mapStateToProps,{DeleteEducation})(Education); 
 