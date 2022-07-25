import React, { Component } from "react";
import { BrowserRouter, Navigate, Route,Routes } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";

import { setCurrentUser, logoutUser } from "./actions/authActions";
import { Provider, useSelector } from "react-redux";
import store from "./store";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Dashboard from "./components/dashboard/Dashboard";

import "./App.css";
import Home from "./components/layout/Home";
import Profile from "./components/Profile";
import Answers from "./components/Answers";

//admin Routesimport Login from './components/Login'
import AdminRegister from './components/admin/Register'
import AdminLogin from './components/admin/Login'
import AdminNavbar from './components/admin/Navbar'
import AdminDashboard from './components/admin/Dashboard'
import AdminCategories from './components/admin/admin/Categories'

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());

    // Redirect to login
    window.location.href = "./login";
  }
}


function Wrapper(){
	let user = useSelector((state) => state.user)
	return (
		<div className="App">
					<ToastContainer/>
					<Navbar />
					<Routes>
					<Route exact path="/" element={<Home/> } />
					<Route exact path="/admin" element={<Landing/> } />
					<Route exact path="/register" element={<Register/> } />
					<Route exact path="/login" element={<Login/> } />
					<Route exact path="/profile" element={<Profile/> } />
					<Route exact path="/questions/:question/answers" element={<Answers/> } />
					<Route exact path="/dashboard" element={<Dashboard/> } />
					<Route exact path='/' element={user?.role === 'admin' ? <Navigate to='/admin/dashboard' /> : <Login />} />
					<Route exact path='/admin/dashboard' element={user ? <AdminDashboard /> : <AdminLogin />} />
					<Route exact path='/admin/login' element={user?.role === 'admin' ? <Navigate to='/admin/dashboard' /> : <AdminLogin />} />
					<Route exact path='/admin/register' element={user?.role === 'admin' ? <AdminDashboard /> : <AdminRegister />} />
					<Route exact path='/admin/categories' element={user?.role === 'admin' ? <AdminCategories /> : <AdminLogin />} />
					</Routes>
				</div>
	)
}
function App () {
	

	return (
		<BrowserRouter>
		<Provider store={store}>
			<Wrapper/>
		</Provider>
		</BrowserRouter>
	);
}

export default App;
