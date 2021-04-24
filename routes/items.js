const express = require("express");
const router = express.Router();
const db = require("../database/index");

const spaceSchema = require("../models/spaceSchema");

router.post("/create/:spaceid", (req, res) => {
  const uuid = require("../utility/uuid");

  const newItem = {
    _id: `item_${uuid()}`,
    name: `${req.body.name}`,
    complete: `${req.body.complete}`,
  };

  try {
    db.getCollection().updateOne(
      { _id: req.params.spaceid, $jsonSchema: spaceSchema },
      { $push: { items: newItem } },
      { upsert: false }
    );

    res.json({ msg: "item added to space!" });
  } catch (err) {
    res.json({ msg: err });
  }
});

router.delete("/delete/all/:spaceid", (req, res) => {
  try {
    db.getCollection().updateOne(
      { _id: req.params.spaceid, $jsonSchema: spaceSchema },
      { $set: { items: [] } },
      { upsert: false }
    );

    res.json({ msg: "items deleted from space!" });
  } catch (err) {
    res.json({ msg: err });
  }
});

router.delete("/delete/:spaceid/:itemid", (req, res) => {
  try {
    db.getCollection().updateOne(
      { _id: req.params.spaceid, $jsonSchema: spaceSchema },
      { $pull: { items: { _id: req.params.itemid } } },
      { upsert: false }
    );

    res.json({ msg: "item deleted from space!" });
  } catch (err) {
    res.json({ msg: err });
  }
});

router.post("/update/:spaceid/:itemid", (req, res) => {
  const updatedItem = {
    _id: req.params.itemid,
    name: req.body.name,
    complete: req.body.complete,
  };

  try {
    db.getCollection().updateOne(
      {
        _id: req.params.spaceid,
        "items._id": req.params.itemid,
        $jsonSchema: spaceSchema,
      },
      { $set: { "items.$": updatedItem } },
      { upsert: false }
    );

    res.json({ msg: "item updated from space!" });
  } catch (err) {
    res.json({ msg: err });
  }
});

module.exports = router;
