import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import "./assets/css/style.css";
import ToDoList from "./components/ToDoList";
import Login from "./pages/login";
import Register from "./pages/register";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Router>
          {localStorage.getItem("authToken") ? (
            ""
          ) : (
            <div className="topBar">
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </div>
          )}

          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/">
              <ToDoList />
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
