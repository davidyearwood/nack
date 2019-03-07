const ChannelsController = require("../channelsController");

const store = [
  {
    id: 1,
    name: "General",
    creator: "test",
    msgCount: 2,
    msgs: [
      {
        id: 1,
        timestamp: "2018-20-12T13:37:27+00:00",
        sender: "test",
        channelId: 1,
        msg: "Welcome to Nack!"
      }
    ]
  },
  {
    id: 2,
    name: "help",
    creator: "test",
    msgCount: 2,
    msgs: [
      {
        id: 1,
        timestamp: "2018-20-12T13:37:27+00:00",
        sender: "test",
        channelId: 1,
        msg: "Welcome to Nack!"
      }
    ]
  }
];

const res = {};
const req = {};

beforeEach(() => {
  res.json = jest.fn(data => JSON.stringify(data));
  res.status = jest.fn();
  res.status.mockReturnValue(res);
});

describe("channelList()", () => {
  test("It should convert store to a json string representation", () => {
    expect(ChannelsController.channelList(req, res)).toBe(
      JSON.stringify(store)
    );
  });
});

test("It should retrieve a channel by id", () => {
  req.params.id = 1;

  expect(ChannelsController.channel(req, res)).toBe({
    id: 1,
    name: "General",
    creator: "test",
    msgCount: 2,
    msgs: [
      {
        id: 1,
        timestamp: "2018-20-12T13:37:27+00:00",
        sender: "test",
        channelId: 1,
        msg: "Welcome to Nack!"
      }
    ]
  });
});
