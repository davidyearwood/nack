const uniqid = require('uniqid');

class Channel {
  constructor(store) {
    this.store = store;
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