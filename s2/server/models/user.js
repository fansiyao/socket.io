var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  "userId":String,
  "userName":String,
  "userPwd":String,
  "socketId":String,
  "orderList":Array,
  "friend":[
    {
      "userName" : String,
      "userId" : String,
    }
  ],
  "cartList":[
    {
      "productId":String,
      "productName":String,
      "productPrice":String,
      "prodcutImg":String,
      "checked":String,
      "productNum":Number
    }
  ],
  "addressList":[
    {
      "addressId": String,
      "userName": String,
      "streetName": String,
      "postCode": Number,
      "tel": Number,
      "isDefault": Boolean
    }
  ]
});

module.exports = mongoose.model("User",userSchema);
