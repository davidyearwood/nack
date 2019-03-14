import React from "react";
import PropTypes from "prop-types";
import styles from "./message.css";

const MessageHeader = ({ sender, time }) => (
  <div className={styles.msg__header}>
    <h3 className={styles.msg__sender}>{sender}</h3>
    <span className={styles.msg__time}>{time}</span>
  </div>
);

const MessageText = ({ text }) => <p className={styles.msg__text}>{text}</p>;

const MessageAvatar = ({ src, alt, ...attr }) => (
  <img className={styles.msg__avatar} src={src} alt={alt} {...attr} />
);

const MessageLayout = ({ LeftSide, RightSide }) => (
  <div className={`${styles.msg} ${styles.l_msg}`}>
    <div className={styles["l_msg-col-1-3"]}> {LeftSide} </div>
    <div className={styles["l_msg-col-2-3"]}> {RightSide} </div>
  </div>
);

const MessageImg = ({ src }) => (
  <img src={src} className={styles.msgImg} alt="" />
);

function Message({ src, alt, sender, time, text, type }) {
  const content = (
    <React.Fragment>
      <MessageHeader sender={sender} time={time} />
      {type === "image" ? (
        <MessageImg src={text} />
      ) : (
        <MessageText text={text} />
      )}
    </React.Fragment>
  );

  return (
    <MessageLayout
      LeftSide={<MessageAvatar src={src} alt={alt} />}
      RightSide={content}
    />
  );
}

MessageHeader.propTypes = {
  sender: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired
};

MessageText.propTypes = {
  text: PropTypes.string.isRequired
};

MessageLayout.propTypes = {
  LeftSide: PropTypes.element.isRequired,
  RightSide: PropTypes.element.isRequired
};

Message.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  sender: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired
};

export default Message;
