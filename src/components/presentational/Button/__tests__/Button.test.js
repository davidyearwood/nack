import React from "react";
import { render, cleanup } from "react-testing-library";
import Button from "../index";

afterEach(cleanup);

test("It should display a button with text", () => {
  const button = render(<Button>This is a button</Button>);

  expect(button.queryByText("This is a button")).not.toBeNull();
});
