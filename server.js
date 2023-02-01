require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
const workoutRouter = require('./routes/workout');

// express app
const app = express();

// middlewares
app.use((req, res, next) => {
  console.log(req.method, req.path);
  next();
});

// Routes
app.use('/api/workouts', workoutRouter);

// DB connection
mongoose
  .connect(process.env.MONGO_URI, () => {
    console.log(`Connected to the DB successfully`);

    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log(`App listening on port ${process.env.PORT}`);
    });
  })
  .catch(error => {
    console.error(error);
  });
