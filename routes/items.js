const express = require("express");
const router = express.Router();
const db = require("../database/index");

const itemSchema = {
  bsonType: "object",
  required: ["_id", "name", "description", "complete", "user"],
  properties: {
    _id: {
      bsonType: "string",
      description: "id must be a string and is required",
    },
    name: {
      bsonType: "string",
      description: "name must be a string and is required",
    },
    description: {
      bsonType: "string",
      description: "description must be a string and is required",
    },
    complete: {
      bsonType: "string",
      enum: ["true", "false"],
      description: "complete must be a string and is required",
    },
    user: {
      bsonType: "string",
      enum: ["All", "Johan", "Laura"],
      description: "user must be a string and is required",
    },
  },
};

router.get("/all", (req, res) => {
  const cursor = db.getCollection().find({
    $jsonSchema: itemSchema,
  });

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

    res.json({ msg: "item added!", result: result });
  });
});

router.delete("/delete/:id", (req, res) => {
  db.getCollection().deleteOne({ _id: req.params.id, $jsonSchema: itemSchema });

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

  try {
    db.getCollection().updateOne({ _id: req.params.id }, updatedItem, {
      upsert: true,
    });

    res.json({ msg: "item updated" });
  } catch (err) {
    res.json({ msg: err });
  }
});

router.get("/match/:user", (req, res) => {
  const cursor = db.getCollection().find({
    user: req.params.user,
    $jsonSchema: itemSchema,
  });

  cursor.toArray((err, result) => {
    if (err) throw err;

    res.json(result);
  });
});

router.get("/item/:id", (req, res) => {
  db.getCollection().findOne(
    { _id: req.params.id, $jsonSchema: itemSchema },
    (err, result) => {
      if (err) throw err;

      res.json(result);
    }
  );
});

module.exports = router;
