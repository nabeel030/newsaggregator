import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import ArticleList from './Components/ArticleList';
import Login from './Pages/Auth/Login';
import Register from './Pages/Auth/Register';
import Header from './Components/Header';  
import PreferencesForm from './Pages/PreferencesForm';
import { isAuthenticated } from './helpers';


function App() {  
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<ArticleList home={true} />} />
          <Route path="/personalised-news" element={<ArticleList home={false} />} />
          <Route path="/preferences" element={!isAuthenticated() ? <Navigate to="/" /> : <PreferencesForm />} />
          <Route path="/login" element={isAuthenticated() ? <Navigate to="/" /> : <Login />} />
          <Route path="/register" element={isAuthenticated() ? <Navigate to="/" /> : <Register />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
