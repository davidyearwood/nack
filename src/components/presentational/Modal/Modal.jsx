import React from "react";

// Specs
// The display-name input field must be "focused" when a user sees it
// You can only tab what's inside the dialog box not what is inert
// Tab moves you to the next tababable element, if you're at the last element
// it should move you to the first one
// tab + shift moves focus to previous tababable element. If you're at the first element move to the last
// escape - closes dialog window
// what is the primary purpose of this dialog box? To give a user a display name
function Modal({ classNames = [], children }) {
  return (
    <div className="modal-backdrop">
      <div
        className={`modal" + ${classNames.join(" ")}`}
        role="dialog"
        aria-modal="true"
      >
        {children}
      </div>
    </div>
  );
}

export default Modal;
