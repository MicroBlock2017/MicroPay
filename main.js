
const ocrpath="C:/Program Files (x86)/Tesseract-OCR"


var money=0;
function onpay(mone){
    try{

        //你支付成功后要干的动作
    nowc.send("payok",mone);
    onend();


}catch{
        console.log("    回调出错")
    }
}
function chk(){
var screenshot = require('desktop-screenshot'),jimp=require("jimp");
var exec = require('child_process').execFile;
var fs=require("fs");
var moment = require('moment');

screenshot("screenshot.jpg", function(error, complete) {
    if(error){
        console.log("Screenshot failed", error);
        return 0;
    }
    else{
        async function main() {
            const image = await jimp.read('screenshot.jpg');
            const mask = await jimp.read('mask.png');
            await image.mask(mask);
            await image.background(0xFFFFFFFF);
            await image.writeAsync('wx.jpg');
        }
        main().then(function(){
            exec(ocrpath+'/tesseract.exe',[process.cwd()+'/wx.jpg',process.cwd()+'/result','-l','eng'], function(err, data) {  
                var a=fs.readFileSync('result.txt');
                
                try{
                    const nowmoney=eval(a.toString().split("\n")[0].replace("¥","").replace("Â",""));
                    
                    if(money<nowmoney){
                        if(money==0){
                            money=nowmoney
                            return 0;
                        }
                        console.log("目前收钱数量："+nowmoney)
const adda=Math.round((nowmoney-money)*10000)/10000;
                        console.log("收款："+adda+"元");
                        onpay(adda);
                        money=nowmoney
                        
                        
                    }
                    else if(money!=nowmoney){
                        console.log("OCR出错！")
                        setTimeout(chk,3000);
                        console.log("3s后重试")
                    }
                    
                    setTimeout(chk,1000);
                }
                catch{
                    console.log("OCR出错！")
                    setTimeout(chk,3000);
                    console.log("3s后重试")
                }
            });
        })
    }
});
}
chk();


var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/website/index.html');
});

app.get('/style.css', (req, res) => {
    res.sendFile(__dirname + '/website/style.css');
  });

  app.get('/loading.js', (req, res) => {
    res.sendFile(__dirname + '/website/loading.js');
  });

  app.get('/socket.io-client/dist/socket.io.js', (req, res) => {
    res.sendFile(__dirname + '/website/socket.io-client/dist/socket.io.js');
  });

  app.get('/socket.io-client/dist/socket.io.js.map', (req, res) => {
    res.sendFile(__dirname + '/website/socket.io-client/dist/socket.io.js.map');
  });

  app.get('/wechatpay.png', (req, res) => {
    res.sendFile(__dirname + '/website/wechatpay.png');
  });

  app.get('/fakeqr.png', (req, res) => {
    res.sendFile(__dirname + '/website/fakeqr.png');
  });

  app.get('/micropay.png', (req, res) => {
    res.sendFile(__dirname + '/website/micropay.png');
  });

  app.get('/payed.html', (req, res) => {
    res.sendFile(__dirname + '/website/payed.html');
  });

  app.get('/qrcode.png', (req, res) => {
    res.sendFile(__dirname + '/website/qrcode.png');
  });

  app.get('/payok.png', (req, res) => {
    res.sendFile(__dirname + '/website/payok.png');
  });

var listr=[];
io.on('connection', (socket) => {
    listr.push(socket);
    socket.send("testmsg")
  console.log('用户已连接：队列人数：'+listr.length);
  io.emit("listlength",listr.length)
  socket.on('disconnect', () => {
      io.emit('reconnect');
    listr=[];
    setTimeout(function(){
    console.log('一个用户断联，队列人数：'+listr.length);

},1000)
  });
});

io.on('rec',(socket)=>{
listr=[];
})
var nowc,jb;
function onend(){
if(listr.length!=0){
    clearTimeout(jb);
nowc=listr.pop()
console.log("一个用户开始支付")
nowc.send("start");
jb=setTimeout(function(){
    nowc.send("timeout");
    onend()
    console.log("一个用户超时")
},300000);

}else{
    setTimeout(onend,1000);
}
}



http.listen(3000, () => {
  console.log('listening on *:3000');
  onend()
});