
var socketHander={
  save_socketId:function(userId,socketId) {
    var User = require('./../models/user');
    User.update({"userId": userId}, {
      $set: {socketId: socketId}
    }, function (err, doc) {

    });
  },
  seach_socketId:function(userId){
    return new Promise(function(resolve, reject) {
      var User = require('./../models/user');
      var sockedId = null;
      User.findOne({userId: userId}, function (err, doc) {
        if (err) {
        } else {

          sockedId=doc.socketId;

          resolve(sockedId)
        }
      });



    })
  }



};

module.exports=socketHander;