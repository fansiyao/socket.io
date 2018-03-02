var express = require('express');
var router = express.Router();
require('util');
var Message = require('../models/messages');
var upload = require('../fileuploads');


router.get("/chatting", function (req,res,next) {

  var userId = req.cookies.userId;
  var toId=req.query.otherId;
  Message.find({$or:[{toId:toId,fromId:userId},{toId:userId,fromId:toId}]}, function (err,doc) {
    if(err){
      res.json({
        status:'1',
        msg:err.message,
        result:''
      });
    }else{

      res.json({
        status:'0',
        msg:'',
        result:doc
      });
    }
  })
});
router.post("/saveChatting", function (req,res,next) {

  var param=req.body;

  Message.create(param,(err,result)=>{
    if(err){
      console.log(err)
    }else {
      res.json({
        status:'0',
        msg:'',
        result:''
      });
    }

  });

});

router.post('/upload',upload.single('avatar'),function (req,res,next) {
  console.log(req);

  if (req.file) {
    res.send({code:0,message:'文件上传成功',result:req.file});
    console.log(req.file);
    console.log(req.body);
  }
});
module.exports = router;
