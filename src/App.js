import logo from './assets/CIEE_Logo.jpg';
import './App.css';
import Homepage from './pages/Homepage/Homepage.js'
import React from 'react';
import {BrowserRouter, Routes, Route, Link} from "react-router-dom";

import { AdminPanel, ViewPosts, DetailedPost } from "./pages";
import { NewPost, EditPost } from "./components";

function App() {

  return (
      <BrowserRouter>
          <div className="App">
              <Link to="/"><img src={logo} alt={"Logo"} className="ciee-logo"/></Link>
              <Routes>
                  <Route path="/" element={<Homepage/>} />
                  <Route path="view-posts/:postType" element={<ViewPosts />}/>
                  <Route path="/admin-panel" element={<AdminPanel />} />
                  <Route path="/newPost/:postType" element={<NewPost />}/>
                  <Route path="/editPost/:id" element={<EditPost />}/>
                  <Route path="/post/:id" element={<DetailedPost />}/>
              </Routes>
          </div>
      </BrowserRouter>
  );
}

export default App;
