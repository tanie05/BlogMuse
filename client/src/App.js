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
import ProtectedRoute from "./components/ProtectedRoute";

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
       <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>}/>
       <Route path="/create" element={<ProtectedRoute><CreatePost /></ProtectedRoute>}/>
       <Route path="/update" element={<ProtectedRoute><UpdatingUser/></ProtectedRoute>} />
       <Route path="/userprofile" element={<OtherUsersProfile/>}/>
       <Route path="/post/:id" element={<ProtectedRoute><SinglePost /></ProtectedRoute>}/>
       <Route path="/:id" element={<ProtectedRoute><SinglePost /></ProtectedRoute>}/>

      </Routes>
      </Router>
    </UserContextProvider>
  );
}

export default App;
