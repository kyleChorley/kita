import React, { Component } from "react";
import { Link } from "react-router-dom";
import { login } from "./AuthAxios";

class Login extends Component {
  state = {
    username: "",
    password: "",
    error: ""
  };

  handleChange = event => {
    this.setState(
      {
        [event.target.name]: event.target.value
      },
      () => console.log(this.state)
    );
  };

  handleSubmit = event => {
    event.preventDefault();

    login(this.state.username, this.state.password).then(data => {
      console.log(this.props);
      if (data.message) {
        // handle errors
        this.setState({
          error: data.message
        });
      } else {
        console.log(this.props);
        // no error
        // lift the data up to the App state
        this.props.setUser(data);
        // redirect to "/"
        this.props.history.push("/");
      }
    });
  };

  componentDidMount = () => {
    if (this.props.user) {
      this.props.history.push("/");
    }
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={this.state.username}
            onChange={e => this.handleChange(e)}
          />
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={this.state.password}
            onChange={e => this.handleChange(e)}
          />

          <input type="submit" value="Login" />
        </form>
        <p>
          Don't have account?
          <Link to={"/signup"}> Signup</Link>
        </p>
      </div>
    );
  }
}

export default Login;
