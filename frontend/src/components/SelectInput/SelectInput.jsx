import React, { useState } from "react";
import ClickAwayListener from "react-click-away-listener";
import styles from "./SelectInput.module.css";

function SelectInput({ value, items, selectItem, hint }) {
  const [isOpen, setIsOpen] = useState();

  const chooseItem = (item) => {
    selectItem(item);
    setIsOpen(false);
  };

  return (
    <div className={styles.selectContainer}>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`${styles.selectButton} ${value && styles.itemSelected}`}
      >
        {value?.name ?? hint}
      </div>
      {isOpen && (
        <ClickAwayListener onClickAway={() => setIsOpen(false)}>
          <div className={styles.selectContent}>
            {items.map((item) => (
              <div
                key={item.id}
                onClick={() => chooseItem(item)}
                className={styles.selectItem}
              >
                {item.name}
              </div>
            ))}
          </div>
        </ClickAwayListener>
      )}
    </div>
  );
}

export default SelectInput;
