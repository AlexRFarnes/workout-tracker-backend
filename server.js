require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

const app = express();

app.get('/', (req, res) => {
  res.json('Hello world');
});

mongoose
  .connect(process.env.MONGO_URI, () => {
    console.log(`Connected to the DB successfully`);
    console.log(`App listening on port ${process.env.PORT}`);
    app.listen(process.env.PORT);
  })
  .catch(error => {
    console.error(error);
  });
