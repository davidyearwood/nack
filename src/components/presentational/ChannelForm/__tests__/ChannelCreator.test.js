import React from "react";
import {
  render,
  fireEvent,
  cleanup,
  waitForElement,
  getByTestId
} from "react-testing-library";
import "jest-dom/extend-expect";
import "../ChannelForm";
import ChannelCreator from "../ChannelCreator";

afterEach(cleanup);

const username = "test-user";

describe("When a user inputs a channel name that doesn't exist", () => {
  test("It should display the user's input", () => {
    const form = render(<ChannelCreator username={username} />);
    const input = form.getByLabelText("Name");

    fireEvent.change(input, { target: { value: "ninjas-dancing" } });

    expect(input.value).toBe("ninjas-dancing");
  });

  test("It should enable the submit button", () => {
    const form = render(<ChannelCreator username={username} />);
    const input = form.getByLabelText("Name");

    fireEvent.change(input, { target: { value: "ninjas-dancing" } });

    expect(form.getByText("Create Channel").disabled).not.toBeTruthy();
  });
});

describe("When a user inputs a channel name that already exist", () => {
  test("It should display an error message", () => {
    const form = render(
      <ChannelCreator
        channels={["javascript", "python", "php7"]}
        username={username}
      />
    );
    const input = form.getByLabelText("Name");
    fireEvent.change(input, { target: { value: "javascript" } });

    expect(form.queryByText(/Channel name already exists/i)).toBeTruthy();
  });

  test("It should disable the submit button", () => {
    const form = render(
      <ChannelCreator
        channels={["javascript", "python", "php7"]}
        username={username}
      />
    );
    const input = form.getByLabelText("Name");
    fireEvent.change(input, { target: { value: "javascript" } });

    expect(form.getByText("Create Channel").disabled).toBeTruthy();
  });
});

describe("When a user clicks create channel button", () => {
  beforeEach(() => {
    global.fetch = jest.fn(
      () =>
        new Promise((resolve, reject) => {
          resolve({
            statusCode: 201,
            json() {
              return { statusCode: 201 };
            }
          });
        })
    );
  });
  test("It should display a spinner until response is received", async () => {
    const form = render(
      <ChannelCreator
        channels={["javascript", "python", "php7"]}
        username={username}
      />
    );
    const button = form.getByText("Create Channel");

    // Click the channel create button
    fireEvent.click(button);

    // Wait for the element to change to a spinner
    const spinner = await waitForElement(() => form.getByTestId("spinner"));

    // test to see if spinner exists
    expect(spinner).toBeTruthy();
  });

  test("It should clear the input field", async () => {
    const form = render(
      <ChannelCreator
        channels={["javascript", "python", "php7"]}
        username={username}
      />
    );

    const button = form.getByText("Create Channel");
    const input = form.getByLabelText("Name");
    // Click the channel create button
    fireEvent.change(input, {
      target: { value: "ninjas" }
    });

    // checks to see if input value is set to ninjas
    expect(input.value).toBe("ninjas");

    fireEvent.click(button);

    // wait for setState to update input value to ""
    await waitForElement(() => input.value === "");

    // checks to see if spinner is removed
    expect(form.queryByTestId("spinner")).toBeFalsy();

    // checks to see if input field is cleared
    expect(input.value).toBe("");
  });
});
