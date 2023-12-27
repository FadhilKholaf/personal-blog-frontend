import React, { useEffect, useState } from "react";
import axios from "axios";
import { useUsersContext } from "../../hooks/useUsersContext";

// components
import Loader from "../Loader";
import Modify from "../../images/modify.png";
import Delete from "../../images/delete.png";
import ModifyForm from "../forms/ModifyForm";

const User = () => {
  const { users, dispatch } = useUsersContext();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");
  const [modifyForm, setModifyForm] = useState(false);

  // form
  const [modifyId, setModifyId] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(import.meta.env.VITE_GET_ALL_USER_API);
        dispatch({ type: "SET_USERS", payload: response.data });
      } catch (error) {
        setError(error.message);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  const modifyHandler = async (id, email, password, role) => {
    setModifyForm(!modifyForm);
    setModifyId(id);
    setEmail(email);
    setPassword(password);
    setRole(role);
  };

  const submitModifyHandler = async (e) => {
    e.preventDefault();
    const modifyData = {
      email: email,
      role: role,
    };
    const response = await axios.put(
      import.meta.env.VITE_UPDATE_USER_API + modifyId,
      { ...modifyData, password: password }
    );
    dispatch({ type: "UPDATE_USER", payload: response.data });
    setModifyForm(false);
  };

  const deleteHandler = async (id) => {
    try {
      const response = await axios.delete(
        import.meta.env.VITE_DELETE_USER_API + id
      );
      dispatch({ type: "DELETE_USER", payload: response.data });
      setMessage("user " + response.data.email + " has been deleted");
      console.log(response.data);
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div className="content">
      <ModifyForm
        toggle={modifyHandler}
        hidden={modifyForm ? "" : "hidden"}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        role={role}
        setRole={setRole}
        handleSubmit={submitModifyHandler}
      />
      <div className="grid g-2">
        <h1 className="text-left">User Data</h1>
        <h3 className="text-right">Add User</h3>
      </div>
      <div className="table-container">
        <table className="user-table">
          <thead>
            <tr className="user-tr">
              <th className="user-th">No.</th>
              <th className="user-th">Email</th>
              <th className="user-th text-center">Option</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr className="user-tr">
                <td className="user-td" colSpan="3">
                  <Loader />
                </td>
              </tr>
            ) : error ? (
              <tr className="user-tr">
                <td className="user-td" colSpan="3">
                  <p className="error">Error: {error}</p>
                </td>
              </tr>
            ) : (
              users.map((user, i) => (
                <tr className="user-tr" key={user._id}>
                  <td className="user-td">{i + 1}</td>
                  <td className="user-td">{user.email}</td>
                  <td className="user-td">
                    <img
                      onClick={() =>
                        modifyHandler(
                          user._id,
                          user.email,
                          user.password,
                          user.role
                        )
                      }
                      className="option-icon"
                      src={Modify}
                      alt="Modify"
                    />
                    <img
                      onClick={() => deleteHandler(user._id)}
                      className="option-icon"
                      src={Delete}
                      alt="Delete"
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
};

export default User;
