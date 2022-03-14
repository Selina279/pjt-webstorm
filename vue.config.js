let proxyObj={};
//目标转换地址，利用Node转发给后端，把拦截到的http请求转换到8081端口
proxyObj['/']={
    ws:false,
    target:'http://localhost:8081',
    changeOrigin: true,
    pathRewrite:{
        '^/':''
    }
}
module.exports={
    devServer:{
        host:'localhost',
        port:8080,
        proxy:proxyObj
    }
}