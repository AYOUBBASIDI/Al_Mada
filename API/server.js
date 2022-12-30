const express = require('express');
const { buildSchema } = require('graphql');
const express_graphql = require('express-graphql').graphqlHTTP;
const csv = require("csv-parser");
const fs = require("fs");
const connectDb = require("./config/db")
const MongoClient = require("mongodb").MongoClient;
const uri = 'mongodb+srv://bsddb:1ubzJ7bnPu9yJ1rK@cluster0.eoqwdpr.mongodb.net/?retryWrites=true&w=majority';

// GraphQL schema
const schema = buildSchema(`
    type Query {
        documents: [Document]!
    }
    type Mutation {
        importData: String
        deleteData: String
    }
    type Document {
        IPR : String!
        Designation : String!
        Status : String!
        Number : String!
        Office : String!
        Owner : String!
    }

`);

// coursesData example
// const coursesData = [
//     {
//         id: 1,
//         title: 'The Complete Node.js Developer Course',
//         author: 'Andrew Mead, Rob Percival',
//         description: 'Learn Node.js by building real-world applications with Node, Express, MongoDB, Mocha, and more!',
//         topic: 'Node.js',
//         url: 'https://codingthesmartway.com/courses/nodejs/'
//     },
//     {
//         id: 2,
//         title: 'Node.js, Express & MongoDB Dev to Deployment',
//         author: 'Brad Traversy',
//         description: 'Learn by example building & deploying real-world Node.js applications from absolute scratch',
//         topic: 'Node.js',
//         url: 'https://codingthesmartway.com/courses/nodejs-express-mongodb/'
//     },
//     {
//         id: 3,
//         title: 'JavaScript: Understanding the Weird Parts',
//         author: 'Anthony Alicea',
//         description: 'An advanced JavaScript course for everyone! Scope, closures, prototypes, this, build your own framework, and more.',
//         topic: 'JavaScript',
//         url: 'https://codingthesmartway.com/courses/understand-javascript/'
//     }
// ];

// const db = connectDb();

// const getCourse = function (args) {
//     const id = args.id;
//     return coursesData.filter(course => {
//         return course.id == id;
//     })[0];
// }

// const getCourses = function (args) {
//     if (args.topic) {
//         const topic = args.topic;
//         return coursesData.filter(course => course.topic === topic);
//     } else {
//         return coursesData;
//     }
// }

// const updateCourseTopic = function ({ id, topic }) {
//     coursesData.map(course => {
//         if (course.id === id) {
//             course.topic = topic;
//             return course;
//         }
//     });
//     return coursesData.filter(course => course.id === id)[0];
// }

const importData = function () {
    fs.createReadStream('mada.csv')
    .pipe(csv())
    .on('data', (row) => {
        MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
            if (err) {
                console.log(err);
                return;
            }else{
            const db = client.db("Mada");
            db.collection("test").insertOne(row, function(err, result) {
            client.close();
            });
            }
        });
        }).on('end', () => {
            console.log('CSV file successfully processed');
        });
    return "Data imported";
}

const deleteData = function () {
    MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
        if (err) {
            console.log(err);
            return;
        }else{
            const db = client.db("Mada");
            db.collection("test").deleteMany({}, function(err, result) {
            client.close();
            });

        }
    });
    return "Data deleted";
}

const getData = function () {
    MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
        if (err) {
            console.log(err);
            return {"IPR":"test","Designation":"test","Status":"test","Number":"test","Office":"test","Owner":"test"};
        }else{
            const db = client.db("Mada");
            db.collection("test").find({}).toArray(function(err, result) {
            client.close();
            
            });
        }
        return {"IPR":"test","Designation":"test","Status":"test","Number":"test","Office":"test","Owner":"test"};
    });
}



// Root resolver
const root = {
    course: getCourse,
    courses: getCourses,
    importData:importData,
    deleteData : deleteData,
    documents: getData
};

// Create an express server and a GraphQL endpoint
const app = express();
app.use('/graphql', express_graphql({
    schema: schema,
    rootValue: root,
    graphiql: true
}));

app.listen(8081, () => console.log('Express GraphQL Server Now Running On localhost:8080/graphql'));
