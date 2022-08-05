import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import path from 'path'
import dotenv from "dotenv";
import './App.css';
import Login from './pages/Login';
import Home from './pages/Home';
import Register from './pages/Register';
import Nav from './components/nav';

// dotenv.config({path: path.resolve(__dirname, '../.env')})

const App = () => {
  const [name, setName] = useState("");

  useEffect(() => {
    (
      async () => {
        const responce = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/user`, {
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
        });

        const content = await responce.json();
        setName(content.name);
      }
    )();
  });

  return (
    <div className="App">
      <BrowserRouter>
        <Nav name={name} setName={setName} />
        <main className="form-signin w-100 m-auto">
          <Routes>
            <Route path="/" element={<Home name={name} />} />
            <Route path="/login" element={<Login setName={setName} />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </main>
      </BrowserRouter>
    </div >
  );
}
export default App;
