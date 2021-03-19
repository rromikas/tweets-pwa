import React from "react";
import "simplebar/dist/simplebar.min.css";
import Background from "components/Background";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Dashboard from "components/Dashboard";
import Login from "components/Login";

const App = () => {
  return (
    <>
      <Background></Background>
      <Router>
        <Route exact path="/" component={Dashboard}></Route>
        <Route exact path="/login" component={Login}></Route>
      </Router>
    </>
  );
};

export default App;
