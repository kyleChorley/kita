import React from "react";
import GoogleButton from "react-google-button";
import GoogleLogin from "react-google-login";
import Link from "react-router-dom";

const GoogleButtonSignUp = props => {
  return (
    <div>
      <button type="button" className="btn btn-primary google-button btn-block">
        {/* <a href={`/api/auth/google`}>Sign in with Google</a> */}
        <a href={`${process.env.REACT_APP_API_URL || ""}/api/google`}>
          Sign in with Google
        </a>
      </button>
    </div>
  );
};

export default GoogleButtonSignUp;
