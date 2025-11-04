const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');
dotenv.config();

let _db;

const initDb = (callback) => {
  if (_db) {
    console.log('Database is already initialized!');
    return callback(null, _db);
  }

  MongoClient.connect(process.env.MONGODB_URI)
    .then((client) => {
      _db = client.db('contactsDB');
      callback(null, _db);
    })
    .catch((err) => {
      callback(err);
    });
};

const getDb = () => {
  if (!_db) {
    throw Error('Database not initialized');
  }
  return _db;
};

module.exports = { initDb, getDb };
