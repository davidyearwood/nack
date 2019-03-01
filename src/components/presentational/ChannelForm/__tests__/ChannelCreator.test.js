import React from "react";
import {
  render,
  fireEvent,
  cleanup,
  waitForElement
} from "react-testing-library";
import "jest-dom/extend-expect";
import "../ChannelForm";
import ChannelCreator from "../ChannelCreator";

afterEach(cleanup);

describe("When a user inputs a channel name", () => {
  test("It should display the user's input", () => {
    const form = render(<ChannelCreator />);
    const input = form.getByLabelText("Name");

    fireEvent.change(input, { target: { value: "ninjas-dancing" } });

    expect(input.value).toBe("ninjas-dancing");
  });
});
