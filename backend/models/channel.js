const uniqid = require('uniqid');

class Channel {
  constructor(store) {
    if (store) {
      this.store = store;
    } else {
      this.store = [{
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
    }
  }
  
  all() {
    return this.store;
  }
  
  addChannel(name, creator) {
    const channel = {
      id: uniqid(),
      name,
      creator,
      msgs: [],
      msgCount: 0
    };
    
    const channels = this.all();
    
    channels.push(channel);
    return channel;
  }
  
  getChannel(id) {
    return this.all().find((channel) => {
      return channel.id === id;
    });
  }
  
  hasChannel(id) {
    return this.getChannel(id) !== undefined ? true : false; 
  }
}

module.exports = Channel;