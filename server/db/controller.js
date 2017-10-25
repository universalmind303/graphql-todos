// database controller


const {MongoClient, ObjectId} = require('mongodb')

// just a simple counter for ids. -- todo implement better id tracker
var counter = 0
const tick = () => counter++

class Controller {
  // open connection to mongo
  async connect() {
    try {
    let connected = await MongoClient.connect('mongodb://localhost:27017/db')
    this.db = connected
      return "Connected to database"
    } catch (error) {
      console.error("Failed to connect to database", error)
      return err
    }
  }

  // TODO
  async setUser(user) {
    this.user = user
  }
  // get user -- TODO
  // async getUser() {
  //   try {
  //     return this.user
  //   } catch(error) {
  //     return error
  //   }
  // }

  // close connection to mongo
  async close() {
    try {
      this.db.close()
      return "Database closed successfully"
    } catch (error) {
      console.error("Failed to close to database", error)
      return err
    }
  }

  // add todo
  async addItem(data) {
    try {
      let ok = await this.db.collection("Todo").insert({_id: tick().toString(), info: data,})
      return ok
    } catch (error) {
      return error
    }
  }

  // get all todos
  async getAll() {
    try {
      let todos = await this.db.collection("Todo").find({}).toArray()
      return todos
    } catch (error) {
      return error
    }
  }

  // delete todo by id
  async deleteItem(id) {
    try {
      let ok = await this.db.collection("Todo").deleteOne({"_id":id})
      return ok
    } catch (error) {
      return error
    }
  }

  // modifies item
  async modifyItem(id,item) {
    try {
      let ok = await this.db.collection("Todo").updateOne({"_id": id}, {"info":item})
      return ok
    } catch (error) {
      return error
    }
  }
}

module.exports = new Controller()