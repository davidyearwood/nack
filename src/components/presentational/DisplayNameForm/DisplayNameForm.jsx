import React from "react";
import SvgUser from "../Svg/SvgUser";
import Modal from "../Modal/Modal";
import styles from "./displayNameForm.css";
import functional from "../../../styles/functional.css";
import Button from "../Button";

const Header = ({ title }) => (
  <div className={styles.displayName__header}>
    <SvgUser height="4em" width="4em" />
    <h2 className={styles.displayName__title}>{title}</h2>
  </div>
);

function DisplayNameForm({ onClick, ...attr }) {
  return (
    <Modal>
      <Header title="What's your display name?" />
      <input
        type="text"
        className={styles.displayName__input}
        placeholder="e.g., David, n00bKing, etc..."
        {...attr}
      />
      <p className={styles.displayName__text}>
        This could be your first name, or a nickname — however you’d like people
        to refer to you in Nack.
      </p>
      <div className={functional.centerText}>
        <Button text="Use Display Name" onClick={onClick} />
      </div>
    </Modal>
  );
}

export default DisplayNameForm;
