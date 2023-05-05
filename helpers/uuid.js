// Assign each note a unique id as it is created so that I can target each individually for deletion later

module.exports = () =>
  Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);