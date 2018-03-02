var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var messageSchema = new Schema({
  "fromId":String,
  "toId":String,
  "message":String
});

module.exports = mongoose.model('Messages',messageSchema);
