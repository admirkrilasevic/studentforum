import React from "react";
import { useEffect } from "react";
import styles from "./Modal.module.css";

function Modal({ isOpen, close, children }) {
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return <></>;

  return (
    <div className={styles.modalContainer}>
      <div
        onClick={(e) => {
          e.stopPropagation();
          close();
        }}
        className={styles.modalBackground}
      />
      <div className={styles.modalContent}>
        <div className={styles.closeIcon} onClick={close}>
          x
        </div>
        {children}
      </div>
    </div>
  );
}

export default Modal;
