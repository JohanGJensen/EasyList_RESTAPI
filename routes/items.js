const express = require("express");
const router = express.Router();
const db = require("../database/index");

router.get("/all", (req, res) => {
  const cursor = db.getCollection().find({});

  cursor.toArray(function (err, result) {
    if (err) throw err;

    res.json(result);
  });
});

router.post("/create", (req, res) => {
  const newItem = {
    _id: req.body._id.toString(),
    name: req.body.name,
    description: req.body.description,
    complete: req.body.complete,
    user: req.body.user,
  };

  db.getCollection().insertOne(newItem, (err, result) => {
    if (err) throw err;

    res.json({ msg: "item added!" });
  });
});

router.delete("/delete/:id", (req, res) => {
  db.getCollection().deleteOne({ _id: req.params.id });

  res.json({ msg: "item deleted" });
});

router.post("/update/:id", (req, res) => {
  const updatedItem = {
    $set: {
      name: req.body.name,
      description: req.body.description,
      complete: req.body.complete,
      user: req.body.user,
    },
  };

  db.getCollection().updateOne({ _id: req.params.id }, updatedItem, {
    upsert: true,
  });

  res.json({ msg: "item updated" });
});

router.get("/match/:user", (req, res) => {
  const cursor = collection.find({ user: req.params.user });

  cursor.toArray((err, result) => {
    if (err) throw err;

    res.json(result);
  });
});

router.get("/item/:id", (req, res) => {
  db.getCollection().findOne({ _id: req.params.id }, (err, result) => {
    if (err) throw err;

    res.json(result);
  });
});

module.exports = router;
