var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Goods = require('../models/goods');

//连接MongoDB数据库
mongoose.connect('mongodb://root:XH7p7ugi@dds-uf674959aaef11741169-pub.mongodb.rds.aliyuncs.com:3717/admin?replicaSet=mgset-4949427',{
    useMongoClient: true,
  /* other options */
});

mongoose.connection.on("connected", function () {
  console.log("MongoDB connected success.")
});

mongoose.connection.on("error", function () {
  console.log("MongoDB connected fail.")
});

mongoose.connection.on("disconnected", function () {
  console.log("MongoDB connected disconnected.")
});

//查询商品列表数据
router.get("/list", function (req,res,next) {

  let page = parseInt(req.param("page"));
  let pageSize = parseInt(req.param("pageSize"));
  let priceLevel = req.param("priceLevel");
  let sort =parseInt(req.param("sort"));
  let skip = (page-1)*pageSize;
  var priceGt = '',priceLte = '';
  let params = {};
  if(priceLevel!='all'){
    switch (priceLevel){
      case '0':priceGt = 0;priceLte=100;break;
      case '1':priceGt = 100;priceLte=500;break;
      case '2':priceGt = 500;priceLte=1000;break;
      case '3':priceGt = 1000;priceLte=5000;break;
    }
    params = {
        productPrice:{
                $gt:priceGt,
                $lte:priceLte
        }
    }
  }
  let goodsModel = Goods.find(params).skip(skip).limit(pageSize);
  goodsModel.sort({'productPrice':sort});
  goodsModel.exec(function (err,doc) {

    res.json({
      status:'0',
      msg:'',
      result:{
        count:doc.length,
        list:doc
      }
    });
      if(err){
          res.json({
            status:'1',
            msg:err.message
          });
      }else{

      }
  })
});

//加入到购物车
router.post("/addCart", function (req,res,next) {
  var userId = req.cookies.userId,productId = req.body.productId;
  var User = require('../models/user');

  User.findOne({userId:userId}, function (err,userDoc) {
    if(err){
        res.json({
            status:"1",
            msg:err.message
        })
        console.log(err.message)
    }else{

        if(userDoc){

          var goodsItem = '';
          userDoc.cartList.forEach(function (item) {
              if(item.productId == productId){
                  goodsItem = item;
                  goodsItem.productNum ++;
              }
          });
          if(goodsItem){
            userDoc.save(function (err2,doc2) {
              if(err2){

                res.json({
                  status:"1",
                  msg:err2.message
                })
              }else{
                console.log('成功了')
                res.json({
                  status:'0',
                  msg:'',
                  result:doc2
                })
              }
            })
          }else{
            console.log('else')
            Goods.findOne({productId:productId}, function (err1,doc) {
              if(err1){
                res.json({
                  status:"1",
                  msg:err1.message
                })
              }else{
                if(doc){
                  doc={
                      "productId":doc.productId,
                      "productName":doc.productName,
                      "productPrice":doc.productPrice,
                      "prodcutImg":doc.prodcutImg,
                      "checked":0,
                      "productNum":1
                  }
                  console.log(doc)
                  userDoc.cartList.push(doc);
                  userDoc.save(function (err2,doc2) {
                    if(err2){
                      res.json({
                        status:"1",
                        msg:doc
                      })
                    }else{
                      res.json({
                        status:'0',
                        msg:'',
                        result:doc
                      })
                    }
                  })
                }
              }
            });
          }
        }
    }
  })
});

module.exports = router;
