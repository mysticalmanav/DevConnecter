import React, { useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../actions/profile";
import setAuthToken from "../../utils/setAuthToken";
import Spinner from "../layout/Spinner";
import { loadUser } from "../../actions/auth";
import {Link} from 'react-router-dom'
import DashBoardActions from './DashBoardActions'
import Experience from './Experience'
import Education from './Education'
import { DeleteProfile } from "../../actions/auth";
const Dashboard = ({
  loadUser,
  getCurrentProfile,
  auth: { user },
  profile: { profile, loading },
  setAuthToken,
  DeleteProfile
}) => {
  useEffect(() => {
    loadUser();
    getCurrentProfile();
    
  }, []);
  return loading && profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className="large text-primary"> Dashboard</h1>
      <p className="lead">
        <i className="fas fa-user" />{"  "}
        Welcome {user && user.name}
      </p>

      {profile!==null?
      <Fragment>
        <DashBoardActions/>
        <Experience />
        <Education />
       
      </Fragment>:
      <Fragment>
        <p>You have not yet setup a profile, please add some info</p>
        <Link to="/create-profile" className="btn btn-primary my-1">Create Profile</Link>
        </Fragment>}
        <div class="my-2">
            <button class="btn btn-danger" onClick={()=>{DeleteProfile()}}>
                <i class="fas fa-user-minus"></i>

                Delete My Account
            </button>
          </div>
    </Fragment>

  );
};
Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  loadUser:PropTypes.func.isRequired,
  
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  DeleteProfile:PropTypes.func.isRequired
  
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile
});
export default connect(mapStateToProps, { getCurrentProfile,loadUser, setAuthToken,DeleteProfile })(
  Dashboard
);
