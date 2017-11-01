
const {
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLScalarType,
  GraphQLID,
  GraphQLList,
  GraphQLString,
  GraphQLSchema } = require('graphql');

const {
  Query: { userResolver, todosResolver } , 
  Mutation: { addItem, deleteItem, modifyItem }
} = require('./resolvers')

const todosType = new GraphQLObjectType({
  name: "Todo",
  fields: {
    id: { type: GraphQLString},
    data: { type: GraphQLString},
  }
});
const todoMutation = new GraphQLInputObjectType({
  name: 'TodoMutation',
  fields : {
    id: { type: GraphQLString },
    data: { type: GraphQLString },
  }
})


const queryType = new GraphQLObjectType({
  name: 'Query',
  fields : {
    User: {
      type: GraphQLString,
      resolve: userResolver
    },
    Todos: {
      type: new GraphQLList(todosType), 
      resolve: todosResolver
    }
  },
})

const mutationType = new GraphQLObjectType({
  name: "Mutation", 
  fields : {
    deleteItem: {
      type: GraphQLString,
      args : {
        id : { type: GraphQLString }
      },
      resolve: deleteItem, 
    }, 
    addItem : {
      type: GraphQLString,
      args : {
        input : { type : todoMutation }
      },
      resolve: addItem
    },
    modifyItem: {
      type: GraphQLString,
      args: {
        input: { type: todoMutation }
      },
      resolve: modifyItem, 
    },
  },
})

const dynamicSchema = new GraphQLSchema({
  query: queryType,
  mutation: mutationType
})


module.exports = { schema: dynamicSchema }