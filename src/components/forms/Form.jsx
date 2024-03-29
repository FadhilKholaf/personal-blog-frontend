import React from "react";

const ModifyForm = (props) => {
  return (
    <>
      <div
        className={`overflow-container ${props.hidden}`}
        onClick={props.toggle}
      ></div>
      <div className="form-container">
        <form
          className={`overflow-form ${props.hidden}`}
          onSubmit={props.handleSubmit}
        >
          {props.formType ? <h1>Add</h1> : <h1>Modify</h1>}
          <h1>Modify User Data</h1>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            autoComplete="no"
            type="email"
            value={props.email || ""}
            onChange={(e) => {
              props.setEmail(e.target.value);
            }}
          />
          <br />
          <label htmlFor="password">Password</label>
          <input
            id="password"
            autoComplete="no"
            type="password"
            placeholder="Enter Password"
            value={props.password || ""}
            onChange={(e) => {
              props.setPassword(e.target.value);
            }}
          />
          <br />
          <label htmlFor="role">Role</label>
          <select
            id="role"
            value={props.role}
            onChange={(e) => {
              props.setRole(e.target.value);
            }}
          >
            <option value="member">Member</option>
            <option value="admin">Admin</option>
          </select>

          <br />
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
};

export default ModifyForm;
