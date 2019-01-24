import React from "react";
import Button from "../Button/Button";
import styles from "./channelForm.css";

function ChannelForm({ value, onCreateBtnClick, ...attr }) {
  return (
    <div className={styles["channel-form"]}>
      <h1 className={styles["channel-form__header"]}>Create a Channel</h1>
      <form className={styles["channel-form__form"]}>
        <label
          htmlFor="channel-form-name-field"
          className={styles["channel-form__label"]}
        >
          Name
          <input
            type="text"
            placeholder="e.g. l33t club"
            value={value}
            id="channel-form-name-field"
            className={styles["channel-form__input"]}
            {...attr}
          />
        </label>
        <Button
          text="Create Channel"
          classNames={[styles["channel-form__btn"]]}
          onClick={onCreateBtnClick}
        />
      </form>
    </div>
  );
}

export default ChannelForm;
