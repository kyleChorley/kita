import React, { Component } from "react";
import { Link } from "react-router-dom";
import { signup } from "./AuthAxios";
// import GoogleButtonSignUp from "../GoogleButtonSignup";
import "../../assets/stylesheets/form.css";

class Signup extends Component {
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
    event.preventDefault(event);

    signup(this.state.username, this.state.password).then(data => {
      if (data.message) {
        // handle errors
        this.setState({
          error: data.message
        });
      } else {
        console.log("no error", data);
        // no error
        // lift the data up to the App state
        this.props.setUser(data);
        // redirect to "/projects"
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
      <div className="flex flex-container center col">
        <div className="box" id="signup">
          <h1>Signup</h1>
          <form onSubmit={this.handleSubmit}>
            <input
              placeholder="Username"
              type="text"
              name="username"
              value={this.state.username}
              onChange={e => this.handleChange(e)}
            />

            <input
              placeholder="Password"
              type="password"
              name="password"
              value={this.state.password}
              onChange={e => this.handleChange(e)}
            />

            <input type="submit" value="Signup" />
          </form>
          {/* <GoogleButtonSignUp /> */}
          <p>
            Already have account?
            <Link to={"/"}> Login</Link>
          </p>
        </div>
      </div>
    );
  }
}

export default Signup;
