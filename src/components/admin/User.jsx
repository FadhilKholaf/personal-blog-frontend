import React, { useEffect, useState } from "react";
import axios from "axios";

import Loader from "../Loader";
import Modify from "../../images/modify.png";
import Delete from "../../images/delete.png";
import ModifyForm from "../forms/ModifyForm";

const User = () => {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");
  const [modifyForm, setModifyForm] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(import.meta.env.VITE_GET_ALL_USER_API);
        setUserData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error.message);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const modifyHandler = async () => {
    setModifyForm(!modifyForm);
    console.log(modifyForm);
  };

  const deleteHandler = async (id) => {
    const response = await axios.delete(
      import.meta.env.VITE_DELETE_USER_API + id
    );
    if (response) {
      setMessage("user " + response.data.email + " has been deleted");
    }
  };

  return (
    <div className="content">
      <ModifyForm toggle={modifyHandler} hidden={modifyForm ? "" : "hidden"} />
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
              userData.map((user, i) => (
                <tr className="user-tr" key={user._id}>
                  <td className="user-td">{i + 1}</td>
                  <td className="user-td">{user.email}</td>
                  <td className="user-td">
                    <img
                      onClick={() => modifyHandler()}
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
