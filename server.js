require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
const workoutRouter = require('./routes/workout');

const app = express();

app.use('/api/workouts', workoutRouter);

app.use((req, res, next) => {
  console.log(req.method, req.path);
  next();
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
