const ChannelsController = require("../channelsController");

let store;

const res = {};
const req = {};

function initStore() {
  return [
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
}
beforeEach(() => {
  store = initStore();
  res.json = jest.fn(data => JSON.stringify(data));
  res.status = jest.fn(status => {
    res.status = status;
    return res;
  });
  // res.status.mockReturnValue(res);
});

afterEach(() => {
  store = {};
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

  test("It should send error when invalid ID is sent", () => {
    req.params = {};
    req.params.id = ".2dsa8-(/";
    const expected = JSON.stringify({ error: "Not valid ID" });
    expect(ChannelsController.channel(req, res)).toBe(expected);
  });
});

describe("addChannel()", () => {
  test("It should return a 201 status code if added successfully", () => {
    req.body = {
      name: "disney-on-ice",
      creator: "tester"
    };

    const actual = ChannelsController.addChannel(req, res);

    expect(res.status).toBe(201);
  });

  test("It should respond w/ created resource", () => {
    req.body = {
      name: "girl-on-ice",
      creator: "tester"
    };
    const actual = ChannelsController.addChannel(req, res);
    expect(JSON.parse(actual).data.creator).toEqual("tester");
    expect(JSON.parse(actual).data.msgs).toHaveLength(0);
    expect(JSON.parse(actual).data.name).toEqual("girl-on-ice");
  });

  test("It should respond w/ 500 status if required body is missing", () => {
    req.body = {
      name: "girl-on-icey"
    };

    const actual = ChannelsController.addChannel(req, res);

    expect(res.status).toBe(500);
    expect(JSON.parse(actual).error).toBe("Internal Server Error.");
  });

  test("It should respond w/ 409 code if already exists", () => {
    req.body = {
      name: "girl-on-ice",
      creator: "tester"
    };

    const actual = ChannelsController.addChannel(req, res);
    expect(res.status).toBe(409);
    expect(JSON.parse(actual).error).toBe(
      "The channel you attempted to create already exists."
    );
  });
});
