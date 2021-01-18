const io = require('socket.io')
let socketServer = null

module.exports = (app, server) => {
  if (socketServer) return socketServer

  socketServer = io(server)

  socketServer.on('connection', (socket) => {
    console.log('socket connected')
  })

  return socketServer
}
