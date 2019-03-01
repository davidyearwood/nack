import React from "react";
import PropTypes from "prop-types";
import Button from "../Button";
import styles from "./channelForm.css";

function ChannelForm({
  value,
  onCreateBtnClick,
  isInvalid,
  errorMsg,
  ...attr
}) {
  return (
    <div className={styles["channel-form"]}>
      <h1 className={styles["channel-form__header"]}>Create a Channel</h1>
      <form className={styles["channel-form__form"]}>
        <label
          htmlFor="channel-form-name-field"
          className={styles["channel-form__label"]}
        >
          Name
          {isInvalid ? (
            <span className={styles["error-msg"]}>{errorMsg}</span>
          ) : null}
          <input
            type="text"
            placeholder="e.g. l33t club"
            value={value}
            id="channel-form-name-field"
            className={
              isInvalid
                ? `${styles["channel-form__input"]} ${styles["is-invalid"]}`
                : styles["channel-form__input"]
            }
            {...attr}
          />
        </label>
        <Button
          text="Create Channel"
          classNames={
            isInvalid
              ? [styles["channel-form__btn"]]
              : [`${styles["channel-form__btn"]} ${styles["is-valid"]}`]
          }
          onClick={onCreateBtnClick}
          disabled={isInvalid}
        />
      </form>
    </div>
  );
}

export default ChannelForm;
