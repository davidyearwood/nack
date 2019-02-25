import React from "react";
import PropTypes from "prop-types";

function PlusIcon({ height, width, fill }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 448 512"
      height={height}
      width={width}
      fill={fill}
    >
      <path d="m416 208h-144v-144c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144h-144c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32v-144h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
    </svg>
  );
}

PlusIcon.defaultProps = {
  fill: "#a2a3ba"
};
export default PlusIcon;
