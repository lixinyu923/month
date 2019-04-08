const express = require('express');
const router = express.Router();
const mongo=require("mongodb-curd");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//获取收货地址的查询接口
router.get('/api/getData', function(req, res, next) {
 
    mongo.find("month","address",function(result){
      if(!result){
        res.send({code:0,result:"error"})
      }else{
        res.send({code:1,result:result})
      }
    })
});

router.get("/api/getDataone", function(req, res, next) {
  let {_id}=req.query;

  console.log(_id);
  if(!_id){
   return res.send({code:2,result:"参数不完整"})
  }

    mongo.find("month","address",{_id:_id},function(result){
      if(!result){
        res.send({code:0,result:"error"})
      }else{
        res.send({code:1,result:result})
      }
    })
  
  
});

//获取收货地址的添加接口
router.post('/api/addData', function(req, res, next) {
  let {
    name,
    phone,
    number,
    address,
    adrscont
  }=req.body
  if( !name|| !phone|| !address|| !adrscont){
    return res.send({code:2,result:"参数不完整"})
  }
  mongo.insert("month","address",req.body,function(result){
    if(!result){
      res.send({code:0,result:"error"})
    }else{
      res.send({code:1,result:result})
    }
  })
});

//获取收货地址的修改接口
router.post('/api/upData', function(req, res, next) {
  let { name,
    phone,
    number,
    address,
    adrscont,id}=req.body
  if(!id){
    return res.send({code:2,result:"参数不完整"})
  }
  mongo.update("month","address",[{_id:id},{ name:name,phone:phone,number:number,address:address,adrscont:adrscont}],function(result){
    if(!result){
      res.send({code:0,result:"error"})
    }else{
      res.send({code:1,result:result})
    }
  })
});

//获取收货地址的删除接口
router.get('/api/revData', function(req, res, next) {
  let {_id}=req.query
  if(!_id){
    return res.send({code:2,result:"参数不完整"})
  }
  mongo.remove("month","address",{_id:_id},function(result){
    if(!result){
      res.send({code:0,result:"error"})
    }else{
      res.send({code:1,result:result})
    }
  })
});

module.exports = router;
