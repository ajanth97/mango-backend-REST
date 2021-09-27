const mongoose = require("mongoose");

const username = process.env.USERNAME;
const password = process.env.PASSWORD;
const clusterUri = process.env.CLUSTERURI;
const dbName = process.env.DBNAME;
const atlasUri =
  "mongodb+srv://" +
  username +
  ":" +
  password +
  "@" +
  clusterUri +
  "?retryWrites=true&w=majority";

mongoose
  .connect(atlasUri, {
    dbName: dbName,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    authSource: "admin",
    ssl: true,
  })
  .then(() => {
    console.log("Connected to Atlas Mongodb");
  })
  .catch((e) => {
    console.error("Connection error", e.message);
  });

const db = mongoose.connection;

module.exports = db;
