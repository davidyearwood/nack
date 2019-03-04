import React from "react";
import { render, cleanup } from "react-testing-library";
import ChannelHeader from "../index";

afterEach(cleanup);

test("It should display the title", () => {
  const container = render(<ChannelHeader title="Nack" />);

  expect(container.queryByText("Nack")).not.toBeNull();
});

test("It should be able receive other componenets/dom nodes as props", () => {
  const container = render(
    <ChannelHeader title="Nack">
      <p>Testing</p>
    </ChannelHeader>
  );

  expect(container.queryByText("Testing")).not.toBeNull();
});
