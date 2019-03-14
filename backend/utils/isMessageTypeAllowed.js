const allowedTypes = {
  image: 1,
  text: 1
};

function isMessageTypeAllowed(type) {
  return !!allowedTypes[type];
}

module.exports = isMessageTypeAllowed;
