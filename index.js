const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const host = "0.0.0.0";
const db = require("./database/index");

app.use(
  express.urlencoded({
    extended: false,
  })
);

const spacesRoute = require("./routes/spaces");
const itemsRoute = require("./routes/items");

db.client.connect((err) => {
  if (err) return console.log(err);

  console.log("Connected to Database!");

  app.use("/spaces", spacesRoute);
  app.use("/items", itemsRoute);
  // client.close();
});

app.listen(port, host, () => {
  console.log(`application is listening on host:${host} and port:${port}`);
});
