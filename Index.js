const http =require('http');
const fs=require('fs');
const path=require('path');

let server=http.createServer();
console.log('server-----start');
server.on('request',(reqMsg,rsp)=>{
    let url=reqMsg.url;
    if(url.indexOf('/favicon.ico') != -1) return ;
    //日志
    let nowDate=new Date();
    let fileName=nowDate.getFullYear()+'_'+(nowDate.getMonth()+1)+'_'+nowDate.getDate()+'.txt';
    let filePath=path.join(__dirname,'./log/')
    if(!fs.existsSync(filePath)){
        fs.mkdirSync(filePath);
    }
    filePath+=fileName;
    let data=reqMsg.connection.remoteAddress+'\n';
    
    fs.appendFile(filePath,data,'utf8',function(err){
        if(err)
        {
            console.log(err);
        }
    });

    rsp.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});

    if(url.indexOf('/serverCtrl=close') != -1){
        rsp.end('服务器已停止');
        console.log('server-----close');
        setTimeout(()=>{
            server.close();
        },100);
        return;
    }

    rsp.end('猪猪爱你么么哒');
});

server.listen(8080);