const EVENT = require('../config/socket.json').event
const server = require('http').createServer()
const io = require('socket.io')(server)
const { insertUser, findUser, findAllUser } = require('./mongodb/index')
const { sendMessage } = require('./mongodb/message')
const currentUserList = []
io.on('connection', (socket) => {
  socket.on(EVENT.REGISTER, async function (data) {
    const name = data.name
    if (!name) {
      return
    }

    const user = {
      name: name,
      socketId: socket.id,
    }
    const currentUser = currentUserList.find((item) => item.name === name)
    if (!currentUser) {
      currentUserList.push(user)
    } else {
      currentUser.socketId = socket.id
    }
    console.log(currentUserList)
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
    const targetSocketId = currentUserList.find(
      (user) => user.name === to
    ).socketId
    io.to(targetSocketId).emit(EVENT.RECEIVE_MESSAGE, message)
  })

  socket.on('disconnect', function () {
    // roomInfo = roomInfo.filter((item) => item.socketId !== socket.id)
  })
})

const defaultSettings = require('../config/socket.json')
const { Logger } = require('sass')
const port = defaultSettings.port

server.listen(port)
