const { buildSchema } = require('graphql');

const schema = buildSchema(`
    type Query {
        documents: [Document]!
    }
    type Mutation {
        importData: String!
        deleteData: String!
    }
    type Document {
        _id : String!
        Name : String!
        IPR : String!
        Designation : String!
        Status : String!
        Status_date : String!
        Number : String!
        Office : String!
        Nice_classification : String!
        Owner : String!
    }
`);

module.exports = schema;