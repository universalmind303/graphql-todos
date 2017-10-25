const schema = `
type Todo {
  id: ID!
  info: String
}
type Query {
  User: String
  Todos: [Todo]
}
type Mutation {
  addItem(item: String!): String
  deleteItem(id: ID!): String
  modifyItem(id: ID!, item: String!): String
}
`
module.exports = {schema: schema}