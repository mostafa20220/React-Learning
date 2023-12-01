import { NavLink, useNavigate } from "react-router-dom";
import PageNav from "../components/PageNav";
import { useAuth } from "../contexts/AuthContext";
import styles from "./Auth.module.css";
import { useEffect, useState } from "react";
import Button from "../components/Button";
import Message from "../components/Message";

export default function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState(null);
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    setError(null);
    if (!(await login({ email, password })))
      setError(
        "The username or password you entered is incorrect. Please try again"
      );
  }

  useEffect(() => {
    if (isAuthenticated) navigate("/app", { replace: true });
  }, [isAuthenticated]);

  return (
    <main className={styles.login}>
      <PageNav />

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.col}>
          <label htmlFor="email">Email address</label>
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
          <Button type="primary">Login</Button>
          <p style={{ fontSize: "1.2rem" }}>
            Don't have an account?{" "}
            <NavLink
              style={{
                color: "var(--color-brand--2)",
                textDecoration: "none",
                fontWeight: "bolder",
              }}
              to="/register"
            >
              Sign Up
            </NavLink>
          </p>
        </div>
        {error && <Message message={error} />}
      </form>
    </main>
  );
}
