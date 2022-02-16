const mongodbConfig = require('../../config/config.json').mongo
const uri = mongodbConfig.uri
const { MongoClient } = require('mongodb')
const client = new MongoClient(uri)

async function sendMessage(from, to, message, time) {
  try {
    await client.connect()

    const database = client.db('chat')
    const messageCollection = await database.collection('message')
    const query = {
      from: from,
      to: to,
      message: message,
      time: time,
    }
    await messageCollection.insertOne(query)
    return new Promise((resolve, reject) => {
      resolve()
    })
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close()
  }
}

async function getMessage(from, to) {
  try {
    await client.connect()

    const database = client.db('chat')
    const messageCollection = await database.collection('message')
    const query = {
      from: from,
      to: to,
    }
    const query2 = {
      from: to,
      to: from,
    }
    const result = await messageCollection
      .find({ $or: [query, query2] })
      .toArray()
    return new Promise((resolve, reject) => {
      resolve(result)
    })
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close()
  }
}

module.exports = {
  sendMessage,
  getMessage,
}
