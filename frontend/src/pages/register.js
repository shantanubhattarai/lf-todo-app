import React from "react";
import { Redirect } from "react-router-dom";

export default class Register extends React.Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      redirect: false,
      error: "",
    };
  }

  handleUsernameChange = (e) => {
    this.setState({ username: e.target.value });
  };

  handlePasswordChange = (e) => {
    this.setState({ password: e.target.value });
  };

  handleRegister = (e) => {
    e.preventDefault();
    fetch("http://localhost:9090/api/auth/register", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(this.state),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.status === 200) {
          localStorage.setItem("authToken", response.token);
          this.setState({ redirect: true, error: "" });
        } else {
          this.setState({ redirect: false, error: response.message });
        }
      })
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <div>
        {this.state.redirect ? <Redirect to="/"></Redirect> : ""}
        <form onSubmit={this.handleRegister}>
          <div className="form-group">{this.state.error}</div>
          <div className="form-group">
            <label>USERNAME</label>
            <input type="text" onChange={this.handleUsernameChange} required />
          </div>
          <div className="form-group">
            <label>PASSWORD</label>
            <input type="text" onChange={this.handlePasswordChange} required />
          </div>
          <div className="form-group">
            <input
              type="submit"
              className="toDoForm__button"
              value="Register"
            />
          </div>
        </form>
      </div>
    );
  }
}
