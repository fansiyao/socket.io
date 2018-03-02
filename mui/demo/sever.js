var f=require('./demo')
f.b()
var http=require('http')
var url=require('url')
var util=require('util')
http.createServer((req,res)=>{
  res.statusCode=200
  res.setHeader('Content-Type','text/plain;charset=utf-8')

  res.end( util.inspect(url.parse(req.url)))
}).listen(3005,()=>{
  console.log(",,,")
})
