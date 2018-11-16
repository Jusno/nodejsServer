const http =require('http');

let server=http.createServer();
console.log('server-----start');
server.on('request',(reqMsg,rsp)=>{
    let url=reqMsg.url;
    if(url.indexOf('/favicon.ico') != -1) return ;
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