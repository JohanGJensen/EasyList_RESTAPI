const express = require("express");
const router = express.Router();
const db = require("../database/index");

const spaceSchema = require("../models/spaceSchema");

router.get("/all", (req, res) => {
  const cursor = db.getCollection().find({
    $jsonSchema: spaceSchema,
  });

  cursor.toArray(function (err, result) {
    if (err) throw err;

    res.json(result);
  });
});

router.post("/create", (req, res) => {
  const uuid = require("../utility/uuid");

  const newSpace = {
    _id: uuid(),
    name: req.body.name,
    items: [],
    user: req.body.user,
  };

  db.getCollection().insertOne(newSpace, (err, result) => {
    if (err) throw err;

    res.json({ msg: "space added!", result: result.ops });
  });
});

router.post("/update/:id", (req, res) => {
  const updatedSpace = {
    $set: {
      name: req.body.name,
      user: req.body.user,
    },
  };

  try {
    db.getCollection().updateOne(
      { _id: req.params.id, $jsonSchema: spaceSchema },
      updatedSpace,
      {
        upsert: true,
      }
    );

    res.json({ msg: "space updated" });
  } catch (err) {
    res.json({ msg: err });
  }
});

router.delete("/delete/all", (req, res) => {
  db.getCollection().deleteMany({});

  res.json({ msg: "all spaces deleted" });
});

router.delete("/delete/:id", (req, res) => {
  db.getCollection().deleteOne({
    _id: req.params.id,
    $jsonSchema: spaceSchema,
  });

  res.json({ msg: "space deleted" });
});

router.get("/match/:user", (req, res) => {
  const cursor = db
    .getCollection()
    .find({ user: req.params.user, $jsonSchema: spaceSchema });

  cursor.toArray((err, result) => {
    if (err) throw err;

    res.json(result);
  });
});

router.get("/space/:id", (req, res) => {
  db.getCollection().findOne(
    { _id: req.params.id, $jsonSchema: spaceSchema },
    (err, result) => {
      if (err) throw err;

      res.json(result);
    }
  );
});

module.exports = router;
