import { NavLink } from "react-router-dom";
import { FaUser as Account } from "react-icons/fa";
import { ImEnter as SignIn } from "react-icons/im";
import AuthService from "../../utils/AuthService";
import styles from "./Header.module.css";

function Header() {
  const loggedIn = !!AuthService.getCurrentUser();

  return (
    <div className={styles.header}>
      <NavLink
        to="/home"
        className={styles.headerLinks}
        activeStyle={{ color: "#0c1e66" }}
      >
        Home
      </NavLink>
      <span className={styles.title}>askIBU</span>
      <NavLink
        id={loggedIn ? "logout-link" : "sign-in-link"}
        to={loggedIn ? "/account/profile" : "/login"}
        className={styles.icons}
        activeStyle={{ color: "#0c1e66" }}
      >
        {loggedIn ? <Account /> : <SignIn />}
      </NavLink>
    </div>
  );
}

export default Header;
