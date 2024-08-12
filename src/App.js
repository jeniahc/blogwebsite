import React from 'react';
import { ReactQueryProvider } from "./react-query-client";
import Navigation from "./components/navigation";
import { Routes, Route, Navigate } from "react-router-dom";
import { createContext, useEffect, useState } from "react";
import { lookInSession } from "./common/session";
import Home from "./pages/home";
import Search from "./pages/search";
import Browse from "./pages/browse";
import UserAuthForm from "./pages/UserAuthForm";
import Notifications from "./pages/notifications";
import Editor from './pages/editor';

export const UserContext = createContext ({});

const App = () => {
  
  const [ userAuth, setUserAuth ] = useState({});

  useEffect (() => {

    let userInSession = lookInSession("user");

    userInSession ? setUserAuth(JSON.parse(userInSession)) : setUserAuth ({ access_token: null })

  }, [ ])

  return (
      <div className="App">
        <ReactQueryProvider>
        <UserContext.Provider value={{userAuth, setUserAuth}}>
        <Navigation />
        <Routes>
          <Route path="/editor" element={<Editor />} />
          <Route path="/" element={<Home />} />
          <Route path="/browse" element={<Browse />} />
          <Route path="/search" element={<Search />} />
          <Route path="/signup" element={<UserAuthForm type="Sign Up" />} />
          <Route path="/login" element={<UserAuthForm type="Log In"/>} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/" render={() => <Navigate to="/home" />} />
          <Route component={() => 404} />
        </Routes>
        </UserContext.Provider>
        </ReactQueryProvider>
      </div>
  );
}

export default App;
