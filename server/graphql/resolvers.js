const {MongoClient, ObjectId} = require('mongodb')
const ctrl = require('../db/controller')

const resolvers = {
  // Query
  Query: {

    // sends back the user code
    userResolver: ({session: {code}}) => code,

    
    // retrieve array of all todos 
    todosResolver: async ({session: {code}}) => {
      console.log("Xxxxxxxxxxxxxx")
      try {
        const todos = await ctrl.getAll(code)
        return todos.map(({_id, info}) => ({id: _id, data: info}))
      } catch (error) {
        console.log(error.Error)
        return error
      }
    }
  },



  // Mutations
  Mutation: {
    addItem: async ({session: {code}}, {input}) => {
      const  {data } = input
      // message == error message
      const {message, result} = await ctrl.addItem({code, data})
      if(message) {
        console.error(message)
        return message
      } else {
        return `${data} added to database successfully`
      }
    },


    deleteItem: async ({session: {code}}, {id}) => {
      const {result, message} = await ctrl.deleteItem({code, id})
      if(message) {
        console.error(message)
        return message
      } else {
        return result.n !== 1 ? 'Item Does not exist' : 'Item Deleted Successfully!'    
      }
    },
    modifyItem: async ({session: {code}}, {input: {id, data}}) => {
      const {result} = await ctrl.modifyItem({code, data, id})
      if(!result.nModified) {
        console.error(`request failed please check id: ${id}`)
        return `request failed please check id: ${id}`
      } else {
        return `${data} added to database successfully`
      }
    },
  }
}

module.exports = resolvers