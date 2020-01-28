import React from "react";

export default function SignUp() {
  return (
    <div>
      <label htmlFor="username">Username: </label>
      <input type="email" name="username" />
      <label htmlFor="password">Password: </label>
      <input type="password" name="password" />
    </div>
  );
}
