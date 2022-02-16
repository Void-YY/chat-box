const EVENT = require('../config/socket.json').event
const server = require('http').createServer()
const io = require('socket.io')(server)
const { insertUser, findUser, findAllUser } = require('./mongodb/index')
const { sendMessage } = require('./mongodb/message')
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
      await insertUser(user, true).catch(console.dir)
    }
    const allUsers = await findAllUser().catch(console.dir)

    io.emit(EVENT.UPDATE_USER_LIST, allUsers)
  })

  socket.on(EVENT.SEND_MESSAGE, async function (data) {
    const { from, to, message } = data
    const targetUser = await findUser({ name: to }, false).catch(console.dir)
    await sendMessage(from, targetUser, message).catch(console.dir)
    console.info('sendMessage:', targetUser)
    io.to(targetUser.socketId).emit(message)
  })

  socket.on('disconnect', function () {
    // roomInfo = roomInfo.filter((item) => item.socketId !== socket.id)
  })
})

const defaultSettings = require('../config/socket.json')
const { Logger } = require('sass')
const port = defaultSettings.port

server.listen(port)
