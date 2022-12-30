const MongoClient = require("mongodb").MongoClient;

const connectToDb = async () => {
    const uri = 'mongodb+srv://bsddb:1ubzJ7bnPu9yJ1rK@cluster0.eoqwdpr.mongodb.net/?retryWrites=true&w=majority';
    try {
      const client = await MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
      const db = client.db("Mada");
      return db;
    } catch (err) {
      console.log(err);
      return null;
    }
  };
  
module.exports = connectToDb;
