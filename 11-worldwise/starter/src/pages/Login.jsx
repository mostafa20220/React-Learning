import { useNavigate } from "react-router-dom";
import PageNav from "../components/PageNav";
import { useAuth } from "../contexts/FakeAuthContext";
import styles from "./Login.module.css";
import { useEffect, useState } from "react";
import Button from "../components/Button";
import Message from "../components/Message";

export default function Login() {
  // PRE-FILL FOR DEV PURPOSES
  const [email, setEmail] = useState("mostafa@example.com");
  const [password, setPassword] = useState("passwordd");
  const [error, setError] = useState(null);
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    setError(null);
    if (!login(email, password))
      setError(
        "The username or password you entered is incorrect. Please try again"
      );
  }

  useEffect(() => {
    if (isAuthenticated) navigate("/app", { replace: true });
  }, [isAuthenticated]);


  // if (isAuthenticated) return null;

  return (
    <main className={styles.login}>
      <PageNav />

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.row}>
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

        <div className={styles.row}>
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

        <div>
          <Button type="primary">Login</Button>
        </div>
        {error && <Message message={error}/>}
      </form>
    </main>
  );
}
