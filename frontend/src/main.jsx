import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Submit from './pages/Submit';
import Login from './pages/Login';
import Register from './pages/Register';
import Forgot from './pages/Forgot';
import Reset from './pages/Reset';
import Admin from './pages/Admin';

function App(){
  return (<BrowserRouter>
    <div style={{maxWidth:900,margin:'20px auto',fontFamily:'Arial,Helvetica,sans-serif'}}>
      <header style={{display:'flex',gap:12,alignItems:'center'}}>
        <h2>Directory Submission</h2>
        <nav style={{marginLeft:'auto'}}>
          <Link to="/">Home</Link> | <Link to="/submit">Submit</Link> | <Link to="/admin">Admin</Link>
        </nav>
      </header>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/submit" element={<Submit/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/forgot" element={<Forgot/>} />
        <Route path="/reset-password" element={<Reset/>} />
        <Route path="/admin" element={<Admin/>} />
      </Routes>
    </div>
  </BrowserRouter>);
}

createRoot(document.getElementById('root')).render(<App />);
