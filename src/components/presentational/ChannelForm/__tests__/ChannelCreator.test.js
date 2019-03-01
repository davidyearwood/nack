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

describe("When a user inputs a channel name that doesn't exist", () => {
  test("It should display the user's input", () => {
    const form = render(<ChannelCreator />);
    const input = form.getByLabelText("Name");

    fireEvent.change(input, { target: { value: "ninjas-dancing" } });

    expect(input.value).toBe("ninjas-dancing");
  });
});

describe("When a user inputs a channel name that already exist", () => {
  test("It should display an error message", () => {
    const form = render(
      <ChannelCreator channels={["javascript", "python", "php7"]} />
    );
    const input = form.getByLabelText("Name");
    fireEvent.change(input, { target: { value: "javascript" } });

    expect(form.queryByText(/Channel name already exists/i)).toBeTruthy();
  });
});
