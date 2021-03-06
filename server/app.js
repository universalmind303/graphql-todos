const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');

// env variables for production
const directory = process.env.PUBLIC || '../client/dist';
const port = process.env.PORT || 8000;
const app = express()

//db controller
const ctrl = require("./db/controller")

// custom middleware
const {stripQuery} = require('./middleware')

//graphql related
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const  { makeExecutableSchema } = require('graphql-tools');
const { schema } = require("./graphql/schema")
const resolvers = require("./graphql/resolvers")

const App =  async () => {
  try {

    // some middleware
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json())
    app.use(session({secret: 'some secret', resave: false, saveUninitialized: false, maxAge:60000}));
    app.use(stripQuery)
    app.use("/", express.static(directory))

    // connect to db 1st argument is collection name
    ctrl.connect('todos')

    // graphql endpoint
    app.use('/graphql',
      graphqlExpress((request) => ({
        session: request.session,
        rootValue: {session: request.session},
        schema: schema
      }))
    );
    app.get('/graphiql', graphiqlExpress({ endpointURL: '/graphql'})); // if you want GraphiQL enabled

    //404
    app.use((req, res, next) => {
      const err = new Error(`ERROR 404 Sorry can't find what you're looking for!`);
      err.status = 404;
      next(err);
    });

    // 500
    app.use( (err, req, res) => {
      console.log('UNKNOWN ERROR')
      console.log(err.stack);
      const status = err.status || 500;
      res.status(status).send(err.message);
    });
    // serve
    app.listen(port, ()=> console.log(`Server is listening on port: ${port}`))
  } catch (e) { console.log("error",e)}
}

module.exports = App();
