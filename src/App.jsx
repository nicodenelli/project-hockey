import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";

import { useState } from "react";

import HomePage from './pages/HomePage/HomePage';
import LoginPage from "./pages/LoginPage/LoginPage";
import SignupPage from './pages/SignupPage/SignupPage';
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import FavoritesPage from "./pages/FavoritesPage/FavoritesPage";
import ContactsPage from "./pages/ContactsPage/ContactsPage";

import userService from './utils/userService';




export default function App() {

  const [user, setUser] = useState(userService.getUser())
  

  function handleSignUpOrLogin(){
    // get the user data from the userService and set the user state
    setUser(userService.getUser())
  }


  function handleLogout() {

    console.log('being called')
    userService.logout();
    setUser(null);
  }
  if (user) {
    // are we logged in?
    return (
      <Routes>
        <Route
          path="/"
          element={<HomePage loggedUser={user} handleLogout={handleLogout} />}
        />
        <Route
          path="/login"
          element={<LoginPage handleSignUpOrLogin={handleSignUpOrLogin} />}
        />
        <Route
          path="/signup"
          element={<SignupPage handleSignUpOrLogin={handleSignUpOrLogin} />}
        />
        <Route 
        path="/favorites"
        element={
          <FavoritesPage loggedUser={user} handleLogout={handleLogout} />
        } 
        />
        <Route
          path="/:username"
          element={
            <ProfilePage loggedUser={user} handleLogout={handleLogout} />
          }
        />
        <Route 
        path="/contacts"
        element={
          <ContactsPage loggedUser={user} handleLogout={handleLogout} />
        }
        />
      </Routes>
    );
}

  return (
    <Routes>
      <Route
        path="/login"
        element={<LoginPage handleSignUpOrLogin={handleSignUpOrLogin} />}
      />
      <Route
        path="/signup"
        element={<SignupPage handleSignUpOrLogin={handleSignUpOrLogin} />}
      />
      <Route path="/*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

