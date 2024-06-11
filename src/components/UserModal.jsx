import React from "react";
import { useNavigate } from "react-router-dom";
import { doSignOut } from "../firebase/auth";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import { useAuth } from "../authContext";

const UserModal = ({ isOpen, onClose }) => {
  const { userLoggedIn, currentUser } = useAuth();
  const navigate = useNavigate();

  return (
    <div className={`modal ${isOpen ? "open" : ""}`}>
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h2>User Profile</h2>
        <p>Email: {currentUser.email}</p>
        <p>Name: {currentUser.name}</p>
        <button
          onClick={() => {
            doSignOut().then(() => {
              navigate("/");
            });
          }}
          className="btn btn-danger mt-4"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default UserModal;
