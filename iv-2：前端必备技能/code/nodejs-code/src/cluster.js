const http = require('http')
const cpuCoreLength = require('os').cpus().length
const cluster = require('cluster')

if (cluster.isMaster) {
    for (let i = 0; i < cpuCoreLength; i++) {
        cluster.fork() // 开启子进程
    }

    cluster.on('exit', worker => {
        console.log('子进程退出')
        cluster.fork() // 进程守护
    })
} else {
    // 多个子进程会共享一个 TCP 连接，提供一份网络服务
    const server = http.createServer((req, res) => {
        res.writeHead(200)
        res.end('done')
    })
    server.listen(3000)
}


// 工作中 PM2
