var http=require('http')
var url=require('url')
var util=require('util')
var fs=require('fs')
http.createServer((req,res)=>{
//  res.statusCode=200
//  res.setHeader('Content-Type','text/plain;charset=utf-8')
 // fs.readFile();
  var pathname=url.parse(req.url).pathname;
  fs.readFile(pathname.substring(1),(err,data)=>{
    if(err){
      res.writeHead(404,{
        'Content-Type':'text/html'
      })
    }else {
      res.writeHead(200,{
        'Content-Type':'text/html'
      })
      res.write(data.toString())
    }
    res.end()
  })
}).listen(3006,()=>{
  console.log(",,,")
})
