const Channel = require("../channel");

test("It should retrieve all available channels", () => {
  const channel = new Channel(); 
  
  const expected = [{
      id: 1, 
      name: "General",
      creator: "NACK",
      msgCount: 2,
      msgs: [
        {
          id: 1,
          timestamp: "2018-20-12T13:37:27+00:00",
          sender: "NACK",
          channelId: 1,
          msg: "Welcome to Nack!"
        }
      ]
    }];
  expect(channel.all()).toHaveLength(1);
});

test("It should add new channel", () => {
  const channel = new Channel(); 
  
  expect(channel.addChannel("test-channel", "tester").name).toBe("test-channel");
  expect(channel.all()).toHaveLength(2);
})

test("It should retrieve a channel", () => {
  const channel = new Channel(); 
  expect(channel.getChannel(1)).toEqual({
      id: 1, 
      name: "General",
      creator: "NACK",
      msgCount: 2,
      msgs: [
        {
          id: 1,
          timestamp: "2018-20-12T13:37:27+00:00",
          sender: "NACK",
          channelId: 1,
          msg: "Welcome to Nack!"
        }
      ]
    });
});

test("It should know if channel exists", () => {
  const channel = new Channel(); 
  
  expect(channel.hasChannel(1)).toBeTruthy(); 
})