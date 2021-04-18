import React, { useState } from "react";

export default () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [lastName, setLastName] = useState("");

  return (
    <div>
      <form method="post" action="../../../../../lookingIndividualStep1">
      <div className="row row1">
        <div className="six columns">
          <label>Name</label>
          <input
            className="u-full-width"
            placeholder="Name"
            name="name"
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
            autoFocus
          />
        </div>
      </div>
      <div className="row">
        <div className="six columns">
          <label>Contact</label>
          <input
            className="u-full-width"
            placeholder="Telephone"
            name="contact"
            type="tel"
            onChange={(e) => setLastName(e.target.value)}
            value={lastName}
          />
        </div>
      </div>
      <div className="row">
        <div className="six columns">
          <label>Email</label>
          <input
            className="u-full-width required"
            placeholder="test@mailbox.com"
            type="email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            autoFocus
          />
        </div>
      </div>
      <div className="row">
        <div className="six columns">
          <label>password</label>
          <input
            className="u-full-width required"
            placeholder="password"
            type="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            autoFocus
          />
        </div>
      </div>
      <div className="row">
        <div className="six columns">
          <label>confirm password</label>
          <input
            className="u-full-width required"
            placeholder="password"
            type="password"
            name="confirmPassword"
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmpassword}
            autoFocus
          />
        </div>
      </div>
      <button style={{ background: "#33c3f0", borderWidth: "2px", color: "6c7a86", borderRadius: "1.2em", padding: "4px",height:"40px",width:"100px"}}   type="submit" >Save</button>
    </form>
    </div>
  );
};
