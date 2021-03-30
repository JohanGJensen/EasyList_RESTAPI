const express = require('express');
const router = express.Router();
const db = require('../database/index');

router.get('/all', (req, res) => {
    const collection = db.client.db(db.dbName).collection(db.collectionName);
    const cursor = collection.find({});

    cursor.toArray(function(err, result) {
        if (err) throw err;

        res.json(result);
    });
});

router.post('/create', (req, res) => {
    const collection = db.client.db(db.dbName).collection(db.collectionName);
    const newItem = {
        _id: req.body._id.toString(),
        name: req.body.name,
        description: req.body.description,
        complete: req.body.complete,
        user: req.body.user
    };

    collection.insertOne(newItem, (err, result) => {
        if (err) throw err;

        res.json({'msg': 'item added!'})
    });
});

router.delete('/delete/:id', (req, res) => {
    const collection = db.client.db(db.dbName).collection(db.collectionName);

    collection.deleteOne({'_id': req.params.id});

    res.json({'msg': 'item deleted'});
});

router.post('/update/:id', (req, res) => {
    const collection = db.client.db(db.dbName).collection(db.collectionName);

    const updatedItem = {
        $set: {
            'name': req.body.name,
            'description': req.body.description,
            'user': req.body.user
        }
    };

    collection.updateOne({'_id': req.params.id}, updatedItem, {upsert: true});

    res.json({'msg': 'item updated'});
});

router.get('/item/:id', (req, res) => {
    const collection = db.client.db(db.dbName).collection(db.collectionName);
    
    collection.findOne({'_id': req.params.id}, (err, result) => {
        if (err) throw err;

        res.json(result);
    });
});

module.exports = router;
