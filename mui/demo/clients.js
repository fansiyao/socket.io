var http=require('http')
http.get('http://api.mobile.meituan.com/group/v4/poi/pcsearch/10?uuid=4bcd54079895643dc75d.1505045958.0.0.0&userid=-1&limit=32&offset=0&areaId=-1&cateId=11&q=%E7%94%9C%E7%82%B9%E9%A5%AE%E5%93%81&sort=price',(res)=>{
  let data=''
  res.on('data',(chunk)=>{
    data+=chunk
  });
  res.on('end',()=>{
    let result=data
    console.log(result)
  })
})
