const mongodbConfig = require('../../config/config.json').mongo
const uri = mongodbConfig.uri
const { MongoClient } = require('mongodb')
const client = new MongoClient(uri)

async function insertUser(user) {
  try {
    await client.connect()

    const database = client.db('chat')
    const users = await database.collection('users')
    const query = user
    await users.insertOne(query)
    return new Promise((resolve, reject) => {
      resolve()
    })
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close()
  }
}

async function findUser(user) {
  try {
    await client.connect()

    const database = client.db('chat')
    const users = await database.collection('users')
    const result = await users.findOne({ name: user.name })

    return new Promise((resolve, reject) => {
      resolve(result)
    })
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close()
  }
}

async function findAllUser() {
  try {
    await client.connect()

    const database = client.db('chat')
    const users = await database.collection('users')
    const result = await users.find().toArray()

    return new Promise((resolve, reject) => {
      resolve(result)
    })
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close()
  }
}

module.exports = {
  insertUser,
  findUser,
  findAllUser,
}
