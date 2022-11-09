import logo from './assets/CIEE_Logo.jpg';
import './App.css';
import Homepage from './pages/Homepage.js'
import ThingsToDo from "./pages/ThingsToDo.js";
import UsingServices from "./pages/UsingServices.js";
import React from 'react';
import {BrowserRouter, Routes, Route, Link} from "react-router-dom";
import AdminPanel from "./pages/AdminPanel.js";

function App() {
  return (
      <BrowserRouter>
          <div className="App">
              <Link to="/"><img src={logo} alt={"Logo"} className="ciee-logo"/></Link>
              <Routes>
                  <Route path="/" element={<Homepage/>} />
                  <Route path="/things-to-do" element={<ThingsToDo />} />
                  <Route path="/using-services" element={<UsingServices />} />
                  <Route path="/admin-panel" element={<AdminPanel />} />
              </Routes>
          </div>
      </BrowserRouter>
  );
}

export default App;
