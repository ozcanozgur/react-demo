import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Login from './pages/Login';
import Register from './pages/Register';
import Reset from './pages/Reset';
import Home from './pages/Home';
import NotFound from './pages/NotFound';

import GlobalStyle from './global-styles';
import styled from 'styled-components';

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";

function App() {
  const [user, loading, error] = useAuthState(auth);

  return (
    <>
      <Helmet>
        <title>OZ Market</title>
        <meta name="description" content="A Market Application" />
      </Helmet>

      <Router>
        <Routes>
          {user ? [
            <Route key={0} exact path="/" element={<Home />} />
          ] : [
            <React.Fragment key={1}>
              <Route key={2} exact path="/" element={<Login />} />
              <Route key={3} exact path="/register" element={<Register />} />
              <Route key={4} exact path="/reset" element={<Reset />} />
            </React.Fragment>
          ]}
          <Route key={3} path="*" element={<NotFound />} />
        </Routes>
      </Router >
      <GlobalStyle />
    </>
  );
}

export default App;
