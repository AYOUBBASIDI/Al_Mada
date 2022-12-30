const express = require('express');
const express_graphql = require('express-graphql').graphqlHTTP;
const connectToDb = require("./config/db")
const schema = require('./schema/schema');
const root = require('./resolvers/resolvers');

connectToDb()
  .then(() => {
    const app = express();
    app.use('/graphql', express_graphql({
      schema: schema,
      rootValue: root,
      graphiql: true
    }));
    app.listen(8080, () => console.log('Express GraphQL Server Now Running On localhost:8080/graphql'));
  })
  .catch((err) => {
    console.log("Error connecting to the database:", err);
});
