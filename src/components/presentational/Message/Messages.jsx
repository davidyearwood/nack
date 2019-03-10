import React from "react";
import PropTypes from "prop-types";
import { format, isSameDay, isToday } from "date-fns";
import Message from "./Message";
import styles from "./message.css";

const DayDivider = ({ date }) => (
  <div className={styles.divider}>
    <span className={styles.dividerDate}>
      {isToday(date) ? "Today" : format(date, "dddd, MMMM Do")}
    </span>
  </div>
);

function Messages({ msgs }) {
  const msgContainer = React.createRef();
  return (
    <div
      className={styles.msgs}
      ref={msgContainer}
      onLoad={() =>
        msgContainer.current.scrollTo(0, msgContainer.current.scrollHeight)
      }
    >
      {msgs.map((msg, index) => (
        <React.Fragment key={`${msg.id}_${Date.parse(msg.timestamp)}`}>
          {index > 0 &&
          isSameDay(
            new Date(msg.timestamp),
            new Date(msgs[index - 1].timestamp)
          ) ? null : (
            <DayDivider date={msg.timestamp} />
          )}
          <Message
            key={msg.id}
            src="https://via.placeholder.com/75"
            text={msg.msg}
            time={format(msg.timestamp, "MMM D, YYYY HH:mm A")}
            sender={msg.sender}
            alt=""
          />
        </React.Fragment>
      ))}
    </div>
  );
}

Messages.propTypes = {
  msgs: PropTypes.instanceOf(Array)
};

Messages.defaultProps = {
  msgs: []
};

export default Messages;
