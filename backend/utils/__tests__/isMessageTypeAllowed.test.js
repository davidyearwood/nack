const isMessageTypeAllowed = require("../isMessageTypeAllowed");

it("Should return true if message type is in allow list", () => {
  expect(isMessageTypeAllowed("text")).toBeTruthy();
});

it("Should return false if message type isn't allowed", () => {
  expect(isMessageTypeAllowed("javascript")).toBeFalsy();
});
