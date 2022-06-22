import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Profile from "../components/Account/Profile";
import Settings from "../components/Account/Settings";
import AuthService from "../utils/AuthService";
import styles from "./Account.module.css";

function Account() {
  const { section } = useParams();
  const [selectedSection, setSelectedSection] = useState("profile");

  const displaySelection = (selection) => {
    switch (selection) {
      case "Profile":
        return <Profile />;
      case "Settings":
        return <Settings />;
      default:
        return <Profile />;
    }
  };

  const convertToTitleCase = (string) => {
    return string.charAt(0).toUpperCase() + string.substr(1).toLowerCase();
  };

  useEffect(() => {
    setSelectedSection(convertToTitleCase(section));
  }, [section]);

  return (
    <div className={styles.accountContainer}>
      <div className={styles.sectionButtons}>
        <Link
          to={"/account/profile"}
          className={
            selectedSection == "Profile"
              ? styles.sectionButtonActive
              : styles.sectionButton
          }
        >
          Profile
        </Link>
        <Link
          to={"/account/settings"}
          className={
            selectedSection == "Settings"
              ? styles.sectionButtonActive
              : styles.sectionButton
          }
        >
          Settings
        </Link>
        <button
          className={styles.logOutButton}
          onClick={() => AuthService.logout()}
        >
          LOG OUT
        </button>
      </div>
      {displaySelection(selectedSection)}
    </div>
  );
}

export default Account;
