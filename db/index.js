const { MongoClient } = require("mongodb");

let client = null;
async function connectToDb() {
  if (!client) {
    client = new MongoClient(process.env.DB_CONNECTION_STRING);
    await client.connect();
    console.log("connected to db");
    return client.db(process.env.DB_NAME);
  }
  return client.db(process.env.DB_NAME);
}

module.exports = connectToDb;
