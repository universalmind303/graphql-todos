const {MongoClient, ObjectId} = require('mongodb')


const ctrl = require("../db/controller")

const resolvers = {
  // Query
  Query: {

    // TODO -- USER views
    // retrieve user
    User: async (root) => {
      try {
        let user = await ctrl.getUser()
        return user.toString()
      } catch (e) {
        console.error(e.Error)
        return e
      }
    },
    // retrieve array of all todos 
    Todos: async () => {
      try {
        let todos = await ctrl.getAll()
        return todos.map(({_id, info}) => ({id: _id, info: info}))
      } catch (error) {
        console.log(error.Error)
        return error
      }
    }
  },

  // Mutations
  Mutation: {
    addItem: async (root, {item}) => {
      
      // message == error message
      let {message, result} = await ctrl.addItem(item)
      if(message) {
        console.error(message)
        return message
      } else {
        return `${item} added to database successfully`
      }
    },

    modifyItem: async (root, {id, item}) => {
      let {result} = await ctrl.modifyItem(id, item)
      if(!result.nModified) {
        console.error(`request failed please check id: ${id}`)
        return `request failed please check id: ${id}`
      } else {
        return `${item} added to database successfully`
      }
    },

    deleteItem: async (root, {id}) => {
      let {result, message} = await ctrl.deleteItem(id)
      if(message) {
        console.error(message)
        return message
      } else {
        return result.n !== 1 ? "Item Does not exist" : "Item Deleted Successfully!"    
      }
    }
  }
}

module.exports = resolvers