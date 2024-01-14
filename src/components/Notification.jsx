import React from "react";

const Notification = (props) => {
  return (
    <div className={`notif ${props.success ? "success" : "failed"}`}>
        <p className="text-center">{props.text}</p>
    </div>
  );
};

export default Notification;
