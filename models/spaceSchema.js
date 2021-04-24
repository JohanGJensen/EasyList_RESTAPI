const spaceSchema = {
  bsonType: "object",
  required: ["_id", "name", "items", "user"],
  properties: {
    _id: {
      bsonType: "string",
      description: "id must be a string and is required",
    },
    name: {
      bsonType: "string",
      description: "name must be a string and is required",
    },
    items: {
      bsonType: "array",
      items: {
        bsonType: "object",
        required: ["_id", "name", "complete"],
        properties: {
          _id: {
            bsonType: "string",
            description: "id must be a string and is required",
          },
          name: {
            bsonType: "string",
            description: "name must be a string and is required",
          },
          complete: {
            bsonType: "string",
            enum: ["true", "false", "False", "True"],
            description: "complete must be a string and is required",
          },
        },
      },
    },
    user: {
      bsonType: "string",
      enum: ["All", "Johan", "Laura"],
      description: "user must be a string and is required",
    },
  },
};
module.exports = spaceSchema;
