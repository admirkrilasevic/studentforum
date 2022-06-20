import React from "react";
import { AiOutlineSearch as SearchIcon } from "react-icons/ai";
import styles from "./SearchBar.module.css";

function SearchBar() {
  return (
    <div className={styles.searchContainer}>
      <input className={styles.searchBar} type="search" />
      <SearchIcon className={styles.searchIcon} />
    </div>
  );
}

export default SearchBar;
