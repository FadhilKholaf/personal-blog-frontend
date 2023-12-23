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
          action=""
          method="post"
        >
          <h1>Modify User Data</h1>
          <label htmlFor="">Email</label>
          <input type="text" /><br />
          <label htmlFor="">Role</label>
          <select>
            <option value="">Admin</option>
            <option value="" selected>Member</option>
          </select>
        </form>
      </div>
    </>
  );
};

export default ModifyForm;
