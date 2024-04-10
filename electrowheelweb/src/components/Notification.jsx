import React from 'react';

const Notification = ({ message }) => {
  return (
    <div className="notification">
    <h5>Notification</h5>
      {message}
    </div>
  );
};

export default Notification;