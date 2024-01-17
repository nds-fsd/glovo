import React from "react";
import styles from "./styles.module.css";

const Switch = ({ isOn, handleToggle }) => {
  return (
    <>
      <input
        className={styles.reactSwitchCheckbox}
        id={`react-switch-new`}
        type="checkbox"
        checked={isOn}
        onChange={handleToggle}
      />
      <label
        className={styles.reactSwitchLabel}
        htmlFor={`react-switch-new`}
        style={{ background: isOn && "#06D6A0" }}
      >
        <span className={styles.reactSwitchButton} />
      </label>
    </>
  );
};

export default Switch;
