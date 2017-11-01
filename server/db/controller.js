// database controller

const {MongoClient, ObjectId} = require('mongodb')

class Controller {
  // open connection to mongo
  async connect(collection) {
    try {
    const connected = await MongoClient.connect('mongodb://localhost:27017/db')
    this.db = connected
    this.collection = collection
      return 'Connected to database'
    } catch (error) {
      console.error('Failed to connect to database', error)
      return error
    }
  }

  // close connection to mongo
  async close() {
    try {
      this.db.close()
      return 'Database closed successfully'
    } catch (error) {
      console.error('Failed to close to database', error)
      return error
    }
  }

  // add todo
  async addItem({code, data}) {
    const {db, collection } = this
    try {
      const ok = await db.collection(collection).insert({
        code: code,
        _id: ObjectId(),
        info: data
      })
      return ok
    } catch (error) {
      return error
    }
  }

  // get all todos
  async getAll(code) {
    const {db, collection } = this

    try {
      const todos = await db.collection(collection).find({code:code}).toArray()
      return todos
    } catch (error) {
      return error
    }
  }

  // delete todo by id
  async deleteItem({code, id}) {
    const {db, collection } = this
    try {
      const ok = await db.collection(collection).deleteOne({
        code: code,
        _id:ObjectId(id)
      })
      return ok
    } catch (error) {
      return error
    }
  }

  // modifies item
  async modifyItem({code, data, id}) {
    const {db, collection } = this

    try {
      const ok = await db.collection(collection).updateOne({
        code: code,
        _id: ObjectId(id)
      },{
        info:data
      })
      return ok
    } catch (error) {
      return error
    }
  }
}

module.exports = new Controller()
