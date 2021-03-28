const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const db = require('./database/index');

app.use(express.urlencoded({
  extended: false
}));

const testRoute = require('./routes/test');
const itemsRoute = require('./routes/items');

db.client.connect(err => {
  if (err) return console.log(err);

  console.log('Connected to Database!');

  app.use('/test', testRoute);
  app.use('/items', itemsRoute);
  // client.close();
});


app.listen(port, () => {
  console.log(`application is listening on port:${port}`)
});
