import { useState } from "react";

export default () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (event) => {
    event.preventDefault();

    console.log(email, password);
  };

  return (
    <form
      onSubmit={onSubmit}
      role="form"
      id="signup-form"
      aria-label="Sign Up Information"
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
      <button type="submit" className="btn btn-primary">
        Sign Up
      </button>
    </form>
  );
};
