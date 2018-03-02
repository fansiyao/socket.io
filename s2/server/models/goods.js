var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var produtSchema = new Schema({
  "productId":{type:String},
  "productName":String,
  "productPrice":Number,
  "productImg":String,
    "productNum":Number,
    "checked":Number
});

module.exports = mongoose.model('Good',produtSchema);
