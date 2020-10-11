import { useState } from "react";
import Router from "next/router";
import useFetch from "../../hooks/use-fetch";

export default () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { executeRequest, errors } = useFetch({
    url: "/api/users/signup",
    method: "POST",
    body: JSON.stringify({
      email,
      password,
    }),
    onSuccess: () => Router.push("/"),
  });

  const onSubmit = async (event) => {
    event.preventDefault();

    await executeRequest();
  };

  return (
    <form
      onSubmit={onSubmit}
      role="form"
      id="signup-form"
      aria-label="Sign Up Information"
      className="w-75 p-3"
    >
      <h1>Sign Up</h1>
      <div className="form-group">
        <label htmlFor="signup-email">Email Address</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          id="signup-email"
          type="text"
          className="form-control"
          aria-label="signup-password"
        ></input>
      </div>
      <div className="form-group">
        <label htmlFor="signup-password">Password</label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          id="signup-password"
          type="password"
          className="form-control"
          aria-label="signup-password"
        ></input>
      </div>
      {errors}
      <button type="submit" className="btn btn-primary">
        Sign Up
      </button>
    </form>
  );
};
