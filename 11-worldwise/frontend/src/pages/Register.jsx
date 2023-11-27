import { useEffect, useState } from "react";
import Button from "../components/Button";
import Message from "../components/Message";
import PageNav from "../components/PageNav";
import styles from "./Auth.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Register() {
  // PRE-FILL FOR DEV PURPOSES
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { login,register, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    const user = {
      firstName: firstName.charAt(0).toUpperCase() + firstName.slice(1),
      lastName: lastName.charAt(0).toUpperCase() + lastName.slice(1),
      email,
      password,
    };
    setError(null);
    register(user)
      .then((res) => {
        if (res.error) {
          setError(res.error);
        } else {
          login({ email, password });
        }
      })
      .catch((err) => {
        setError(err.message);
      });
  }

  useEffect(() => {
    if (isAuthenticated) navigate("/app", { replace: true });
  }, [isAuthenticated]);

  return (
    <main className={styles.register}>
      <PageNav />

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.row}>
          <div className={styles.col}>
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              onChange={(e) => {
                setError(null);
                setFirstName(e.target.value);
              }}
              value={firstName}
              autoComplete="on"
            />
          </div>
          <div className={styles.col}>
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              onChange={(e) => {
                setError(null);
                setLastName(e.target.value);
              }}
              value={lastName}
              autoComplete="on"
            />
          </div>
        </div>
        <div className={styles.col}>
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => {
              setError(null);
              setEmail(e.target.value);
            }}
            value={email}
            autoComplete="on"
          />  
        </div>

        <div className={styles.col}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => {
              setPassword(e.target.value);
              setError(null);
            }}
            value={password}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <Button type="primary">Register</Button>
          <p style={{ fontSize: "1.2rem" }}>
            you have an account already?{" "}
            <NavLink
              style={{
                color: "var(--color-brand--2)",
                textDecoration: "none",
                fontWeight: "bolder",
              }}
              to="/login"
            >
              Login
            </NavLink>
          </p>
        </div>
        {error && <Message message={error} />}
      </form>
    </main>
  );
}
