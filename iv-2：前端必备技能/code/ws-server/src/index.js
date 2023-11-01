const { WebSocketServer } = require('ws')

const wsServer = new WebSocketServer({ port: 3000 })

const list = new Set()

wsServer.on('connection', curWs => {
    console.info('connected')

    // 这里，不能一直被 add 。实际使用中，这里应该有一些清理缓存的机制，长期用不到的 ws 要被 delete
    list.add(curWs)

    curWs.on('message', msg => {
        console.info('received message', msg.toString())

        // 传递给其他客户端
        list.forEach(ws => {
            if (ws === curWs) return
            ws.send(msg.toString())
        })
    })
})
