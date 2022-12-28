const MongoClient = require("mongodb").MongoClient;

const connectDB = async () => {
    const uri = 'mongodb+srv://bsddb:1ubzJ7bnPu9yJ1rK@cluster0.eoqwdpr.mongodb.net/?retryWrites=true&w=majority';
    MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
        if (err) {
            console.log(err);
            return;
        }else{
            console.log('connected to db');
            const db = client.db("Mada");
            return db;
        }
    });
};
  
module.exports = connectDB;
