import React from "react";
import {
  render,
  fireEvent,
  cleanup,
  waitForElement
} from "react-testing-library";
import Modal from "../index";

afterEach(cleanup);

describe("When a user clicks the close button", () => {
  test("It should remove the modal", () => {
    const container = render(<Modal show>Some content</Modal>);
    const closeBtn = container.getByText("close");

    fireEvent.click(closeBtn);

    expect(container.queryByText("close")).toBeNull();
  });
});
