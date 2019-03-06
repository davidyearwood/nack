const Channel = require("../channel");


const store = [{
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
    
test("It should retrieve all available channels", () => {
  const channel = new Channel(store); 
  
  expect(channel.all()).toHaveLength(1);
  expect(channel.all()).toEqual(store);
});

test("It should add new channel", () => {
  const channel = new Channel(store); 
  
  expect(channel.addChannel("test-channel", "tester").name).toBe("test-channel");
  expect(channel.all()).toHaveLength(2);
})

test("It should retrieve a channel", () => {
  const channel = new Channel(store); 
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
  const channel = new Channel(store); 
  
  expect(channel.hasChannel(1)).toBeTruthy(); 
});

test("It should have the same values as the store that was passed", () => {
 const channel = new Channel(store);

 expect(channel.all()).toEqual(store);
})