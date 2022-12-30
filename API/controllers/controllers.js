const csv = require("csv-parser");
const fs = require("fs");
const connectToDb = require("../config/db")

const importData = async function () {
    try {
      const db = await connectToDb();
      if (!db) {
        return "Error connecting to the database";
      }
      fs.createReadStream('mada.csv')
        .pipe(csv())
        .on('data', (row) => {
          db.collection("test").insertOne(row, function (err, result) {

    
          });
        }).on('end', () => {
          console.log('CSV file successfully processed');
        });
      return "Data imported";
    } catch (err) {
      console.log(err);
      return "Error importing data";
    }
  };
  
  const deleteData = async function () {
    try {
      const db = await connectToDb();
      if (!db) {
        return "Error connecting to the database";
      }
      db.collection("test").deleteMany({}, function (err, result) {
        if (err) throw err;
      });
      return "Data deleted";
    } catch (err) {
      console.log(err);
      return "Error deleting data";
    }
  };
  
  const getData = async function () {
    try {
      const db = await connectToDb();
      if (!db) {
        return [];
      }
      const result = await db.collection("test").find({}).toArray();
      return result;
    } catch (err) {
      console.log(err);
      return [];
    }
  };

module.exports = { importData, deleteData, getData };