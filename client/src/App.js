import React from "react";
import { UserContextProvider } from "./UserContext";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProfilePage from "./pages/ProfilePage";
import CreatePost from "./pages/CreatePost";
import SinglePost from "./pages/SinglePost";
import OtherUsersProfile from "./pages/OtherUsersProfile";

import "./style.css"
import UpdatingUser from "./pages/UpdatingUser";

function App() {
  return (
    <UserContextProvider>
      <Router>
      <Routes>
       <Route path="/" element={<Home />}/>
       <Route path="/login" element={<Login />}/>
       <Route path="/register" element={<Register />}/>
       <Route path="/profile" element={<ProfilePage />}/>
       <Route path="/create" element={<CreatePost />}/>
       <Route path="/:id" element={<SinglePost />}/>
       <Route path = "/update" element = {<UpdatingUser/>} />
       <Route path = "/userprofile" element = {<OtherUsersProfile/>}/>

      </Routes>
      </Router>
    </UserContextProvider>
  );
}

export default App;
