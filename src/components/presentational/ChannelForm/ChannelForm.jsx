import React from "react";
import PropTypes from "prop-types";
import Button from "../Button";
import styles from "./channelForm.css";
import Spinner from "../Spinner";

const ButtonContent = ({ isPushing }) =>
  isPushing ? <Spinner /> : <React.Fragment>Create Channel</React.Fragment>;

const ErrorMsg = ({ isInvalid, errorMsg }) =>
  isInvalid ? <span className={styles.errorMsg}>{errorMsg}</span> : null;

const UserInput = ({ isInvalid, value, errorMsg, ...attr }) => {
  const classNames = isInvalid
    ? `${styles.input} ${styles.hasError}`
    : styles.input;
  return (
    <label htmlFor="channel-form-name-field" className={styles.channelInput}>
      Name
      <ErrorMsg isInvalid={isInvalid} errorMsg={errorMsg} />
      <input
        type="text"
        placeholder="e.g. l33t club"
        value={value}
        id="channel-form-name-field"
        className={classNames}
        {...attr}
      />
    </label>
  );
};

function ChannelForm({
  value,
  onCreateBtnClick,
  isInvalid,
  errorMsg,
  isPushing,
  ...attr
}) {
  const buttonClassNames = isInvalid
    ? [styles.btn]
    : [`${styles.btn} ${styles.isValid}`];

  return (
    <div className={styles.formContainer}>
      <h1 className={styles.title}>Create a Channel</h1>
      <form>
        <UserInput
          isInvalid={isInvalid}
          value={value}
          {...attr}
          errorMsg={errorMsg}
        />
        <Button
          classNames={buttonClassNames}
          onClick={onCreateBtnClick}
          disabled={isInvalid}
        >
          <ButtonContent isPushing={isPushing} />
        </Button>
      </form>
    </div>
  );
}

ChannelForm.defaultProps = {
  isPushing: false,
  isInvalid: false,
  errorMsg: ""
};

ChannelForm.propTypes = {
  isInvalid: PropTypes.bool,
  isPushing: PropTypes.bool,
  errorMsg: PropTypes.string
};

export default ChannelForm;
