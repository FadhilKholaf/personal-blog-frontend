import React, { useEffect, useState } from "react";
import axios from "axios";
import { useUsersContext } from "../../hooks/useUsersContext";

// components
import Loader from "../Loader";
import Modify from "../../images/modify.png";
import Delete from "../../images/delete.png";
import Form from "../forms/Form";
import Notification from "../Notification";

const User = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");

  // context
  const { users, dispatch } = useUsersContext();

  // form
  const [form, setForm] = useState(false);
  const [formType, setFormType] = useState(true);

  // modify form
  const [modifyId, setModifyId] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [role, setRole] = useState("member");

  // notification
  const [notification, setNotification] = useState(false);
  const [notificationStatus, setNotificationStatus] = useState(true);
  const [notificationText, setNotificationText] = useState("");
  const notif = (status, text) => {
    setNotification(true);
    setNotificationStatus(status);
    setNotificationText(text);
    setTimeout(() => {
      setNotification(false);
    }, 1500);
  };

  // fetching data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(import.meta.env.VITE_GET_ALL_USER_API);
        dispatch({ type: "SET_USERS", payload: response.data });
        notif(true, "Data Loaded");
      } catch (error) {
        setError(error.message);
        console.log(error.message);
        notif(false, "Error loading data");
      }
      setLoading(false);
      notif;
    };
    fetchData();
  }, []);

  // handling form
  const formHandler = (type, user) => {
    setForm(!form);
    type === "add"
      ? [setFormType(true), setEmail(""), setPassword(""), setRole("member")]
      : type === "modify"
      ? [
          setFormType(false),
          setModifyId(user._id),
          setOldPassword(user.password),
          setEmail(user.email),
          setRole(user.role),
        ]
      : "";
  };

  // handling new user data
  const addHandler = async (e) => {
    e.preventDefault();

    // geting input data
    const userData = {
      email: email,
      password: password,
      role: role,
    };

    // inserting to database
    try {
      const response = await axios.post(
        import.meta.env.VITE_ADD_USER_API,
        userData
      );
      dispatch({ type: "CREATE_USER", payload: response.data });
    } catch (error) {
      console.log(error.response.data.error);
    }

    // clossing the form
    setForm(false);
  };

  // handling update user data
  const modifyHandler = async (e) => {
    e.preventDefault();
    const modifyData = {
      email: email,
      role: role,
    };
    try {
      const response = await axios.put(
        import.meta.env.VITE_UPDATE_USER_API + modifyId,
        {
          ...modifyData,
          ...(!password ? { password: oldPassword } : { password: password }),
        }
      );
      dispatch({ type: "UPDATE_USER", payload: response.data });
    } catch (error) {
      console.log(error.response.data.error);
    }
    setForm(false);
    setEmail("");
    setPassword("");
    setOldPassword("");
    setRole("");
  };

  // handling delete user data
  const deleteHandler = async (id) => {
    try {
      const response = await axios.delete(
        import.meta.env.VITE_DELETE_USER_API + id
      );
      dispatch({ type: "DELETE_USER", payload: response.data });
      setMessage("user " + response.data.email + " has been deleted");
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div className="content">
      {notification && (
        <Notification success={notificationStatus} text={notificationText} />
      )}
      <Form
        toggle={() => setForm(false)}
        hidden={form ? "" : "hidden"}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        role={role}
        setRole={setRole}
        formType={formType}
        {...(formType
          ? {
              handleSubmit: addHandler,
            }
          : {
              handleSubmit: modifyHandler,
            })}
      />
      <div className="grid g-2">
        <h1 className="text-left">User Data</h1>
        <h3 className="text-right" onClick={() => formHandler("add")}>
          Add User
        </h3>
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
                      onClick={() => formHandler("modify", user)}
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
