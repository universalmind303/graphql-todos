const schema = `
type Todo {
  id: ID!
  data: String
}

type Query {
  User: String
  Todos: [Todo]
}
input TodoMutation {
  id: ID
  data: String
}
type Mutation {
  addItem(input: TodoMutation): String
  deleteItem(id: String!): String
  modifyItem(input: TodoMutation): String
}
`
module.exports = {schema: schema}