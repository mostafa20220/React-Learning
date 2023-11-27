import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import styles from "./User.module.css";
import { useEffect } from "react";

function User() {
  const { user, logout, isAuthenticated } = useAuth();


  if (!user) return null;

  function logoutHandler() {
    if (logout()) navigate("/");
  }


  const avatarUrl = `https://localhost:3000/api${user.avatar}`;

  const msg = isAuthenticated ? `Welcome, ${user.firstName}` : `${user.firstName} ${user.lastName}`;

  return (
    <div className={styles.user}>
      <img src={avatarUrl} alt={user.firstName} />
      <span>{msg}</span>
      {isAuthenticated && (
        <button className={styles.logout} onClick={logoutHandler}>
          Logout
        </button>
      )}
    </div>
  );
}

export default User;

