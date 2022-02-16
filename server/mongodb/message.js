const { MongoClient } = require('mongodb')

// Replace the uri string with your MongoDB deployment's connection string.
const uri =
  'mongodb+srv://chat:q1q1q1q1@cluster0.7sasm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

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

module.exports = {
  sendMessage,
}
