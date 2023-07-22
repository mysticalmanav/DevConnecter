import React,{useEffect,Fragment} from "react";
import PropTypes from "prop-types";
import { getGithubRepos } from "../../actions/profile";
import {connect} from 'react-redux'
const GithubRepos = ({username,repos,getGithubRepos}) => {
  useEffect(()=>{
    getGithubRepos(username);
  },[username])
  if(repos.length==0){
    getGithubRepos(username);

  }
  const Repos = repos.map((repo)=>(
    <div class="repo bg-white p-1 my-1">
    <div>
      <h4><a href={repo.html_url} target="_blank"
          rel="noopener noreferrer">{repo.name}</a></h4> 
      <p>
        {repo.description}
      </p>
    </div>
    <div>
      <ul>
        <li class="badge badge-primary">Stars: {repo.stargazers_count}</li>
        <li class="badge badge-dark">Watchers: {repo.watchers}</li>
        <li class="badge badge-light">Forks: {repo.forks}</li>
      </ul>
    </div>
  </div>
  ))


  return <Fragment> <div class="profile-github">
          <h2 class="text-primary my-1">
            <i class="fab fa-github"></i> Github Repos
          </h2>
         
         {Repos}
        </div>
      </Fragment>;
};

GithubRepos.propTypes = {
    getGithubRepos:PropTypes.func.isRequired,
    repos:PropTypes.array.isRequired
};
const mapStateToProps= state=>({
    repos:state.profile.repos
})



export default connect(mapStateToProps,{getGithubRepos})(GithubRepos);
