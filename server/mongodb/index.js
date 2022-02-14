const { MongoClient } = require('mongodb')

// Replace the uri string with your MongoDB deployment's connection string.
const uri =
  'mongodb+srv://chat:q1q1q1q1@cluster0.7sasm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

const client = new MongoClient(uri)

async function insertUser(user) {
  try {
    await client.connect()

    const database = await client.db('chat')
    const users = await database.collection('users')
    const query = user
    await users.insertOne(query)
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close()
  }
}

async function findUser(user, updateFlag = false) {
  try {
    await client.connect()

    const database = await client.db('chat')
    const users = await database.collection('users')
    const result = updateFlag
      ? await users.findOneAndUpdate(
          { name: user.name },
          {
            $set: user,
          }
        )
      : await users.findOne({ name: user.name })
    return result
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close()
  }
}

async function findAllUser() {
  try {
    await client.connect()

    const database = await client.db('chat')
    const users = await database.collection('users')
    const result = await users.find().toArray()
    return result
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
