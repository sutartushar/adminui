import React, { useState } from "react";
import "./EditPopUp.css";

const EditPopUp = ({ user, onClose, onSave }) => {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [role, setRole] = useState(user.role);

  const handelSave = () => {
    const updatedUser = {
      ...user,
      name: name,
      email: email,
      role: role
    };
    onSave(updatedUser);
    onClose();
  };

  return (
    <div className="popup">
      <div className="popup-content">
        <h2>Edit Page</h2>
        <label>Name:</label>
        <input
          type="text"
          placeholder="edit user"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label>Email:</label>
        <input
          type="text"
          placeholder="edit user email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Role:</label>
        <input
          type="text"
          placeholder="edit user role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        />
        <button onClick={handelSave}>update</button>
        <button onClick={onClose}>cancel</button>
      </div>
    </div>
  );
};

export default EditPopUp;
