const MongoClient = require('mongodb').MongoClient;
const secrets = require('../config/secrets');

const client = new MongoClient(secrets.uri, { useNewUrlParser: true, useUnifiedTopology: true, connectTimeoutMS: 30000, keepAlive: 1 });

const dbName = 'listDB';
const collectionName = 'itemsCollection';

const getDB = () => {return client.db(dbName)};
const getCollection = () => {return client.db(dbName).collection(collectionName)};

module.exports = {
    client: client,
    getDB: getDB,
    getCollection: getCollection,
}