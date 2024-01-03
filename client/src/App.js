import React, { Fragment,useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/layout/Navbar";
 
import Login from "./components/auth/login";

import Register from "./components/auth/Register";
import Alert from "./components/layout/Alert";
//redux
import Landing from "./components/layout/Landing";
import { loadUser } from "./actions/auth";
import { Provider } from "react-redux";
import PrivateRoute from "./components/routing/PrivateRoute";
import store from "./store";
import setAuthToken from "./utils/setAuthToken";
import Dashboard from "./components/dashboard/Dashboard";
import CreateProfile from "./components/Profile-forms/CreateProfile";
import EditProfile from "./components/Profile-forms/EditProfile"
import  AddEducation  from "./components/Profile-forms/AddEducation";
import  AddExperience  from "./components/Profile-forms/AddExperience";
import Profiles from "./components/developers/Profiles"
import Profile from "./components/developers/Profile";
import Posts from "./components/Posts/Posts";
import PostDiscussion from "./components/Posts/PostDiscussion";
if(localStorage.token){
   setAuthToken(localStorage.token); 
  
}
const App = () => {
   useEffect(()=>{
      store.dispatch(loadUser());
  
   

   },[localStorage.token])
  return (
    <Provider store={store}>
      <Router>
        <Fragment> 
          <Navbar />
       
          
        
            <Routes>
            <Route path="/" element={<Landing />} />

            </Routes>
            <div className="container">
          <Alert/>

            <Routes>
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/profiles" element={<Profiles />} />
              <Route path="/profile/:id" element={<Profile />} />
              <Route path= "/dashboard" element={<PrivateRoute><Dashboard/></PrivateRoute>}/>
              <Route path= "/create-profile" element={<PrivateRoute><CreateProfile/></PrivateRoute>}/>
              <Route path= "/Edit-profile" element={<PrivateRoute><EditProfile/></PrivateRoute>}/>
              <Route path= "/add-education" element={<PrivateRoute><AddEducation/></PrivateRoute>}/>
              <Route path= "/posts" element={<PrivateRoute><Posts/></PrivateRoute>}/>
              <Route path= "/add-experience" element={<PrivateRoute><AddExperience/></PrivateRoute>}/>
              <Route path= "/posts/:id" element={<PrivateRoute><PostDiscussion/></PrivateRoute>}/>

              </Routes>
          </div>
            
            
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
