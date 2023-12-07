import { NavLink } from "react-router-dom";
import styles from "./PageNav.module.css";
import Logo from "./Logo";
// import styles from "./PageNav.module.css"

export default function PageNav() {
  return (
    <nav className={styles.nav}>
      <Logo />

      <ul style={{ listStyle: "none", display: "flex", gap: "2rem" }}>
        <li>
          <NavLink to="/product">Product</NavLink>
        </li>
        <li>
          <NavLink to="/pricing">Pricing</NavLink>
        </li>
        <li>
          <NavLink to="/login" className={styles.ctaLink}>
            Login
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
