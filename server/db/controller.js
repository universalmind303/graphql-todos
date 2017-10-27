// database controller

const {MongoClient, ObjectId} = require('mongodb')

class Controller {
  // open connection to mongo
  async connect() {
    try {
    const connected = await MongoClient.connect('mongodb://localhost:27017/db')
    this.db = connected
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
    try {
      const ok = await this.db.collection(code).insert({_id: ObjectId(), info: data})
      return ok
    } catch (error) {
      return error
    }
  }

  // get all todos
  async getAll(code) {
    try {
      const todos = await this.db.collection(code).find({}).toArray()
      return todos
    } catch (error) {
      return error
    }
  }

  // delete todo by id
  async deleteItem({code, id}) {
    try {
      const ok = await this.db.collection(code).deleteOne({'_id':ObjectId(id)})
      return ok
    } catch (error) {
      return error
    }
  }

  // modifies item
  async modifyItem({code, data, id}) {
    try {
      const ok = await this.db.collection(code).updateOne({'_id': ObjectId(id)}, {'info':data})
      return ok
    } catch (error) {
      return error
    }
  }
}

module.exports = new Controller()