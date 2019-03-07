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

describe("channel()", () => {
  test("It should retrieve a channel by id", () => {
    req.params = {};
    req.params.id = 1;
    const expected = JSON.stringify({
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

    expect(ChannelsController.channel(req, res)).toBe(expected);
  });

  test("It should send an error message if channel doesn't exist", () => {
    req.params = {};
    req.params.id = 9000;
    const expected = JSON.stringify({ error: "Channel doesn't exist" });

    expect(ChannelsController.channel(req, res)).toBe(expected);
  });

  test("It should send error when invalid is sent", () => {
    req.params = {};
    req.params.id = ".2dsa8-(/";
    const expected = JSON.stringify({ error: "Not valid ID" });
    expect(ChannelsController.channel(req, res)).toBe(expected);
  });
});
