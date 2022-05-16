import styles from './SearchBar.module.css';
import { AiOutlineSearch as SearchIcon } from 'react-icons/ai';

function SearchBar() {

    return(
        <div className={styles.searchContainer}>
            <input className={styles.searchBar} type="search"></input>
            <SearchIcon className={styles.searchIcon}/>
        </div>
    );
}

export default SearchBar;