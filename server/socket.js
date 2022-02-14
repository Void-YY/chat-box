const EVENT = require('../config/socket.json').event
const server = require('http').createServer()
const io = require('socket.io')(server)
const { insertUser, findUser, findAllUser } = require('./mongodb/index')
io.on('connection', (socket) => {
  socket.on(EVENT.REGISTER, async function (data) {
    console.log(data)

    const name = data.name
    if (!name) {
      return
    }

    const user = {
      name: name,
      socketId: socket.id,
    }
    const existUser = await findUser(user, false).catch(console.dir)
    console.warn('existUser:', existUser)
    if (!existUser) {
      await insertUser(user).catch(console.dir)
    }
    const allUsers = await findAllUser().catch(console.dir)

    io.emit(EVENT.UPDATE_USER_LIST, allUsers)
  })

  socket.on('disconnect', function () {
    // roomInfo = roomInfo.filter((item) => item.socketId !== socket.id)
  })
})

const defaultSettings = require('../config/socket.json')
const port = defaultSettings.port

server.listen(port)
